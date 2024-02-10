import { describe, it } from "@jest/globals";
import * as assert from "node:assert";
import generateWalletAddress from "./generateWalletAddress.js";

describe("can generate a random address P2PKH address", () => {
  it("should generate a P2PKH address starting with n", async () => {
    const { address } = generateWalletAddress();
    assert.strictEqual(address!.startsWith("1"), true);
  });
});
