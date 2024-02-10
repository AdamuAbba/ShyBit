import { describe, expect, test } from "@jest/globals";
import { redeemScriptHexGenerator } from "./generateRedeemScriptHex.js";

const redeemScriptHex =
  "4f505f5348413235362031366530353631343532366331656264336131373061343330613139303661363438346664643230336162376365363639306135343933386635633434643764204f505f455155414c";
const preimage = "Btrust Builders";

describe("generate the redeem script", () => {
  test("generate the redeem script in hex format for the given preimage. Note: redeem_script => OP_SHA256 <lock_hex> OP_EQUAL", () => {
    expect(redeemScriptHexGenerator(preimage)).toEqual(redeemScriptHex);
  });
});
