import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import {
  deployServiceRegistry,
  deployVault,
  deployCbETH,
  deploySwapper,
  deployAaveV3,
  deployFlashLender,
  deployOracleMock,
  deployWETH,
  deployAAVEv3StrategyAny,
  deployQuoterV2Mock,
} from "../../scripts/common";

import { describeif } from "../common";

describeif(network.name === "hardhat")("AAVEv3StrategyAny", function () {
  async function deployFunction() {
    const [owner, otherAccount] = await ethers.getSigners();
    const CBETH_MAX_SUPPLY = ethers.parseUnits("1000000000", 18);
    const FLASH_LENDER_DEPOSIT = ethers.parseUnits("10000", 18);
    const AAVE_DEPOSIT = ethers.parseUnits("10000", 18);
    const serviceRegistry = await deployServiceRegistry(owner.address);
    const serviceRegistryAddress = await serviceRegistry.getAddress();
    const weth = await deployWETH(serviceRegistry);
    // 1. Deploy Flash Lender
    const flashLender = await deployFlashLender(
      serviceRegistry,
      weth,
      FLASH_LENDER_DEPOSIT
    );
    // 2. Deploy cbEBT
    const cbETH = await deployCbETH(serviceRegistry, owner, CBETH_MAX_SUPPLY);
    // 3. Deploy WETH -> cbETH Swapper
    const swapper = await deploySwapper(   
      weth,    
      cbETH,
      serviceRegistry,
      CBETH_MAX_SUPPLY
    );

    await swapper.setRatio(1130*(1e6));
    // 4. Deploy AAVEv3 Mock Pool
    const aave3Pool = await deployAaveV3(
      cbETH,    
      weth,    
      serviceRegistry,
      AAVE_DEPOSIT
    );
    // 5. Deploy cbETH/ETH Oracle
    const oracle  = await deployOracleMock(serviceRegistry, "cbETH/ETH Oracle");
    const ethOracle = await deployOracleMock(serviceRegistry, "ETH/USD Oracle");    
    await ethOracle.setLatestPrice(ethers.parseUnits("1", 18));
    await deployQuoterV2Mock(serviceRegistry);
    const strategy = await deployAAVEv3StrategyAny(
      owner.address,
      serviceRegistryAddress,
      "cbETH",
      "cbETH/ETH Oracle"
    );
    return {
      cbETH,
      weth,
      owner,
      otherAccount,
      serviceRegistry,
      swapper,
      aave3Pool,
      flashLender,
      strategy,
      oracle
    };
  }

  it("Test Deploy", async function () {
    const { owner, strategy } = await loadFixture(deployFunction);
    // Deploy 10 ETH
    expect(await strategy.deploy({
        value: ethers.parseUnits("10", 18)
    })).to.changeEtherBalances(
        [owner.address], [ ethers.parseUnits("10", 18)]
    );;
    expect(await strategy.getPosition()).to.deep.equal([ 
        45705032700000000000n, 
        35740737730000000000n
    ]);
    expect(await strategy.totalAssets()).to.equal(
        9964294970000000000n
    );  
  });


  it("Test Undeploy", async function () {
    const { owner, strategy } = await loadFixture(deployFunction);   
    const receiver  = "0x3762eFfD0BDDDb76688eb90F5fD0301AeeC90120";
     // Deploy 10TH ETH
     await strategy.deploy({
        value: ethers.parseUnits("10", 18)
    });
    expect(await strategy.getPosition()).to.deep.equal([ 
      45705032700000000000n, 
      35740737730000000000n
    ]);
    expect(await strategy.totalAssets()).to.equal(
      9964294970000000000n
    );  
    // Receive ~=5 ETH
    await strategy.undeploy(
        ethers.parseUnits("5", 18), 
        "0x3762eFfD0BDDDb76688eb90F5fD0301AeeC90120"
    );

    const provider = ethers.provider;
    expect(await provider.getBalance(receiver)).to.equal(4982065590468138080n);
  })


  it("Exit Full Position", async function() {
    const { owner, strategy } = await loadFixture(deployFunction);   
    await strategy.deploy({
      value: ethers.parseUnits("10", 18)
    });

    const liquidator = "0x7cFE75bEBE00f5159B6a890aFf89756CDFB313E6";
    expect(strategy.exit( liquidator)).to.changeEtherBalances(
      [liquidator], [ 9964294970000000000n]
    );  
  });

  it("Exit Full Position - Assets", async function() {
    const { owner, strategy } = await loadFixture(deployFunction);   
    await strategy.deploy({
      value: ethers.parseUnits("10", 18)
    });

    const liquidator = "0x7cFE75bEBE00f5159B6a890aFf89756CDFB313E6";
    await strategy.exit( liquidator);
    expect(await strategy.totalAssets()).to.equal(0); 
    expect(await strategy.getPosition()).to.deep.equal([0n,0n]);
  });



  it("Default Target LTV", async ()=> {
    const { owner, strategy } = await loadFixture(deployFunction);   
    expect(await strategy.getTargetLTV()).to.equal(800*(1e6)); 
  });

  it("Set Target LTV by owner", async ()=> {
    const { owner, strategy } = await loadFixture(deployFunction);   
    await strategy.setTargetLTV(700*(1e6)); 
    expect(await strategy.getTargetLTV()).to.equal(700*(1e6)); 
  });

  it("Faile fo set Target LTV - No Permissions", async ()=> {
    const { otherAccount, strategy } = await loadFixture(deployFunction);  
    await expect(
      strategy.connect(otherAccount).setTargetLTV(700*(1e6))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Failed fo set Target LTV - Invalid Value", async()=> {
    const { otherAccount, strategy } = await loadFixture(deployFunction);  
    await expect(
      strategy.setTargetLTV(1100*(1e6))
    ).to.be.revertedWith("Invalid percentage value");
  });
});