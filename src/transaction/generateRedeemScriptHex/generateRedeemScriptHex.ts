import * as bitcoin from "bitcoinjs-lib";
import { paste } from "copy-paste";
import { ECPairAPI, ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { logger, prompt } from "../../utils/index.js";
import { IGenerateRedeemScript } from "./types.js";

export const redeemScriptHexGenerator = (
  preImageString: string
): IGenerateRedeemScript => {
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
  const redeemScriptFrom2above = "010101029301038801027693010487";
  const parsedRedeemScript = Buffer.from(redeemScriptFrom2above, "hex");

  // Derive the P2SH address
  const scriptPubKey = bitcoin.payments.p2sh({
    redeem: { output: parsedRedeemScript },
  });
  const p2shAddress = scriptPubKey.address;

  const ECPair: ECPairAPI = ECPairFactory(ecc);

  const validator = (
    pubkey: Buffer,
    msghash: Buffer,
    signature: Buffer
  ): boolean => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

  const recipientsAddress = "34JET1gCDzKjx1Gxm3v4kuaw3F5kciPpce";

  const abbaSender = ECPair.fromWIF(
    "L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr"
  );
  const psbt = new bitcoin.Psbt();
  psbt.setVersion(2);
  psbt.setLocktime(0);

  psbt.addInput({
    hash: "7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e",
    index: 0,
    sequence: 0xffffffff,
    nonWitnessUtxo: Buffer.from(
      "0200000001f9f34e95b9d5c8abcd20fc5bd4a825d1517be62f0f775e5f36da944d9" +
        "452e550000000006b483045022100c86e9a111afc90f64b4904bd609e9eaed80d48" +
        "ca17c162b1aca0a788ac3526f002207bb79b60d4fc6526329bf18a77135dc566020" +
        "9e761da46e1c2f1152ec013215801210211755115eabf846720f5cb18f248666fec" +
        "631e5e1e66009ce3710ceea5b1ad13ffffffff01" +
        // value in satoshis (Int64LE) = 0x015f90 = 90000
        "905f010000000000" +
        // scriptPubkey length
        "19" +
        // scriptPubkey
        "76a9148bbc95d2709c71607c60ee3f097c1217482f518d88ac" +
        // locktime
        "00000000",
      "hex"
    ),
  });

  psbt.addOutput({
    address: recipientsAddress,
    value: 1000,
  });

  psbt.signInput(0, abbaSender);
  psbt.validateSignaturesOfInput(0, validator);
  psbt.finalizeAllInputs();

  const { version, locktime, txInputs, txOutputs } = psbt;

  const finalDataObj = {
    redeemScriptHex,
    p2shAddress,
    constructedTransactionData: {
      version,
      locktime,
      txInputs,
      txOutputs,
    },
  };
  console.log(JSON.stringify(finalDataObj, null, 2));
  return finalDataObj;
};

const generateRedeemScriptHex = (): void => {
  const preImageInput = prompt(
    "paste preimage from clipboard? (yes/no/[hit 'ENTER' for default]): ",
    {
      value: "Btrust Builders",
    }
  );
  switch (preImageInput) {
    case "yes":
      const dataFromClipboard = paste();
      logger.info(`clipboard : ${dataFromClipboard}`);
      redeemScriptHexGenerator(dataFromClipboard);
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app 🤦‍♂️");
      break;
    default:
      logger.info(`default : ${preImageInput}`);
      redeemScriptHexGenerator(preImageInput);
      break;
  }
};

export default generateRedeemScriptHex;
