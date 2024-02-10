import Table from "cli-table";
import {
  decodeRawTransaction,
  generateRedeemScriptHex,
  stackEvaluator,
} from "../transaction/index.js";
import { logger, prompt } from "../utils/index.js";
import { generateWalletAddress, checkWalletBalance } from "../wallet/index.js";

const table = new Table({
  head: ["option", "function", "category"],
  colWidths: [10, 30, 30],
  rows: [
    ["1", "Create Wallet Address", "Wallet"],
    ["2", "View Wallet data", "Wallet"],
    ["3", "Decode raw transaction hex", "Transaction"],
    ["4", "Decode Script", "Transaction"],
    ["5", "Run stack evaluator", "Transaction"],
    ["6", "Generate Redeem Script hex (from preimage)", "Transaction"],
  ],
});

const app = (): void => {
  logger.success("welcome to ShyBit-CLI");
  console.log(table.toString());
  const option = prompt("Option : ");
  switch (Number(option)) {
    case 1:
      generateWalletAddress();
      break;
    case 2:
      checkWalletBalance();
      break;
    case 3:
      decodeRawTransaction();
      break;
    case 4:
      stackEvaluator();
      break;
    case 6:
      generateRedeemScriptHex();
      break;
    default:
      break;
  }
};

export default app;
