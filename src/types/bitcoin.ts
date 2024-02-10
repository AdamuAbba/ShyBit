import { payments } from "bitcoinjs-lib";

export interface IWalletAddressData {
  public_key: string;
  private_key: string | undefined;
  address: string | undefined;
}

export interface ISingleAddressResponse {
  hash160: string;
  address: string;
  n_tx: number;
  n_unredeemed: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
  txs: [];
}

export interface BlockchainInfoErrorResponse {
  error: string;
  message: string;
}

export interface ITransactionObj {
  version: number;
  locktime: number;
  ins: {
    hash: string;
    index: number;
    script: string;
    sequence: number;
    witness: string[];
  }[];
  outs: {
    value: number;
    script: string;
  }[];
}

export interface Address extends payments.Payment {
  derivationPath: string;
  masterFingerprint: Buffer;
  type?: "used" | "unused";
}

export interface SignedTransactionData {
  txHex: string;
  txId: string;
}
