// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Rebase, RebaseLibrary} from "../libraries/BoringRebase.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ServiceRegistry} from "../core/ServiceRegistry.sol";
import {IWETH} from "../interfaces/tokens/IWETH.sol";
import {IWStETH} from "../interfaces/lido/IWStETH.sol";
import {IPoolV3} from "../interfaces/aave/v3/IPoolV3.sol";
import {ISwapHandler} from "../interfaces/core/ISwapHandler.sol";
import {IOracle} from "../interfaces/core/IOracle.sol";
import {WETH_CONTRACT, WSTETH_ETH_ORACLE, AAVE_V3, FLASH_LENDER, SWAP_HANDLER, ST_ETH_CONTRACT, WST_ETH_CONTRACT} from "./Constants.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";
import {Leverage} from "../libraries/Leverage.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "hardhat/console.sol";
import "../interfaces/aave/v3/DataTypes.sol";

/**
 * Landromat Vault
 * This pool allows the user the leverage their yield position and exposure the user to boosted returns
 * using recursive
 *
 * TODO:
 * - Harvest Function to collect fees from yield performance +-10%
 * - Balance Collateral/Debt to avoid AAVE liquidation
 * - Withdraw Fee 0.10%
 * - Support for Flash Loan Router
 *
 * @title Landromat Vault smart contract
 * @author Helder Vasconcelos
 * @notice
 */
contract LaundromatVault is Ownable, Pausable, ERC20, IERC3156FlashBorrower {
    using SafeMath for uint256;
    using RebaseLibrary for Rebase;
    using Leverage for uint256;
    using SafeERC20 for ERC20;

    struct FlashLoanData {
        uint256 originalAmount;
        address receiver;
    }

    string constant NAME = "laundromat ETH";
    string constant SYMBOl = "mateETH";
    // Maxinum loan to value used by the smart contract
    uint256 private LOAN_TO_VALUE = 80000;
    uint256 public constant PERCENTAGE_PRECISION = 1e9;
    bytes32 constant SUCCESS_MESSAGE = keccak256("ERC3156FlashBorrower.onFlashLoan");

    // The System System register
    ServiceRegistry public immutable _registry;
    // Updated Value that belongs to the pool shareholders
    uint256 private _ownedCollateralInEth;

    event Deposit(address owner, address receiver, uint256 amount, uint256 shares);
    event Withdraw(address owner, uint256 amount, uint256 shares);

    constructor(address owner, ServiceRegistry registry) ERC20(NAME, SYMBOl) {
        require(owner != address(0), "Invalid Owner Address");
        _transferOwnership(owner);
        _registry = registry;
        _ownedCollateralInEth = 0;
    }

    function harvest() public {}

    receive() external payable {}

    function updateCollateralValue() public {
        if (_ownedCollateralInEth > 0) {
            (uint256 totalCollateralInEth, uint256 totalDebtInEth) = _getPosition();
            _ownedCollateralInEth = totalCollateralInEth - totalDebtInEth;
        }
    }

    function _getPosition()
        internal
        view
        returns (uint256 totalCollateralInEth, uint256 totalDebtInEth)
    {
        IPoolV3 aavePool = IPoolV3(_registry.getServiceFromHash(AAVE_V3));
        (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 _1,
            uint256 _2,
            uint256 _3,
            uint256 _4
        ) = aavePool.getUserAccountData(address(this));
        totalCollateralInEth = totalCollateralBase;
        totalDebtInEth = totalDebtBase;
    }

    function deposit(address receiver) external payable returns (uint256 shares) {
        require(msg.value != 0, "No Zero deposit Allower");
        // 1. Wrap Ethereum
        IWETH weth = IWETH(_registry.getServiceFromHash(WETH_CONTRACT));
        weth.deposit{value: msg.value}();
        // 1.1 UpdateCollateral
        updateCollateralValue();
        // 2. Initiate a Flash Loan
        IERC3156FlashLender flashLender = IERC3156FlashLender(
            _registry.getServiceFromHash(FLASH_LENDER)
        );
        uint256 leverage = Leverage.calculateLeverageRatio(msg.value, LOAN_TO_VALUE, 10);
        uint256 loanAmount = leverage - msg.value;
        uint256 fee = flashLender.flashFee(address(weth), loanAmount);
        uint256 allowance = weth.allowance(address(this), address(flashLender));
        weth.approve(address(flashLender), loanAmount + fee + allowance);
        require(
            flashLender.flashLoan(
                IERC3156FlashBorrower(this),
                address(weth),
                loanAmount,
                abi.encode(msg.value, receiver)
            ),
            "Failed to run Flash Loan"
        );
    }

    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes memory callData
    ) external returns (bytes32) {
        require(initiator == address(this), "FlashBorrower: Untrusted loan initiator");
        address weth = _registry.getServiceFromHash(WETH_CONTRACT);
        address wstETH = _registry.getServiceFromHash(WST_ETH_CONTRACT);
        address stETH = _registry.getServiceFromHash(ST_ETH_CONTRACT);

        require(token == weth, "Invalid INput");
        require(stETH != address(0), "Invalid Output");

        FlashLoanData memory data = abi.decode(callData, (FlashLoanData));
        // 1. Swap WETH -> stETH
        uint256 stEThAmount = _swaptoken(weth, stETH, data.originalAmount + amount);
        // 2. Wrap stETH -> wstETH
        uint256 wstETHAmount = wrapStETH(stETH, wstETH, stEThAmount);
        // 3. Deposit wstETH and Borrow ETH
        supplyAndBorrow(address(wstETH), wstETHAmount, weth, amount + fee);
        // 4. Mint lndETH
        uint256 shares = _mintShares(data.receiver, wstETHAmount, amount + fee);
        emit Deposit(initiator, data.receiver, data.originalAmount, shares);
        return SUCCESS_MESSAGE;
    }

    function _mintShares(
        address receiver,
        uint256 wstETHAmount,
        uint256 debtInEth
    ) private returns (uint256 shares) {
        Rebase memory total = Rebase(_ownedCollateralInEth, totalSupply());
        uint256 collateralInETH = convertWstInETH(wstETHAmount);
        shares = total.toBase(collateralInETH - debtInEth, false);
        _mint(receiver, shares);
        _ownedCollateralInEth = total.elastic.add(collateralInETH - debtInEth);
    }

    function convertWstInETH(uint256 amountIn) public view returns (uint256 amountOut) {
        IOracle oracle = IOracle(_registry.getServiceFromHash(WSTETH_ETH_ORACLE));
        amountOut = amountIn.mul(oracle.getLatestPrice()).div(oracle.getPrecision());
    }

    function convertETHInWSt(uint256 amountIn) public view returns (uint256 amountOut) {
        IOracle oracle = IOracle(_registry.getServiceFromHash(WSTETH_ETH_ORACLE));
        amountOut = amountIn.mul(oracle.getPrecision()).div(oracle.getLatestPrice());
    }

    function wrapStETH(
        address stETh,
        address wstETh,
        uint256 toWrap
    ) private returns (uint256 amountOut) {
        ERC20(stETh).safeApprove(wstETh, toWrap);
        amountOut = IWStETH(wstETh).wrap(toWrap);
    }

    function supplyAndBorrow(
        address assetIn,
        uint256 amountIn,
        address assetOut,
        uint256 borrowOut
    ) private {
        IPoolV3 aavePool = IPoolV3(_registry.getServiceFromHash(AAVE_V3));
        ERC20(assetIn).approve(address(aavePool), amountIn);
        aavePool.supply(assetIn, amountIn, address(this), 0);
        aavePool.borrow(assetOut, borrowOut, 2, 0, address(this));
    }

    function _swaptoken(
        address assetIn,
        address assetOut,
        uint256 amountIn
    ) private returns (uint256 amountOut) {
        ISwapHandler swapHandler = ISwapHandler(_registry.getServiceFromHash(SWAP_HANDLER));
        ERC20(assetIn).approve(address(swapHandler), amountIn);
        ISwapHandler.SwapParams memory params = ISwapHandler.SwapParams(
            assetIn,
            assetOut,
            0,
            amountIn,
            0,
            bytes("")
        );
        amountOut = swapHandler.executeSwap(params);
    }

    function totalAssets() public view returns (uint256 totalManagedAssets) {
        return _ownedCollateralInEth;
    }

    function convertToShares(uint256 assets) external view returns (uint256 shares) {
        Rebase memory total = Rebase(_ownedCollateralInEth, totalSupply());
        shares = total.toBase(assets, false);
    }

    function convertToAssets(uint256 shares) external view returns (uint256 assets) {
        Rebase memory total = Rebase(_ownedCollateralInEth, totalSupply());
        assets = total.toElastic(shares, false);
    }

    function tokenPerETh() public view returns (uint256) {
        return totalSupply().mul(1 ether).div(_ownedCollateralInEth);
    }

    function withdraw(uint256 shares, address payable receiver) external returns (uint256 amount) {
        require(balanceOf(msg.sender) >= shares, "No Enough balance to withdraw");
        address wstETH = _registry.getServiceFromHash(WST_ETH_CONTRACT);
        address stETH = _registry.getServiceFromHash(ST_ETH_CONTRACT);
        address weth = _registry.getServiceFromHash(WETH_CONTRACT);
        IPoolV3 aavePool = IPoolV3(_registry.getServiceFromHash(AAVE_V3));
        // 0 UpdateCollateral
        updateCollateralValue();
        uint256 percentageToBurn = shares.mul(PERCENTAGE_PRECISION).div(totalSupply());
        (uint256 totalCollateralBaseInEth, uint256 totalDebtBaseInEth) = _getPosition();
        // 1. Pay Debt
        uint256 deltaDebt = (totalDebtBaseInEth).mul(percentageToBurn).div(PERCENTAGE_PRECISION);
        uint256 wstETHPaidInDebt = convertETHInWSt(deltaDebt);
        DataTypes.ReserveData memory reserve = aavePool.getReserveData(wstETH);
        ERC20(reserve.aTokenAddress).safeApprove(address(aavePool), wstETHPaidInDebt);
        aavePool.repayWithATokens(wstETH, wstETHPaidInDebt, 2);
        // 2. Withdraw from AAVE Pool
        uint256 deltaCollateral = (totalCollateralBaseInEth).mul(percentageToBurn).div(
            PERCENTAGE_PRECISION
        );
        uint256 deltaAssetInWSETH = convertETHInWSt(deltaCollateral - wstETHPaidInDebt);
        //console.log("deltaAssetInWSETH",deltaAssetInWSETH);
        aavePool.withdraw(wstETH, deltaAssetInWSETH, address(this));
        // 3. Unwrap wstETH -> stETH
        ERC20(wstETH).safeApprove(wstETH, deltaAssetInWSETH);
        uint256 stETHAmount = IWStETH(wstETH).unwrap(deltaAssetInWSETH);
        // 4. Swap wstETH -> stETH
        uint256 wETHAmount = _swaptoken(stETH, weth, stETHAmount);
        require(ERC20(weth).balanceOf(address(this)) >= wETHAmount, "No balance received");

        
        // 5. Unwrap wETH
        ERC20(weth).safeApprove(weth, wETHAmount);
        IWETH(weth).withdraw(wETHAmount);
        // 6. Withdraw ETh to User Wallet
        (bool success, ) = payable(receiver).call{value: amount}("");
        require(success, "Failed to Send ETH Back");
        // 7. Burn Shared
        _burn(msg.sender, shares);
        emit Withdraw(msg.sender, wETHAmount, shares);
    }
}
