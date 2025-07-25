import { ethers } from "hardhat";

async function main() {
  const Ballot = await ethers.getContractFactory("FHEBallot");
  const ballot = await Ballot.deploy();
  await ballot.deployed();
  console.log("FHEBallot deployed to:", ballot.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
