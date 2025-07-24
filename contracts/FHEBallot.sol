// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, ebool, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract FHEBallot is SepoliaConfig {
    euint64 private yesCount;
    euint64 private noCount;

    constructor() {
        yesCount = FHE.allowThis(FHE.asEuint64(0));
        noCount = FHE.allowThis(FHE.asEuint64(0));
    }

    function vote(externalEuint64 encrypted, bytes calldata attestation) external {
        euint64 choice = FHE.fromExternal(encrypted, attestation);
        ebool isYes = FHE.eq(choice, FHE.asEuint64(1));
        ebool isNo = FHE.eq(choice, FHE.asEuint64(2));

        if (ebool.unwrap(isYes) != 0) {
            yesCount = FHE.allowThis(FHE.add(yesCount, FHE.asEuint64(1)));
        } else if (ebool.unwrap(isNo) != 0) {
            noCount = FHE.allowThis(FHE.add(noCount, FHE.asEuint64(1)));
        } else {
            revert("invalid vote");
        }
    }

    function getResults() external view returns (euint64, euint64) {
        return (yesCount, noCount);
    }
}
