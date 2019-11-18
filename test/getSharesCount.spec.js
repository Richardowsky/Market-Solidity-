const Market = artifacts.require("./Market.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;

contract("Get Shares Count", ()  => {
  let market;
  
  before("Project", async function() {
    market = await Market.new();
    newProject = await market.createProject("ONE", "dfi", "SGV", 123456, TokenPrice);
  });
  
  it("Get shares of new project", async () => {
    let amountBefore = await market.getSharesCount("ONE");
    expect(amountBefore).to.be.ok;
  });
  
  it("Impossible to get shares count without name", async () => {
    try {
      let amountBefore = await market.getSharesCount('');
      expect.fail("No events were emitted");
    }
    catch(error) {
      expect(error.message).to.equal('Returned error: VM Exception while processing transaction: revert Market: getSharesCount - Name does not exist!');
    }
  });
  
  it("Count of shares should be 123456 before selling", async () => {
    let amountBefore = await market.getSharesCount("ONE");
    expect(amountBefore.toString()).to.equal('123456')
  });
});
  