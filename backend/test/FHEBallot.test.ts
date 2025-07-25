import { expect } from "chai";
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";

describe("FHEBallot", function () {
  it("deploys", async function () {
    const Ballot = await ethers.getContractFactory("FHEBallot");
    const ballot = await Ballot.deploy();
    await ballot.waitForDeployment();
    const addr = await ballot.getAddress();
    expect(addr).to.properAddress;
  });
});
