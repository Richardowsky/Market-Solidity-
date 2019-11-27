const Market = artifacts.require("./Market.sol");
const Project = artifacts.require("./Project.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;

contract("Get project info", ()  => {
  let market;
  
  before("Project", async function() {
    market = await Market.new();
    newProject = await market.createProject("ONE", "dfi", "SGV", 123456, TokenPrice);
    projectInfo = await market.getProjectInfo("ONE");
  });
  
    it("Get project  info with correct name", async () => {
      expect(projectInfo).to.be.ok;
    });

    it("Info should be a string", async () => {
      expect(projectInfo).to.be.a('string');
    });
    
    it("Impossible to get project info without name", async () => {
      try {
        project = await project.at(await market.getProjectInfo(''));
        expect.fail("No events were emitted");
      } catch(error) {
        expect(error.message).to.equal('Returned error: VM Exception while processing transaction: revert Market: getProjectInfo - Name does not exist!');
      }
    });
  
    it("Project info should be a description of project", async () => {
      expect(projectInfo).to.equal('dfi');
    });
}); 