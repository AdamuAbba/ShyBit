import * as bitcoin from "bitcoinjs-lib";
import { logger, prompt } from "../../utils/index.js";
import { paste } from "copy-paste";

export const redeemScriptHexGenerator = (preImageString: string): string => {
  // Convert preimage to byte encoding
  const preimageByteEncoding = Buffer.from(preImageString, "utf8").toString(
    "hex"
  );

  const preimageHex = Buffer.from(preimageByteEncoding, "hex");
  // Calculate SHA256 hash of byte encoding
  const sha256Hash = bitcoin.crypto.sha256(preimageHex).toString("hex");

  // Generate the redeem script
  const redeemScript = "OP_SHA256 " + sha256Hash + " OP_EQUAL";
  const redeemScriptHex = Buffer.from(redeemScript, "utf8").toString("hex");
  console.log("redeem_script_hex:", redeemScriptHex);
  return redeemScriptHex;
};

const generateRedeemScriptHex = (): void => {
  const preImageInput = prompt("paste preimage from clipboard? (yes/no): ");
  switch (preImageInput) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard : ${dataFromClipboard}`);
      redeemScriptHexGenerator(dataFromClipboard);
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app 🤦‍♂️");
      break;
    default:
      break;
  }
};

export default generateRedeemScriptHex;
