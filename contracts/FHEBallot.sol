// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint64, externalEuint64, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Confidential voting contract using Zama FHE
/// @dev Each vote is encrypted off-chain and counted without revealing the value
contract FHEBallot is SepoliaConfig {
    struct Proposal {
        string name;
        euint64 voteCount;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public hasVoted;
    uint256 public proposalCount;
    euint64 internal threshold;

    event ProposalCreated(uint256 indexed id, string name);

    constructor(uint64 _threshold) {
        threshold = FHE.asEuint64(_threshold);
    }

    /// @notice Create a new proposal
    function createProposal(string memory name) external {
        proposals[proposalCount] = Proposal({name: name, voteCount: FHE.asEuint64(0)});
        emit ProposalCreated(proposalCount, name);
        proposalCount++;
    }

    /// @notice Cast an encrypted vote for a proposal
    /// @param proposalId The proposal index
    /// @param vote The encrypted vote value
    /// @param attestation The input attestation
    function vote(uint256 proposalId, externalEuint64 vote, bytes calldata attestation) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(proposalId < proposalCount, "Invalid proposal");

        euint64 value = FHE.fromExternal(vote, attestation);
        proposals[proposalId].voteCount = FHE.add(proposals[proposalId].voteCount, value);

        FHE.allowThis(proposals[proposalId].voteCount);
        FHE.allow(proposals[proposalId].voteCount, msg.sender);

        hasVoted[msg.sender] = true;
    }

    /// @notice Retrieve encrypted vote count for a proposal
    function getEncryptedVotes(uint256 proposalId) external view returns (euint64) {
        return proposals[proposalId].voteCount;
    }

    /// @notice Compare proposal votes with threshold
    function aboveThreshold(uint256 proposalId) external view returns (ebool) {
        return FHE.gt(proposals[proposalId].voteCount, threshold);
    }
}
