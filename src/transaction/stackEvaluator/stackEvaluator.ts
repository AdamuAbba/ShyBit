import { paste } from "copy-paste";
import * as bitcoin from "bitcoinjs-lib";
import { logger, prompt } from "../../utils/index.js";

export const scriptHexToOpcodesHexGenerator = (scriptHex: string): string => {
  // Convert hex to Buffer
  const scriptBuffer = Buffer.from(scriptHex, "hex");
  // Create a script from Buffer
  const script = bitcoin.script.toASM(scriptBuffer);
  logger.success(`Script with op_codes/values: ${script}`);
  return script;
};

export const stackEvaluator = () => {
  const value = "010101029301038801027693010487";
  const hexInput = prompt(
    "paste script hex from clipboard?(yes/no/[hit 'ENTER' for default]): ",
    { value }
  );
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
      logger.info(`default :${hexInput}`);
      scriptHexToOpcodesHexGenerator(hexInput);
      break;
  }
};

export default stackEvaluator;
