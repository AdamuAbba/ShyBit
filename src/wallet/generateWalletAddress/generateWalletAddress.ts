import { payments } from "bitcoinjs-lib";
import { ECPairAPI, ECPairFactory, ECPairInterface } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { IWalletAddressData } from "../../types/bitcoin.js";

const generateWalletAddress = (): IWalletAddressData => {
  const ECPair: ECPairAPI = ECPairFactory(ecc);

  const generated_keyPair: ECPairInterface = ECPair.makeRandom();

  const p2pkhAddress = payments.p2pkh({
    pubkey: generated_keyPair.publicKey,
  });

  const result = {
    public_key: generated_keyPair.publicKey.toString("hex"),
    private_key: generated_keyPair.privateKey?.toString("hex"),
    address: p2pkhAddress.address,
  };

  console.log(result);

  return result;
};

export default generateWalletAddress;
