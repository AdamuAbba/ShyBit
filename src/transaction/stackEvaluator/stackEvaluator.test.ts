import { describe, expect, test } from "@jest/globals";
import { scriptHexToOpcodesHexGenerator } from "./stackEvaluator.js";

const scriptTestHex = "010101029301038801027693010487";

const testBitcoinScript =
  "OP_1 OP_2 OP_ADD OP_3 OP_EQUALVERIFY OP_2 OP_DUP OP_ADD OP_4 OP_EQUAL";

describe("Perform the stack evaluation of a given Bitcoin script ", () => {
  test("solution should output the op_codes and/or values", () => {
    const bitcoinScript = scriptHexToOpcodesHexGenerator(scriptTestHex);
    expect(bitcoinScript).toBe(testBitcoinScript);
  });
});
