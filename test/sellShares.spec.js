const Market = artifacts.require("./Market.sol");
const Project = artifacts.require("./Project.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;
const TokenAmount = 99;


contract("Buying shares", async (accounts)  => {
    let market;
    let buyer = accounts[1];

    before("project", async function() {
        market = await Market.new();
        newProject = await market.createProject("abc", "dfi", "SGV", 15000, TokenPrice);
        project = await Project.at(await market.getProject("abc"));
        amountBefore = await market.getSharesCount("abc");
        balanceBefore = await web3.eth.getBalance(buyer); 
    });

    it("", async () => {
        expect(balanceBefore).to.be.ok; 
    });





});   