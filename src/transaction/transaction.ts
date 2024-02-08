import * as bitcoin from "bitcoinjs-lib";

export const generateRedeemScriptHex = (): void => {
  const preimage = "Btrust Builders";

  // Convert preimage to byte encoding
  const preimageByteEncoding = Buffer.from(preimage, "utf8").toString("hex");

  const preimageHex = Buffer.from(preimageByteEncoding, "hex");
  // Calculate SHA256 hash of byte encoding
  const sha256Hash = bitcoin.crypto.sha256(preimageHex).toString("hex");

  // Generate the redeem script
  const redeemScript = "OP_SHA256 " + sha256Hash + " OP_EQUAL";
  const redeemScriptHex = Buffer.from(redeemScript, "utf8").toString("hex");
  console.log("redeem_script_hex:", redeemScriptHex);
};
