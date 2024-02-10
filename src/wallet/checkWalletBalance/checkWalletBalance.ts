import { logger, prompt } from "../../utils/index.js";
import { paste } from "copy-paste";
import {
  ISingleAddressResponse,
  BlockchainInfoErrorResponse,
} from "../../types/bitcoin.js";
import { oraPromise } from "ora";

export const balanceCheckerFunction = async (
  address: string
): Promise<ISingleAddressResponse | BlockchainInfoErrorResponse> => {
  try {
    const apiCall = fetch("https://blockchain.info/rawaddr/" + address, {
      method: "GET",
    });

    const result = await oraPromise<Response>(apiCall, {
      text: "fetching data",
      successText: "fetch success",
      failText: "fetch failed",
    });

    const resultJson = (await result.json()) as ISingleAddressResponse;

    console.log(resultJson);
    return resultJson;
  } catch (error: unknown) {
    const typedError = error as BlockchainInfoErrorResponse;
    console.log(typedError);
    return typedError;
  }
};

const checkWalletBalance = async () => {
  const hexInput = prompt("paste address from clipboard? (yes/no): ");
  switch (hexInput?.toLocaleLowerCase()) {
    case "yes":
      const dataFromClipboard = paste();
      logger.success(`clipboard :${dataFromClipboard}`);
      await balanceCheckerFunction(dataFromClipboard);
      break;
    case "no":
      logger.error("Nice going wise guy you broke the app 🤦‍♂️");
      break;
    default:
      break;
  }
};

export default checkWalletBalance;
