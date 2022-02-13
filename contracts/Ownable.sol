//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

abstract contract Ownable {
    address internal _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
