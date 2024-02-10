import { it, describe, expect } from "@jest/globals";
import { balanceCheckerFunction } from "./checkWalletBalance.js";
import { FetchMock } from "jest-fetch-mock";

const fetchMock = fetch as FetchMock;

const testWalletAddress = "1A1iArH9KtJTqS8Nj6D2H4B9FEDPq6nWQH";
const mockResponse = JSON.stringify({
  hash160: "62db7fb7411f4c400ef8bae5328712d3b1ba7f30",
  address: "1A1iArH9KtJTqS8Nj6D2H4B9FEDPq6nWQH",
  n_tx: 0,
  n_unredeemed: 0,
  total_received: 0,
  total_sent: 0,
  final_balance: 0,
  txs: [],
});

describe("Make api call to https://blockchain.info/rawaddr/", () => {
  it("should return wallet details of provided address", async () => {
    fetchMock.mockResponseOnce(mockResponse);
    const response = await balanceCheckerFunction(testWalletAddress);
    expect(JSON.stringify(response)).toEqual(mockResponse);
  });
});
