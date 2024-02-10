import * as bitcoin from "bitcoinjs-lib";
import { paste } from "copy-paste";
import { logger, prompt } from "../../utils/index.js";
import { ITransactionObj } from "../../types/index.js";

export const decoderFunction = (hex: string): ITransactionObj => {
  const tx = bitcoin.Transaction.fromHex(hex);
  console.log(tx);
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
    version,
    locktime,
    ins: inputs,
    outs: outputs,
  };

  return transactionObj;
};

const decodeRawTransaction = (): ITransactionObj | void => {
  const hexInput = prompt("paste hex from clipboard? (yes/no): ");
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
      break;
  }
};

export default decodeRawTransaction;
