// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPoolV3} from "../interfaces/aave/v3/IPoolV3.sol";
import "../interfaces/aave/v3/DataTypes.sol";
import "../interfaces/aave/v3/IPoolAddressesProvider.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract AaveV3PoolMock is IPoolV3, ERC20 {
    
    struct UserInfo {
        uint256 depositAmount;
        uint256 borrowedAmount;
    }

    mapping(address => UserInfo) public users;

    uint256 constant LOAN_TO_VALUE_PRECISION = 100000;
    uint256 constant LOAN_LIQUIDATION_THRESHOLD = 80000;

    IERC20 public _collateralToken;
    IERC20 public _borrowedToken;

    uint256 public collateralPerEth = 860*(1e6);
    uint256 public borrowedPerETh= 999*(1e6);
    uint256 public pricePrecision = 1000*(1e6);

    constructor(IERC20 collateralToken, IERC20  borrowedToken)
        ERC20("Collateral ETH", "AWETH") {
        _collateralToken = collateralToken;
        _borrowedToken = borrowedToken;
    }

    function mintUnbacked(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {}

    function backUnbacked(address asset, uint256 amount, uint256 fee) external override {}

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {
        require(asset == address(_collateralToken), "Invalid Token for supply");
        require(amount > 0, "Amount must be greater than 0");
        _collateralToken.transferFrom(msg.sender, address(this), amount);
        users[msg.sender].depositAmount= users[msg.sender].depositAmount + amount;
    }

    function supplyWithPermit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external override {}

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external override returns (uint256) {
        require(asset == address(_collateralToken));
        require(asset == address(_collateralToken));
    }

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external override {
        require(users[msg.sender].depositAmount - users[msg.sender].borrowedAmount >= amount, "Not Enough Balance to Borrow");
        _borrowedToken.transfer(onBehalfOf, amount);
        users[msg.sender].borrowedAmount += amount;
    }

    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external override returns (uint256) {

    }

    function repayWithPermit(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external override returns (uint256) {}

    function repayWithATokens(
        address asset,
        uint256 amount,
        uint256 interestRateMode
    ) external override returns (uint256) {}

    function swapBorrowRateMode(address asset, uint256 interestRateMode) external override {}

    function rebalanceStableBorrowRate(address asset, address user) external override {}

    function setUserUseReserveAsCollateral(address asset, bool useAsCollateral) external override {}

    function liquidationCall(
        address collateralAsset,
        address debtAsset,
        address user,
        uint256 debtToCover,
        bool receiveAToken
    ) external override {}

    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata interestRateModes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external override {}

    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external override {}

    function getUserAccountData(
        address user
    )
        external
        view
        override
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {
        totalCollateralBase = users[user].depositAmount * collateralPerEth / pricePrecision;
        totalDebtBase = users[user].borrowedAmount * borrowedPerETh / pricePrecision;
        availableBorrowsBase = 0;
        currentLiquidationThreshold = users[user].depositAmount * LOAN_LIQUIDATION_THRESHOLD / LOAN_TO_VALUE_PRECISION;
        ltv =users[user].borrowedAmount *  LOAN_TO_VALUE_PRECISION/(users[user].depositAmount );
        healthFactor = 1;
    }

    function initReserve(
        address asset,
        address aTokenAddress,
        address stableDebtAddress,
        address variableDebtAddress,
        address interestRateStrategyAddress
    ) external override {}

    function dropReserve(address asset) external override {}

    function setReserveInterestRateStrategyAddress(
        address asset,
        address rateStrategyAddress
    ) external override {}

    function setConfiguration(
        address asset,
        DataTypes.ReserveConfigurationMap calldata configuration
    ) external override {}

    function getConfiguration(
        address asset
    ) external view override returns (DataTypes.ReserveConfigurationMap memory) {}

    function getUserConfiguration(
        address user
    ) external view override returns (DataTypes.UserConfigurationMap memory) {}

    function getReserveNormalizedIncome(address asset) external view override returns (uint256) {}

    function getReserveNormalizedVariableDebt(
        address asset
    ) external view override returns (uint256) {}

    function getReserveData(
        address asset
    ) external view override returns (DataTypes.ReserveData memory) {}

    function finalizeTransfer(
        address asset,
        address from,
        address to,
        uint256 amount,
        uint256 balanceFromBefore,
        uint256 balanceToBefore
    ) external override {}

    function getReservesList() external view override returns (address[] memory) {}

    function ADDRESSES_PROVIDER() external view override returns (IPoolAddressesProvider) {}

    function updateBridgeProtocolFee(uint256 bridgeProtocolFee) external override {}

    function updateFlashloanPremiums(
        uint128 flashLoanPremiumTotal,
        uint128 flashLoanPremiumToProtocol
    ) external override {}

    function configureEModeCategory(
        uint8 id,
        DataTypes.EModeCategory memory config
    ) external override {}

    function getEModeCategoryData(
        uint8 id
    ) external view override returns (DataTypes.EModeCategory memory) {}

    function setUserEMode(uint8 categoryId) external override {}

    function getUserEMode(address user) external view override returns (uint256) {}

    function resetIsolationModeTotalDebt(address asset) external override {}

    function MAX_STABLE_RATE_BORROW_SIZE_PERCENT() external view override returns (uint256) {}

    function FLASHLOAN_PREMIUM_TOTAL() external view override returns (uint128) {}

    function BRIDGE_PROTOCOL_FEE() external view override returns (uint256) {}

    function FLASHLOAN_PREMIUM_TO_PROTOCOL() external view override returns (uint128) {}

    function MAX_NUMBER_RESERVES() external view override returns (uint16) {}

    function mintToTreasury(address[] calldata assets) external override {}

    function rescueTokens(address token, address to, uint256 amount) external override {}

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external override {}

    function getReserveAddressById(uint16 id) external view override returns (address) {}
}