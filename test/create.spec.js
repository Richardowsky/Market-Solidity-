const Market = artifacts.require("./Market.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;

contract("Create a project", (accounts)  => {
    let market;
  
    it("Impossible create project if arguments >5", async () => {
      try {
        newProject = await market.createProject("dfi", "SGV", 123456, TokenPrice);
        //console.log(newProject)
        expect.fail("No events were emitted");
      }
      catch(error) {
        expect(error.message).to.equal('Invalid number of parameters for "createProject". Got 4 expected 5!');
      }
    });
  
    it("Impossible create project without any parameters", async () => {
      try {
        newProject = await market.createProject();
        expect.fail("exception should be thrown");
      }
      catch(error) {
        expect(error.message).to.equal('Invalid number of parameters for "createProject". Got 0 expected 5!');
      }
    });
  
    before("Create a new project", async function() {
      market = await Market.new();
      newProject = await market.createProject("abc", "dfi", "SGV", 123456, TokenPrice);
    });
      
    it("Create a project", async () => {
        expect(newProject).to.be.ok;
    }); 
  
    it("tx and transactionHash should be the same", async () => {
      expect(newProject.tx, newProject.receipt.transactionHash).to.be.ok;       
    });
  
    it("Transaction id should be different", async () => {
      let project2 = await market.createProject("abc", "dfi", "SGV", 123456, TokenPrice);
      expect(newProject.tx).to.not.equal(project2.tx);
    });
  
    it("Project should have components of an ECDSA digital signature", async () => {
      expect(newProject.receipt.v).to.be.ok;
      expect(newProject.receipt.r).to.be.ok;
      expect(newProject.receipt.s).to.be.ok; 
    });

    it.skip("impossible to create 2 projects with the same name", async () => {
      newProject2 = await market.createProject("abc", "dfi", "SGV", 123456, TokenPrice);
      //assert.fail("Project is created twice");
      // expect(newProject).fail("Project is created twice")
      expect.fail(newProject2).to.be.true;
    });    

});
