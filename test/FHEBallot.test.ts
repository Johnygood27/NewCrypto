import { expect } from "chai";
import { ethers } from "hardhat";

describe("FHEBallot", function () {
  it("deploys", async function () {
    const Ballot = await ethers.getContractFactory("FHEBallot");
    const ballot = await Ballot.deploy();
    await ballot.deployed();
    expect(ballot.address).to.properAddress;
  });
});
