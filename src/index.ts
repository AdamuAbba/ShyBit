//import packages:
import * as bitcoin from "bitcoinjs-lib";
import { Psbt, payments, Transaction } from "bitcoinjs-lib";
import { ECPairFactory, ECPairAPI, ECPairInterface } from "ecpair";
import { SignedTransactionData } from "./types";
import * as ecc from "tiny-secp256k1";
import { BIP32Factory, BIP32Interface } from "bip32";
var prompt = require("prompt-sync")({ sigint: false });

//set network to testnet
const { testnet } = bitcoin.networks;

const ECPair: ECPairAPI = ECPairFactory(ecc);

//generate keypair "public" and "private"
const generated_keyPair: ECPairInterface = ECPair.makeRandom({
  network: testnet,
});

const bitcoinTransactionBuilder = new bitcoin.Transaction();
const psbt = new Psbt({ network: testnet });

export const signTransaction = async (
  psbt: Psbt,
  node: BIP32Interface
): Promise<SignedTransactionData> => {
  // await psbt.signAllInputsHD(node);
  // await psbt.validateSignaturesOfAllInputs(validator);
  // await psbt.finalizeAllInputs();

  const tx: Transaction = psbt.extractTransaction();
  const data: SignedTransactionData = {
    txHex: tx.toHex(),
    txId: tx.getId(),
  };

  return data;
};

const generateWalletAddress = () => {
  const p2pkhAddress = payments.p2pkh({
    network: testnet,
    pubkey: generated_keyPair.publicKey,
  });

  console.log("Wallet Address data =>>", {
    public_key: generated_keyPair.publicKey,
    private_key: generated_keyPair.privateKey,
    "wallet_address(p2pkh)": p2pkhAddress.address,
  });
};

const checkWalletBalance = async () => {
  console.log("Enter Wallet address bellow to check balance");
  const walletAddress = prompt("Address == ");
  const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/balance`;
  const result = await fetch(url);
  const resultJsonData = await result.json();
  console.log("WalletData =>>", resultJsonData);
};

console.log(
  "Welcome to shyX bitcoin Wallet\n1 == Create Wallet Address\n2 == View Wallet data"
);
const option = prompt("Option == ");
switch (Number(option)) {
  case 1:
    generateWalletAddress();
    break;
  case 2:
    checkWalletBalance();
    break;
  default:
    break;
}
