import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { FHEBallot, FHEBallot__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("FHEBallot")) as FHEBallot__factory;
  const contract = (await factory.deploy(3)) as FHEBallot;
  const address = await contract.getAddress();

  return { contract, address };
}

describe("FHEBallot", function () {
  let signers: Signers;
  let contract: FHEBallot;
  let address: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    ({ contract, address } = await deployFixture());
    await contract.createProposal("Proposal A");
  });

  it("encrypted vote count should start at 0", async function () {
    const encrypted = await contract.getEncryptedVotes(0);
    expect(encrypted).to.eq(ethers.ZeroHash);
  });

  it("vote from two accounts", async function () {
    const clearOne = 1;
    const encrypted = await fhevm
      .createEncryptedInput(address, signers.alice.address)
      .add64(clearOne)
      .encrypt();

    const tx = await contract
      .connect(signers.alice)
      .vote(0, encrypted.handles[0], encrypted.inputProof);
    await tx.wait();

    const after = await contract.getEncryptedVotes(0);
    const clear = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      after,
      address,
      signers.alice,
    );

    expect(clear).to.eq(1);

    const encryptedBob = await fhevm
      .createEncryptedInput(address, signers.bob.address)
      .add64(clearOne)
      .encrypt();

    const tx2 = await contract
      .connect(signers.bob)
      .vote(0, encryptedBob.handles[0], encryptedBob.inputProof);
    await tx2.wait();

    const after2 = await contract.getEncryptedVotes(0);
    const clear2 = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      after2,
      address,
      signers.bob,
    );

    expect(clear2).to.eq(2);
  });

});
