// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract FHEBallot is SepoliaConfig {
    euint64 private yesCount;
    euint64 private noCount;

    constructor() {
        yesCount = FHE.asEuint64(0);
        noCount = FHE.asEuint64(0);
        FHE.allowThis();
    }

    function vote(externalEuint64 encrypted, bytes calldata attestation) external {
        euint64 choice = FHE.fromExternal(encrypted, attestation);
        bool isYes = FHE.eq(choice, FHE.asEuint64(1));
        bool isNo = FHE.eq(choice, FHE.asEuint64(2));

        if (FHE.unwrap(isYes) == 1) {
            yesCount = FHE.add(yesCount, FHE.asEuint64(1));
        } else if (FHE.unwrap(isNo) == 1) {
            noCount = FHE.add(noCount, FHE.asEuint64(1));
        } else {
            revert("invalid vote");
        }
    }

    function getResults() external view returns (euint64, euint64) {
        return (yesCount, noCount);
    }
}
