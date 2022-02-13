//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ILogger.sol";
import "./Ownable.sol";

contract TokenDepositor is Ownable {
    using SafeERC20 for ERC20;
    using Address for address;

    address loggerContract;

    constructor(address _loggerContract) {
        loggerContract = _loggerContract;
    }

    function updateLoggerContract(address newLoggerContract)
        external
        onlyOwner
    {
        require(
            newLoggerContract.isContract(),
            "Not a valid logger contract address"
        );
        loggerContract = newLoggerContract;
    }

    function depositToken(address tokenAddress, uint256 amount) external {
        require(
            loggerContract.isContract(),
            "Not a valid logger contract address"
        );
        require(
            tokenAddress.isContract(),
            "Not a valid token contract address"
        );
        ERC20 token = ERC20(tokenAddress);

        uint256 allowance = token.allowance(msg.sender, address(this));
        require(
            allowance >= amount,
            "Not enough token allowance to complete the deposit"
        );

        ILogger logger = ILogger(loggerContract);
        logger.recordDeposit(msg.sender, tokenAddress, amount);

        token.safeTransferFrom(msg.sender, address(this), amount);
    }
}
