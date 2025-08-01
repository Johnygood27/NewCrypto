# FHE-VoteForge

This folder contains the smart contracts and React frontend for the VoteForge
example. Contracts are located under `hardhat/` while the Vite based frontend
lives in `frontend/`.

To deploy the `FHEBallot` contract and start the frontend:

```bash
cd hardhat
pnpm install
pnpm compile
pnpm run deploy --network sepolia
```

Then in another terminal:

```bash
cd ../frontend
npm install
npm run dev
```

The frontend uses `fhevmjs` to produce encrypted inputs which are sent to the
contract so that votes remain private.
