const Market = artifacts.require("./Market.sol");

const chai = require ('chai');
const expect = chai.expect;
const TokenPrice = 1000000000000000;

contract("Get Project", (accounts)  => {
    let market;

    it("Impossible to get project without name", async () => {
        try {
          newProject = await market.createProject("ONE", "dfi", "SGV", 123456, TokenPrice);
          project = await market.getProject('');
          expect.fail("exception should be thrown");
        } catch(error) {
          expect(error.message).to.equal('Returned error: VM Exception while processing transaction: revert Market: getProject - Name does not exist!');
        }
      });
  
    before("Project", async function() {
      market = await Market.new();
      newProject = await market.createProject("ONE", "dfi", "SGV", 123456, TokenPrice);
      project = await market.getProject('ONE');
    });
  
    it("Get project", async () => {
        expect(project).to.be.ok;
    });

    it("address can not be a 0x00000000000000000000000000000000000000", async () => {
        expect(project).to.not.equal('0x00000000000000000000000000000000000000');
    });

    it("Address of project should be a string", async () => {
        expect(project).to.be.a('string')
    });

    it("Address can not be a zero", async () => {
        expect(project).to.be.a('string')
        expect(project).to.not.equal('0')
    });

    it("address should start at 0x", async () => {
        let start = project.slice(0, 2)
        expect(start).to.equal('0x')
    });

    it("address should have 40 symbols after 0x", async () => {
        let start = project.slice(2, )
        expect(start).to.length(40)
    });

    it("project can not have public and private key", async () => {
        expect(project.publicKey).to.be.undefined;
        expect(project.PublicKey).to.be.undefined;
        expect(project.privateKey).to.be.undefined;
        expect(project.PublicKey).to.be.undefined;
    });

});