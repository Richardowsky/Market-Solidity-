pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Project.sol";

contract Market is Ownable {

    mapping(string => Project) data;


    function createProject(string memory name, string memory description, string memory symbol, uint initialSupply, uint256 price) public {
        Project project = new Project(name, description, symbol, initialSupply, price);
        data[name] = project;
    }

    function getProject(string memory name) public view returns (Project) {
        return data[name];
    }

    function getProjectInfo(string memory name) public view returns (string memory) {
        return data[name].description();
    }

    function getPrice(string memory name) public view returns (uint256) {
        return data[name].tokenPrice();
    }

    function getSharesCount(string memory name) public view returns (uint256) {
        return data[name].totalSupply() - data[name].tokensSold();
    }

    function sendProjectMoney(string memory name, uint amount) public {
        data[name].transfer(msg.sender, amount);
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyProjectShares(string memory name, uint256 _numberOfTokens) public payable {
        require(msg.value >= multiply(_numberOfTokens, getPrice(name)));
        require(getSharesCount(name) >= _numberOfTokens);
        require(data[name].transfer(msg.sender, _numberOfTokens));
        data[name].setTokenSold(_numberOfTokens);
    }

    function sellProjectShares(string memory name, uint256 _numberOfTokens) public payable {
        require(data[name].balanceOf(msg.sender) >= _numberOfTokens);
        require(data[name].transferFrom(msg.sender, address(this), _numberOfTokens));
        uint256 value = getPrice(name) * _numberOfTokens;
        msg.sender.transfer(value);
        data[name].setTokenReturn(_numberOfTokens);
    }

}