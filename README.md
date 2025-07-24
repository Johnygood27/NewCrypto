# FHE-VoteForge

This project demonstrates a simple confidential voting dApp using the Zama FHEVM. It includes a Solidity contract, deployment scripts, a minimal React UI and Hardhat tests.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Compile the contracts offline using the bundled solc:
  ```bash
  pnpm compile
  ```
3. Deploy the contract:
  ```bash
  pnpm hardhat run scripts/deploy.ts --network sepolia
  ```
4. Run tests:
  ```bash
  pnpm hardhat test
  ```
5. Frontend lives in `frontend/`.

The Hardhat configuration uses a local `solc` compiler and never fetches binaries from `binaries.soliditylang.org`.
