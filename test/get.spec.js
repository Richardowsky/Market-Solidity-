const Market = artifacts.require("./Market.sol");
const chai = require ('chai');
const expect = chai.expect;
const TokenPrice = 1000000000000000;
// const Web3 = require("web3")
//  web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/c56337d551814b2c8e6a7d00cd690650"))

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
      addressOfProject = await market.getProject('ONE');

    });
  
    it("Get project", async () => {
        expect(addressOfProject).to.be.ok;
    });

    it("address can not be a 0x00000000000000000000000000000000000000", async () => {
        expect(addressOfProject).to.not.equal('0x00000000000000000000000000000000000000');
    });

    it("Address of project should be a string", async () => {
        expect(addressOfProject).to.be.a('string')
    });

    it("Address can not be a zero", async () => {
        expect(addressOfProject).to.be.a('string')
        expect(addressOfProject).to.not.equal('0')
    });

    it("address should start at 0x", async () => {
        let start = addressOfProject.slice(0, 2)
        expect(start).to.equal('0x')
    });

    it("address should have 40 symbols after 0x", async () => {
        let start = addressOfProject.slice(2, )
        expect(start).to.length(40)
    });

    it("project can not have public and private key", async () => {
        expect(addressOfProject.publicKey).to.be.undefined;
        expect(addressOfProject.PublicKey).to.be.undefined;
        expect(addressOfProject.privateKey).to.be.undefined;
        expect(addressOfProject.PrivateKey).to.be.undefined;
    });

    // it.only("#####################", async () => {
    //      web3.eth.getBalance("0xe0D35Fb00a42080517f368e3C62fA64aCc233711", function(err, result) {
    //         if (err) {
    //         console.log(err)
    //         } else {
    //         console.log(web3.utils.fromWei(result, "ether") + " ETH")
    //         }
    //         expect(result).to.equal('0')
        
    //     })
    // });
});