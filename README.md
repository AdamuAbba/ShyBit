# ShyBit-CLI

### Table of content

- Requirements
- Sample view
- Quick notes
- Articles
- Installation

### Requirements

- Bitcoin core (installed globally and available in PATH)
- node (installed)
- Internet connection

### Sample View

| No  | function                   | category    | deliverable | test |
| --- | -------------------------- | ----------- | ----------- | ---- |
| 1   | Create Wallet Address      | wallet      | true        | true |
| 2   | View Wallet data           | wallet      | false       | true |
| 3   | Decode raw transaction hex | transaction | true        | true |
| 4   | Run stack evaluator        | transaction | true        | true |
| 5   | Generate Redeem Script hex | transaction | true        | true |

### Quick notes

- All BTrust code deliverables can be found in this repo
- code for the Block constructor challenge deliverable can be found [HERE](./src/block%20constructor%20challenge/)
- This repository is a work in progress.
- `deliverable` column identifies a BTrust deliverable from a none BTrust deliverable feature
- `test` column specifies if a test has been written for a function

### Articles

Here are links to my published articles (BTrust deliverables)

- [Simulate your first Lightning transaction on the Bitcoin regtest network `Part 1` (MacOS)-This is a simulation of lightning transactions - a three-part series](https://dev.to/shytypes1028/simulate-your-first-lightning-transaction-on-the-bitcoin-regtest-network-part-1-macos-4o3c)
- [Simulate your first lightning transaction on the Bitcoin regtest network `Part 2` (MacOS)-This is a simulation of lightning transactions - a three-part series](https://dev.to/shytypes1028/simulate-your-first-lightning-transaction-on-the-bitcoin-regtest-network-part-2-macos-2el0)
- [Simulate your first lightning transaction on the Bitcoin regtest network `Part 3` (MacOS)-This is a simulation of lightning transactions - a three-part series](https://dev.to/shytypes1028/simulate-your-first-lightning-transaction-on-the-bitcoin-regtest-network-part-3-macos-4b22)
- [Bitcoin - A dummy's technical guide to the bitcoin ecosystem `part 1`](https://dev.to/shytypes1028/bitcoin-a-dummys-technical-guide-to-the-bitcoin-ecosystem-part-1-oje)
- [Bitcoin - A dummy's technical guide to the bitcoin ecosystem `part 2` (Addresses)](https://dev.to/shytypes1028/bitcoin-a-dummys-technical-guide-to-the-bitcoin-ecosystem-part-2-addresses-2i0a)

### installation

Follow the highlighted steps below to install and run the app

### clone this repo

```bash
git clone https://github.com/AdamuAbba/ShyBit-CLI.git
```

### change directory and install npm packages

```bash
cd ShyBit-CLI
```

```bash
npm install
```

### build and run the app

```bash
npm run dev
```

### run tests

Run the command below to run tests. all tests are written with [Jest](https://jestjs.io/)

```bash
npm run test
```
