class MempoolTransaction {
  constructor(txid, fee, weight, parents) {
    this.txid = txid;
    this.fee = parseInt(fee);
    this.weight = parseInt(weight);
    this.parents = parents ? parents.split(";") : [];
  }
}

function parseMempoolCsv(fileData) {
  return fileData.split("\n").map((line) => {
    const [txid, fee, weight, parents] = line.split(",");
    return new MempoolTransaction(txid, fee, weight, parents);
  });
}

function selectTransactions(transactions, maxBlockWeight = 4000000) {
  const selectedTxids = new Set();
  let totalWeight = 0;

  for (const transaction of transactions) {
    if (
      totalWeight + transaction.weight <= maxBlockWeight &&
      !transaction.parents.some((parentTxid) => !selectedTxids.has(parentTxid))
    ) {
      selectedTxids.add(transaction.txid);
      totalWeight += transaction.weight;
    }
  }

  return selectedTxids;
}

function orderTransactions(transactions, selectedTxids) {
  // Preserve the order of appearance in the original CSV file
  const orderedTxids = transactions
    .filter((tx) => selectedTxids.has(tx.txid))
    .map((tx) => tx.txid);
  return orderedTxids;
}

function main() {
  const fs = require("fs");
  const fileData = fs.readFileSync("./mempool.csv", "utf8");
  const transactions = parseMempoolCsv(fileData);
  const selectedTxids = selectTransactions(transactions);
  const orderedTxids = orderTransactions(transactions, selectedTxids);

  for (const txid of orderedTxids) {
    console.log(txid);
  }
}

main();
