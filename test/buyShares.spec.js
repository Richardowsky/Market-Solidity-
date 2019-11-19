const Market = artifacts.require("./Market.sol");
const Project = artifacts.require("./Project.sol");
const chai = require ('chai');
const expect = chai.expect;
const TokenPrice = 1000000000000000; // wei   = 1 eth
const TokenAmount = 99; // gwei = 0.0009986 ETHER
// Gas Price is 2000000000 wei
// initialSupply = 15000; //new BN(100) ;


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
  
    it("buyer before buying Shares should have wei", async () => {
        expect(balanceBefore).to.be.ok; 
    });

    it("buyer before buying Shares should have 0 Shares", async () => {
        let buyerSharesAfter = await project.balanceOf(buyer);
        let SharesInString = buyerSharesAfter.toString();   
        expect(SharesInString).to.equal('0');
    });

    it("after purchasing, the number of Shares increased (99)", async () => {
        await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 
        });
        let buyerSharesBefore = await project.balanceOf(buyer);
        let sharesInString = buyerSharesBefore.toString();     
        expect(sharesInString).to.equal('99')
    }); 
    
    it("the number of tokens after the purchase of shares has changed", async () => {
        await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 
        });
        let balanceAfter = await web3.eth.getBalance(buyer)
        expect(balanceAfter).to.not.equal(balanceBefore);     
    });

    it("ethereum remains in the buyer's account if there are not enough funds to buy shares", async () => {
        try {
            const TokenAmount = 999999;
            await market.buyProjectShares("abc", TokenAmount, {
                from: buyer,
                value: TokenPrice * TokenAmount,
                gas: 1000000
            });   
            expect.fail("Returned error: sender doesn't have enough funds to send tx. The upfront cost is: 1000019000000000000000 and the sender's account only has: 96592676400000000000 -- Reason given: Market: buyProjectShares - To many shares you want to buy!");
        } catch(error) {
            expect(error.message).to.include("Returned error");           
        } finally{
          let balanceAfter = await web3.eth.getBalance(buyer)
          expect(balanceAfter).to.be.equal(balanceAfter)
        }  
    });

    it("token price can not be a zero", async () => {
        try {
            const TokenPrice = 0;
            await market.buyProjectShares("abc", TokenAmount, {
                from: buyer,
                value: TokenPrice * TokenAmount,
                gas: 1000000
            });
            expect.fail('Incorrect amount exception should be thrown');
        } catch (error){
            expect(error.message).to.include("Market: buyProjectShares - Incorrect amount!");
        }       
    });

    it("amount of token can not be zero", async () => {
        const TokenAmount = 0;
        let transaction = await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000
        });
        expect(transaction.tx).to.be.undefined;     
    });

    it("amount of token should be more or = 1 for create transaction", async () => {
        const TokenAmount = 1;
        let transaction = await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 
        });
        expect(transaction.tx).to.be.ok;       
    });
});

