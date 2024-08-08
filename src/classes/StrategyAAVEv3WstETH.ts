import {
  Model,
  Web3Connection,
  Web3ConnectionOptions,
  Deployable,
  XPromiseEvent,
} from "@taikai/dappkit";

import StrategyAAVEv3WstETHJson from "../../artifacts/contracts/core/strategies/StrategyAAVEv3WstETH.sol/StrategyAAVEv3WstETH.json";
import { StrategyAAVEv3WstETHMethods } from "src/interfaces/StrategyAAVEv3WstETH";
import * as Events from "src/events/StrategyAAVEv3WstETH";
import { PastEventOptions } from "web3-eth-contract";
import { AbiItem } from "web3-utils";

export class StrategyAAVEv3WstETH
  extends Model<StrategyAAVEv3WstETHMethods>
  implements Deployable
{
  constructor(
    web3Connection: Web3Connection | Web3ConnectionOptions,
    contractAddress?: string
  ) {
    super(
      web3Connection,
      StrategyAAVEv3WstETHJson.abi as AbiItem[],
      contractAddress
    );
  }

  async deployJsonAbi(
    initialOwner: string,
    registry: string,
    swapFeeTier: number,
    eModeCategory: number
  ) {
    const deployOptions = {
      data: StrategyAAVEv3WstETHJson.bytecode,
      arguments: [initialOwner, registry, swapFeeTier, eModeCategory],
    };
    return this.deploy(deployOptions, this.connection.Account);
  }

  async getPosition(priceOptions: {
    maxAge: number;
    maxConf: number;
  }) {
    return this.callTx(this.contract.methods.getPosition(priceOptions));
  }

  async deployed(priceOptions: {
    maxAge: number;
    maxConf: number;
  }) {
    return this.callTx(this.contract.methods.deployed(priceOptions));
  }

  async harvest() {
    return this.sendTx(this.contract.methods.harvest());
  }

  async owner() {
    return this.callTx(this.contract.methods.owner());
  }

  async renounceOwnership() {
    return this.sendTx(this.contract.methods.renounceOwnership());
  }

  async totalAssets() {
    return this.callTx(this.contract.methods.totalAssets());
  }

  async transferOwnership(newOwner: string) {
    return this.sendTx(this.contract.methods.transferOwnership(newOwner));
  }

  async undeploy(amount: number) {
    return this.sendTx(this.contract.methods.undeploy(amount));
  }

  async getLoanToValue() { 
    return this.callTx(this.contract.methods.getLoanToValue());
  }

  async getMaxLoanToValue() { 
    return this.callTx(this.contract.methods.getMaxLoanToValue());
  }

  async getNrLoops() { 
    return this.callTx(this.contract.methods.getNrLoops());
  }

  async setLoanToValue(loanToValue: number) { 
    return this.sendTx(this.contract.methods.setLoanToValue(loanToValue));
  }

  async setMaxLoanToValue(maxLoanToValue: number) { 
    return this.sendTx(this.contract.methods.setMaxLoanToValue(maxLoanToValue));
  }

  async governor() {
    return this.callTx(this.contract.methods.governor());
  }


  async setNrLoops(nrLoops: number) { 
    return this.sendTx(this.contract.methods.setNrLoops(nrLoops));
  }

  async getCollateralOracle() { 
    return this.callTx(this.contract.methods.getCollateralOracle());
  }

  async getDebtOracle() {
    return this.callTx(this.contract.methods.getDebtOracle());
  }

  async setCollateralOracle(oracle: string) { 
    return this.sendTx(this.contract.methods.setCollateralOracle(oracle));
  }
  
  async setDebtOracle(oracle: string) { 
    return this.sendTx(this.contract.methods.setCollateralOracle(oracle));
  }

  async getOwnershipTransferredEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.OwnershipTransferredEvent> {
    return this.contract.self.getPastEvents("OwnershipTransferred", filter);
  }

  async getStrategyAmountUpdateEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.StrategyAmountUpdateEvent> {
    return this.contract.self.getPastEvents("StrategyAmountUpdate", filter);
  }

  async getStrategyLossEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.StrategyLossEvent> {
    return this.contract.self.getPastEvents("StrategyLoss", filter);
  }

  async getStrategyProfitEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.StrategyProfitEvent> {
    return this.contract.self.getPastEvents("StrategyProfit", filter);
  }

  async getSwapEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.SwapEvent> {
    return this.contract.self.getPastEvents("Swap", filter);
  }
  
  async getStrategyDeployEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.StrategyDeployEvent> {
    return this.contract.self.getPastEvents("StrategyDeploy", filter);
  }

  async getStrategyUndeployEvents(
    filter: PastEventOptions
  ): XPromiseEvent<Events.StrategyUndeployEvent> {
    return this.contract.self.getPastEvents("StrategyUndeploy", filter);
  }

  async getLoanToValueChangedEvents(filter: PastEventOptions): XPromiseEvent<Events.LoanToValueChangedEvent> {
    return this.contract.self.getPastEvents('LoanToValueChanged', filter);
  }

  async getNrLoopsChangedEvents(filter: PastEventOptions): XPromiseEvent<Events.NrLoopsChangedEvent> {
    return this.contract.self.getPastEvents('NrLoopsChanged', filter);
  }
  
  async getSetMaxLoanToValueChangedEvents(filter: PastEventOptions): XPromiseEvent<Events.SetMaxLoanToValueChangedEvent> {
    return this.contract.self.getPastEvents('SetMaxLoanToValueChanged', filter);
  }
}


