//import packages:
import { BIP32Interface } from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { Psbt, Transaction, payments } from "bitcoinjs-lib";
import chalk from "chalk";
import { exec } from "child_process";
import Table from "cli-table";
import { paste } from "copy-paste";
import { ECPairAPI, ECPairFactory, ECPairInterface } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { IBitCliTransactionDetails, SignedTransactionData } from "./types";
var prompt = require("prompt-sync")({ sigint: false });

const table = new Table({
  head: ["option", "function", "category"],
  colWidths: [10, 30, 30],
  rows: [
    ["1", "Create Wallet Address", "Wallet"],
    ["2", "View Wallet data", "Wallet"],
    ["3", "Decode raw transaction hex", "Transaction"],
    ["4", "Decode Script", "Transaction"],
  ],
});

const logger = {
  success: (value: string) => console.log(chalk.green(value)),
  warning: (value: string) => console.log(chalk.yellow(value)),
  error: (value: string) => console.log(chalk.red(value)),
};

const { testnet } = bitcoin.networks;
const ECPair: ECPairAPI = ECPairFactory(ecc);
const BLOCK_CYPHER_BASE_URL = "https://api.blockcypher.com";

const generated_keyPair: ECPairInterface = ECPair.makeRandom({
  network: testnet,
});

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
  const url = `${BLOCK_CYPHER_BASE_URL}/v1/btc/test3/addrs/${walletAddress}/balance`;
  const result = await fetch(url);
  const resultJsonData = await result.json();
  console.log("WalletData =>>", resultJsonData);
};

const decodeRawTransaction = async () => {
  const hexInput: "yes" | "no" = prompt("paste hex from clipboard? (yes/no): ");
  switch (hexInput.toLocaleLowerCase()) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard :${dataFromClipboard}`);
      exec(
        `bitcoin-cli decoderawtransaction ${dataFromClipboard}`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          const outputAsJsObject: IBitCliTransactionDetails =
            JSON.parse(stdout);
          const { locktime, version, vin, vout } = outputAsJsObject;
          const formatted = { locktime, version, vin, vout };
          console.log(`\n${JSON.stringify(formatted, null, " ")}`);
        }
      );
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app 🤦‍♂️");
      break;
    default:
      break;
  }
};

const decodeScript = () => {
  const hexInput: "yes" | "no" = prompt(
    "paste script hex from clipboard? (yes/no): "
  );
  switch (hexInput.toLocaleLowerCase()) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard :${dataFromClipboard}`);
      //Todo check if bitcoind service is running on host machine first
      exec(
        `bitcoin-cli decodescript ${dataFromClipboard}`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`\n${stdout}`);
        }
      );
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app");
      break;
    default:
      break;
  }
};

const main = (): void => {
  logger.success("welcome to ShyBit-CLI");
  console.log(table.toString());
  const option = prompt("Option : ");
  switch (Number(option)) {
    case 1:
      generateWalletAddress();
      break;
    case 2:
      checkWalletBalance();
      break;
    case 3:
      decodeRawTransaction();
      break;
    case 4:
      decodeScript();
      break;
    default:
      break;
  }
};

main();
