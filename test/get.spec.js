const Market = artifacts.require("./Market.sol");

const chai = require ('chai');
const expect = chai.expect;
const TokenPrice = 1000000000000000;



// Impossible to get project without name
// Name of project should be a string

// Descricpion of project should be a string

// Symbol  of project should be a string

// project can not have public and private key 
// getProject should return an address




contract("Get Project", (accounts)  => {
    let market;
    
  
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
        expect(addressProject).to.be.a('string')
    });

    it("Address can not be a zero", async () => {
        expect(addressProject).to.be.a('string')
        expect(addressProject).to.not.equal('0')
    });

    it("address should start at 0x", async () => {
        let start = addressProject.slice(0, 2)
        expect(start).to.equal('0x')
    });

    it("address should have 40 symbols after 0x", async () => {
        let start = addressProject.slice(2, )
        expect(start).to.length(40)
    });

    it("address should have 40 symbols after 0x", async () => {
        let start = addressProject.slice(2, )
        expect(start).to.length(40)
    });


});