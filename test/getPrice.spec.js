const Market = artifacts.require("./Market.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;


contract("Get Price", (accounts)  => {
  let market;

  before("Project", async function() {
    market = await Market.new();
    newProject = await market.createProject("ONE", "dfi", "SGV", 123456, TokenPrice);
  });

  it("Get project price", async () => {
    let amountBefore = await market.getPrice("ONE");
    expect(amountBefore.toString()).to.equal('1000000000000000')
  });

  it("Impossible to get price without name", async () => {
    try {
      let amountBefore = await market.getPrice('');
      let amountInString = amountBefore.toString();
      expect.fail("No events were emitted");
    }
    catch(error) {
      expect(error.message).to.equal('Returned error: VM Exception while processing transaction: revert Market: getPrice - Name does not exist!');
    }
  });

  it("Impossible to get price with address of project", async () => {
    try {
      let amountBefore = await market.getPrice('0x45b9436F77C5cfe6116d3F56DC52402D86ae01c9');
      let amountInString = amountBefore.toString();
      expect.fail("No events were emitted");
    }
    catch(error) {
      expect(error.message).to.equal('Returned error: VM Exception while processing transaction: revert Market: getPrice - Name does not exist!');
      }
    });
});