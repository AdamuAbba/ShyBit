import { describe, expect, it } from "@jest/globals";
import { decoderFunction } from "./decodeRawTransaction.js";

const TestHex =
  "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff080415112a1c02c100ffffffff0100f2052a01000000434104a9d6840fdd1497b3067b8066db783acf90bf42071a38fe2cf6d2d8a04835d0b5c45716d8d6012ab5d56c7824c39718f7bc7486d389cd0047f53785f9a63c0c9dac00000000";

describe("transaction parser", () => {
  it("parse transaction hex and return type, version, inputs, outputs and the locktime.", () => {
    expect(decoderFunction(TestHex)).toHaveProperty("locktime");
  });
});
