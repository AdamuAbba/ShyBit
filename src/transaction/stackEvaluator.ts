import * as bitcoin from "bitcoinjs-lib";

export const stackEvaluator = () => {
  const scriptHex = "010101029301038801027693010487";
  const scripToByteCode = Buffer.from(scriptHex, "hex");
  const script = bitcoin.script.compile(scripToByteCode);
  console.log(script);
};

// const result = bitcoin.script.execute(script, bitcoin.script.null, bitcoin.script.null);
// console.log(result);
