# Block constructor challenge

## BLOCK SAMPLE

2e3da8fbc1eaca8ed9b7c2db9e6545d8ccac3c67deadee95db050e41c1eedfc0
6eb38fad135e38a93cb47a15a5f953cbc0563fd84bf1abdec578c2af302e10bf
79c51c9d4124c5cbb37a85263748dcf44e182dff83561fa3087f0e9e43f41c33
8c25f9be93990b96e8bc363778d6debee6867c7d73cefab69405d41e677b536c

## BLOCK CONSTRUCTOR

This task will give you a chance to showcase your abilities and give us a sense of how you approach problems and write code. The challenge is open-ended and allows for multiple approaches.

### The problem

Bitcoin miners construct blocks by selecting a set of transactions from their mempool. Each transaction in the mempool:

- includes a fee which is collected by the miner if that transaction is included in a block
- has a weight, which indicates the size of the transaction
- may have one or more parent transactions which are also in the mempool

The miner selects an ordered list of transactions that have a combined weight below the maximum block weight. Transactions with parent transactions in the mempool may be included in the list, but only if all of their parents appear before them in the list.

Naturally, the miner would like to include the transactions that maximize the total fee.

Your task is to write a program that reads a file mempool.csv, with the format:

`<txid>`,`<fee>`,`<weight>`,`<parent_txids>`

`txid` is the transaction identifier
`fee` is the transaction fee
`weight` is the transaction weight
`parent_txids` is a list of the txids of the transaction’s immediate parent transactions in the mempool. Ancestors that are not immediate parents (eg parents of parents) and parent transactions already in the chain are not included in this list. It is of the form: `<txid1>;<txid2>;...`

The output from the program should be txids, separated by newlines, which make a valid block, maximizing the fee to the miner. Transactions MUST appear in order. No transaction should
