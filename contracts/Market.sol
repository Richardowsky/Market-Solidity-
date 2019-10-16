pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Project.sol";

contract Market is Ownable {

    mapping(string => Project) data;


    function createProject(string memory name, string memory description, string memory symbol, uint initialSupply, uint256 price) public {
        Project project = new Project(name, description, symbol, initialSupply, price);
        data[name] = project;
    }

    function getProject(string memory name) public view returns (address) {
        require(address(data[name]) != address(0), "Market: getProject - Name does not exist!");
        return address(data[name]);
    }

    function getProjectInfo(string memory name) public view returns (string memory) {
        require(address(data[name]) != address(0), "Market: getProjectInfo - Name does not exist!");
        return data[name].description();
    }

    function getPrice(string memory name) public view returns (uint256) {
        require(address(data[name]) != address(0), "Market: getPrice - Name does not exist!");
        return data[name].tokenPrice();
    }

    function getSharesCount(string memory name) public view returns (uint256) {
        require(address(data[name]) != address(0), "Market: getSharesCount - Name does not exist!");
        return data[name].balanceOf(address(this));
    }

    function multiply(uint amount, uint price) internal pure returns (uint) {
        require(price == 0 || (amount * price) / price == amount);
        return amount * price;
    }

    function buyProjectShares(string memory name, uint256 _numberOfTokens) public payable {
        require(address(data[name]) != address(0), "Market: buyProjectShares - Name does not exist!");
        require(msg.value >= multiply(_numberOfTokens, getPrice(name)), "Market: buyProjectShares - Incorrect amount!");
        require(getSharesCount(name) >= _numberOfTokens, "Market: buyProjectShares - To many shares you want to buy!");
        require(data[name].transfer(msg.sender, _numberOfTokens), "Market: Bad transfer!");
    }

    function sellProjectShares(string memory name, uint256 _numberOfTokens) public payable {
        require(address(data[name]) != address(0), "Market: sellProjectShares - Name does not exist!");
        require(data[name].balanceOf(msg.sender) >= _numberOfTokens, "Market: sellProjectShares - You dont have enough shares!");
        require(data[name].transferFrom(msg.sender, address(this), _numberOfTokens), "Market: sellProjectShares - Bad transfer!");
        uint256 value = getPrice(name) * _numberOfTokens;
        msg.sender.transfer(value);
    }

}