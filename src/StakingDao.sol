// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingDao {
    event Response(bool success, bytes data);

    address public constant cUSDC = 0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1; // Rinkeby
    address public constant USDC = 0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b; // Rinkeby

    IERC20 public token = IERC20(USDC);

    function stakeTokens(uint _amount) public {
        // (bool success, bytes memory data) = USDC.call(
        //     abi.encodeWithSignature("approve(address, uint256)", cUSDC, _amount)
        // );
        // require(success, "Approve didn't go through")

        require(
            IERC20(USDC).approve(cUSDC, _amount),
            "Approve diddn't go rhough"
        );

        (bool success, bytes memory data) = cUSDC.call(
            abi.encodeWithSignature("mint(uint256)", _amount)
        );
        require(success, "Transaction didn't go thhrough");
        emit Response(success, data);
    }

    function withdrawTokens(uint _amount) public {
        (bool success, bytes memory data) = cUSDC.call(
            abi.encodeWithSignature("redeem(uint256)", _amount)
        );
        require(success, "Reedeem didn't go through");
        emit Response(success, data);
    }

    function depositTokensToContract(uint _amount) public {
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Transfer didn't go through"
        );
    }

    function withdraw(uint _amount, address _caller) public {
        token.transfer(_caller, _amount);
    }

    function showBal(address _addr) public view returns (uint) {
        uint amm = token.balanceOf(_addr);
        return amm;
    }
}
