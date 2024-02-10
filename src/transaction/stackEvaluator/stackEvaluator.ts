import { paste } from "copy-paste";
import * as bitcoin from "bitcoinjs-lib";
import { logger } from "../../utils/index.js";

const scriptHexToOpcodesHexGenerator = (scriptHex: string) => {
  const scriptBuffer = Buffer.from(scriptHex, "hex");
  const compiledScript = bitcoin.script.compile(scriptBuffer);
  //@ts-expect-error
  const opcodesHex = compiledScript.map((op) => op.toString("hex")).join("");
  console.log(opcodesHex);
};

export const stackEvaluator = () => {
  // const script = "010101029301038801027693010487";
  const hexInput = prompt("paste script hex from clipboard? (yes/no): ");
  switch (hexInput?.toLocaleLowerCase()) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard :${dataFromClipboard}`);
      scriptHexToOpcodesHexGenerator(dataFromClipboard);
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app");
      break;
    default:
      break;
  }
};

export default stackEvaluator;
