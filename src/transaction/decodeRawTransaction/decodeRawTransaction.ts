import * as bitcoin from "bitcoinjs-lib";
import { paste } from "copy-paste";
import { logger, prompt } from "../../utils/index.js";
import { ITransactionObj } from "../../types/index.js";

export const decoderFunction = (hex: string): ITransactionObj => {
  const findTransactionType = () => {
    try {
      const tx = bitcoin.Transaction.fromHex(hex);
      // Check if transaction has only one input and one output, this might indicate a simple payment
      if (tx.ins.length === 1 && tx.outs.length === 1) {
        return "Simple Payment";
      }

      // Check if transaction has multiple inputs, this might indicate a consolidation transaction
      if (tx.ins.length > 1) {
        return "Consolidation";
      }

      // Check if transaction has multiple outputs, this might indicate a payment to multiple recipients
      if (tx.outs.length > 1) {
        return "Payment to Multiple Recipients";
      }

      // handle edge case of no valid condition
      return "Unknown";
    } catch (error) {
      console.error("Error parsing transaction:", error);
      return "Error";
    }
  };

  const tx = bitcoin.Transaction.fromHex(hex);

  const { version, locktime, ins, outs } = tx;
  const inputs = ins.map((ins) => {
    return {
      hash: ins.hash.toString("hex"),
      index: ins.index,
      script: ins.script.toString("hex"),
      sequence: ins.sequence,
      witness: ins.witness.map((witness) => witness.toString("hex")),
    };
  });

  const outputs = outs.map((out) => {
    return {
      value: out.value,
      script: out.script.toString("hex"),
    };
  });

  const transactionObj = {
    transactionType: findTransactionType(),
    version,
    locktime,
    ins: inputs,
    outs: outputs,
  };

  console.log(transactionObj);

  return transactionObj;
};

const value =
  "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff080415112a1c02c100ffffffff0100f2052a01000000434104a9d6840fdd1497b3067b8066db783acf90bf42071a38fe2cf6d2d8a04835d0b5c45716d8d6012ab5d56c7824c39718f7bc7486d389cd0047f53785f9a63c0c9dac00000000";

const decodeRawTransaction = (): ITransactionObj | void => {
  const hexInput = prompt(
    "paste hex from clipboard? (yes/no/[hit 'ENTER' for default]): ",
    { value }
  );
  switch (hexInput.toLocaleLowerCase()) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard :${dataFromClipboard}`);
      decoderFunction(dataFromClipboard);
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app 🤦‍♂️");
      break;
    default:
      logger.info(`default :${hexInput}`);
      decoderFunction(hexInput);
      break;
  }
};

export default decodeRawTransaction;
