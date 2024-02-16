import Table from "cli-table";
import {
  decodeRawTransaction,
  generateRedeemScriptHex,
  stackEvaluator,
} from "../transaction/index.js";
import { logger, prompt } from "../utils/index.js";
import { generateWalletAddress, checkWalletBalance } from "../wallet/index.js";

const table = new Table({
  head: ["No", "function", "category", "deliverable", "test"],
  colWidths: [5, 28, 16, 13, 8],
  rows: [
    ["1", "Create Wallet Address", "wallet", "true", "true"],
    ["2", "View Wallet data", "wallet", "false", "true"],
    ["3", "Decode raw transaction hex", "transaction", "true", "true"],
    ["4", "Run stack evaluator", "transaction", "true", "true"],
    ["5", "Generate Redeem Script hex", "transaction", "true", "true"],
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
    case 5:
      generateRedeemScriptHex();
      break;
    default:
      break;
  }
};

export default app;
