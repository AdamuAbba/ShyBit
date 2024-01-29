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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = void 0;
//import packages:
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const ecpair_1 = require("ecpair");
const ecc = __importStar(require("tiny-secp256k1"));
var prompt = require("prompt-sync")({ sigint: false });
//set network to testnet
const { testnet } = bitcoin.networks;
const ECPair = (0, ecpair_1.ECPairFactory)(ecc);
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
    var _a;
    const p2pkhAddress = bitcoinjs_lib_1.payments.p2pkh({
        network: testnet,
        pubkey: generated_keyPair.publicKey,
    });
    console.log("Wallet Address data =>>", {
        public_key: generated_keyPair.publicKey,
        private_key: (_a = generated_keyPair.privateKey) === null || _a === void 0 ? void 0 : _a.buffer,
        "wallet_address(p2pkh)": p2pkhAddress.address,
    });
};
const checkWalletBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Enter Wallet address bellow to check balance");
    const walletAddress = prompt("Address == ");
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/balance`;
    const result = yield fetch(url);
    const resultJsonData = yield result.json();
    console.log("WalletData =>>", resultJsonData);
});
console.log("Welcome to shyX bitcoin Wallet\n1 == Create Wallet Address\n2 == View Wallet data");
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
