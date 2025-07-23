# FHE-VoteForge

FHE-VoteForge showcases a minimal voting dApp built with Zama's FHEVM. The contracts handle encrypted votes on-chain while the React frontend encrypts user input before submitting transactions via MetaMask.

## Setup

```bash
pnpm install
```

If the install fails fetching `@fhevm/vm`, ensure the npm registry is accessible.

## Compile contracts

```bash
pnpm compile
```

Compilation runs with the local `solc` compiler defined in `hardhat.config.ts`.

## Run tests

```bash
pnpm test
```

Hardhat uses the local `solc` package. If the compiler can't be downloaded due to network
restrictions, make sure `solc` is installed and configured in `hardhat.config.ts`.

## Deploy to Sepolia

```bash
pnpm hardhat run scripts/deploy.ts --network sepolia
```

## Encrypting values

Install the CLI and generate `externalEuint64` values and their attestations:

```bash
pnpm dlx @fhevm/cli encode --type uint64 --value 5 --address <CONTRACT_ADDRESS> \
  --public-key <PUBLIC_KEY> > encrypted.json
```

Use the fields from `encrypted.json` with the `vote` function or the frontend interface.
Paste both `encoded` and `attestation` into the voting form so the contract can
decrypt and verify your choice.

## Frontend

The React app lives in `frontend/`. Start the development server with:

```bash
pnpm --filter frontend dev
```

The UI connects to Sepolia through MetaMask and sends encrypted votes only.

