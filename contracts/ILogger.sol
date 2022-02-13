//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

interface ILogger {
    function recordDeposit(
        address,
        address,
        uint256
    ) external;

    function getTokens(address)
        external
        view
        returns (address[] memory, uint256[] memory);
}
