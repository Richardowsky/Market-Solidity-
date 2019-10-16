pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Project is Ownable, ERC20 {
    string public name;
    string public description;
    string public symbol;
    uint public decimals = 18;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    constructor(string memory n, string memory desc, string memory symb, uint initialSupply, uint256 price) public {
        name = n;
        description = desc;
        symbol = symb;
        _mint(address(msg.sender), initialSupply);
        tokenPrice = price;
    }

}