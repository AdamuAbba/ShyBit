# ShyBit-CLI

### Table of content

- Requirements
- Sample view
- Quick notes
- Installation

### Requirements

- Bitcoin core (installed globally and available in PATH)
- node (installed)
- Internet connection

### Sample View

| option | function                   | category    | isDeliverable | hasTest |
| ------ | -------------------------- | ----------- | ------------- | ------- |
| 1      | Create Wallet Address      | Wallet      | true          | true    |
| 2      | View Wallet data           | Wallet      |               | true    |
| 3      | Decode raw transaction hex | Transaction | true          | true    |
| 4      | Decode Script              | Transaction | true          |         |
| 5      | Run stack evaluator        | Transaction | true          |         |
| 6      | Generate Redeem Script hex | Transaction | true          | true    |

### Quick notes

- All BTrust code deliverables can be found in this repo
- code for the constructor challenge deliverable can be found [HERE](./src/block%20constructor%20challenge/)
- This repository is a work in progress.
- `isDeliverable` column identifies a BTrust deliverable from a none BTrust deliverable feature

### installation

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

```bash
npm run test
```
