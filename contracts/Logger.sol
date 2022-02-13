//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "./Ownable.sol";

contract Logger is Ownable {
    using Address for address;

    address public tokenDepositorContract;

    struct TokensLedger {
        address[] tokens;
        // erc20 token address => user amount
        mapping(address => uint256) balances;
    }

    // user address => user wallet
    mapping(address => TokensLedger) private tokenBalances;

    modifier onlyTokenDepositor() {
        require(
            tokenDepositorContract.isContract(),
            "tokenDepositorContract address is not set"
        );
        require(
            tokenDepositorContract == msg.sender,
            "Only tokenDepositorContract has access"
        );
        _;
    }

    function updateTokenDepositorContract(address newTokenDepositorContract)
        external
        onlyOwner
    {
        require(
            newTokenDepositorContract.isContract(),
            "Not a valid contract address"
        );
        tokenDepositorContract = newTokenDepositorContract;
    }

    function getTokens(address user)
        external
        view
        returns (address[] memory tokens, uint256[] memory balances)
    {
        address[] memory userTokens = tokenBalances[user].tokens;
        uint256[] memory _balances = new uint256[](userTokens.length);
        for (uint256 i = 0; i < userTokens.length; i++) {
            address tokenAddress = userTokens[i];
            _balances[i] = tokenBalances[user].balances[tokenAddress];
        }

        tokens = tokenBalances[user].tokens;
        balances = _balances;
    }

    function hasRegisteredToken(address tokenAddress)
        private
        view
        returns (bool)
    {
        // if user has balance > 0 the token is already registered
        if (tokenBalances[msg.sender].balances[tokenAddress] > 0) {
            return true;
        }

        address[] memory userTokens = tokenBalances[msg.sender].tokens;
        // if token exists in userTokens then it is registered
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == tokenAddress) {
                return true;
            }
        }

        return false;
    }

    function recordDeposit(
        address user,
        address tokenAddress,
        uint256 amount
    ) external onlyTokenDepositor {
        if (!hasRegisteredToken(tokenAddress)) {
            tokenBalances[user].tokens.push(tokenAddress);
        }
        tokenBalances[user].balances[tokenAddress] += amount;
    }

    function recordDeposit(address tokenAddress, uint256 amount)
        external
        onlyOwner
    {
        if (!hasRegisteredToken(tokenAddress)) {
            tokenBalances[_owner].tokens.push(tokenAddress);
        }
        tokenBalances[_owner].balances[tokenAddress] += amount;
    }
}
