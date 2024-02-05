"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const cli_table_1 = __importDefault(require("cli-table"));
const copy_paste_1 = require("copy-paste");
const ecpair_1 = require("ecpair");
const ecc = __importStar(require("tiny-secp256k1"));
var prompt = require("prompt-sync")({ sigint: false });
const table = new cli_table_1.default({
    head: ["option", "function", "category"],
    colWidths: [10, 40, 40],
    rows: [
        ["1", "Create Wallet Address", "Wallet"],
        ["2", "View Wallet data", "Wallet"],
        ["3", "Decode raw transaction hex", "Transaction"],
        ["4", "Decode Script", "Transaction"],
    ],
});
const logger = {
    success: (value) => console.log(chalk_1.default.green(value)),
    warning: (value) => console.log(chalk_1.default.yellow(value)),
    error: (value) => console.log(chalk_1.default.red(value)),
};
//set network to testnet
const { testnet } = bitcoin.networks;
const ECPair = (0, ecpair_1.ECPairFactory)(ecc);
const BLOCK_CYPHER_BASE_URL = "https://api.blockcypher.com";
//generate keypair "public" and "private"
const generated_keyPair = ECPair.makeRandom({
    network: testnet,
});
const bitcoinTransactionBuilder = new bitcoin.Transaction();
const psbt = new bitcoinjs_lib_1.Psbt({ network: testnet });
const signTransaction = (psbt, node) => __awaiter(void 0, void 0, void 0, function* () {
    // await psbt.signAllInputsHD(node);
    // await psbt.validateSignaturesOfAllInputs(validator);
    // await psbt.finalizeAllInputs();
    const tx = psbt.extractTransaction();
    const data = {
        txHex: tx.toHex(),
        txId: tx.getId(),
    };
    return data;
});
exports.signTransaction = signTransaction;
const generateWalletAddress = () => {
    const p2pkhAddress = bitcoinjs_lib_1.payments.p2pkh({
        network: testnet,
        pubkey: generated_keyPair.publicKey,
    });
    console.log("Wallet Address data =>>", {
        public_key: generated_keyPair.publicKey,
        private_key: generated_keyPair.privateKey,
        "wallet_address(p2pkh)": p2pkhAddress.address,
    });
};
const checkWalletBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Enter Wallet address bellow to check balance");
    const walletAddress = prompt("Address == ");
    const url = `${BLOCK_CYPHER_BASE_URL}/v1/btc/test3/addrs/${walletAddress}/balance`;
    const result = yield fetch(url);
    const resultJsonData = yield result.json();
    console.log("WalletData =>>", resultJsonData);
});
const decodeRawTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const hexInput = prompt("paste hex from clipboard? (yes/no): ");
    switch (hexInput.toLocaleLowerCase()) {
        case "yes":
            const dataFromClipboard = (0, copy_paste_1.paste)();
            logger.success(`clipboard :${dataFromClipboard}`);
            (0, child_process_1.exec)(`bitcoin-cli decoderawtransaction ${dataFromClipboard}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                const outputAsJsObject = JSON.parse(stdout);
                const { locktime, version, vin, vout } = outputAsJsObject;
                const formatted = { locktime, version, vin, vout };
                console.log(`\n${JSON.stringify(formatted, null, " ")}`);
            });
            break;
        case "no":
            logger.error("Nice going wise guy you broke the app");
            break;
        default:
            break;
    }
});
const decodeScript = () => {
    const hexInput = prompt("paste script hex from clipboard? (yes/no): ");
    switch (hexInput.toLocaleLowerCase()) {
        case "yes":
            const dataFromClipboard = (0, copy_paste_1.paste)();
            logger.success(`clipboard :${dataFromClipboard}`);
            //Todo check if bitcoind service is running on host machine first
            (0, child_process_1.exec)(`bitcoin-cli decodescript ${dataFromClipboard}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`\n${stdout}`);
            });
            break;
        case "no":
            logger.error("Nice going wise guy you broke the app");
            break;
        default:
            break;
    }
};
const main = () => {
    // figlet("ShyBit-CLI", (err, data): void => {
    //   if (err) {
    //     console.log("Something went wrong...");
    //     console.dir(err);
    //     return;
    //   }
    //   console.log(logger.success(data as string));
    // });
    // logger.success("Welcome to shyBit-CLI bitcoin Wallet");
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
