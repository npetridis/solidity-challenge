//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Petrideum is ERC20 {
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    constructor() ERC20("Petrideum", "PTRD") {
        _mint(msg.sender, 5 * 10**uint256(decimals()));
    }
}
