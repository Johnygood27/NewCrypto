# FHE-VoteForge

This repository contains a minimal confidential voting example built with Zama's FHEVM.  The Hardhat project now lives in `backend/` and the React front-end in `frontend/`.

## Backend setup

```bash
cd backend
pnpm install
pnpm compile
```

The Hardhat configuration is pinned to the local `solc` found in `node_modules/solc/soljson.js` so compilation works without internet access.

To deploy the contract to Sepolia:

```bash
pnpm hardhat run scripts/deploy.ts --network sepolia
```

## Frontend

The React interface lives in `frontend/`.  It is a small Vite project that connects to MetaMask and calls the contract.

```bash
cd frontend
pnpm install
pnpm dev
```

