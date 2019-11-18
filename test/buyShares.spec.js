const Market = artifacts.require("./Market.sol");
const Project = artifacts.require("./Project.sol");
const { BN } = require('bn.js');

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000; // wei   = 1 eth
const TokenAmount = 99; // gwei = 0.0009986 ETHER
///Gas Price is 2000000000 wei
//const initialSupply = 15000; //new BN(100) ;


contract("Buying shares", async (accounts)  => {
    let market;
    let buyer = accounts[1];

    before("project", async function() {
        market = await Market.new();
        newProject = await market.createProject("abc", "dfi", "SGV", 15000, TokenPrice);
        project = await Project.at(await market.getProject("abc"));
        amountBefore = await market.getSharesCount("abc");
        balanceBefore = await web3.eth.getBalance(buyer); // buyer ethereum after buy shares
    });
  
    it("buyer before buying Shares should have wei", async () => {
        let buyerBeforeBuyShares = await web3.eth.getBalance(buyer); 
        //console.log(buyerBeforeBuyShares);
        expect(buyerBeforeBuyShares).to.be.ok; // 97294184200000000000 wei 
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
            gas: 1000000 //gweo/i
        });
        let buyerSharesBefore = await project.balanceOf(buyer);
        let sharesInString = buyerSharesBefore.toString(); 
        
        expect(sharesInString).to.equal('99')
    }); 
    
    it("the number of tokens after the purchase of shares has changed", async () => {
        await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 //gweo/i
        });
        let balanceAfter = await web3.eth.getBalance(buyer)
        expect(balanceAfter).to.not.equal(balanceBefore);
        
    });

    it("ethereum remains in the buyer's account if there are not enough funds to buy shares", async () => {
        try {
            balanceBefore = await web3.eth.getBalance(buyer);
            const TokenAmount = 999999;
            await market.buyProjectShares("abc", TokenAmount, {
                from: buyer,
                value: TokenPrice * TokenAmount,
                gas: 1000000 //gweo/i
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
                gas: 1000000 //gweo/i
            });
            expect.fail('Incorrect amount exception should be thrown');
        } catch (error){
            expect(error.message).to.include("Market: buyProjectShares - Incorrect amount!");
        }       
    });

    it("amount of token can not be zero", async () => {
        const TokenAmount = 0;
        await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 //gweo/i
        });
        expect(newProject.tx).to.be.undefined
    });

    it("amount of token should be more or = 1 for transaction", async () => {
        const TokenAmount = 1;
        let aa = await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000 //gweo/i
        });
        expect(newProject.tx).to.be.ok;         
    });

    // it("the transaction is not completed if the buyer has 0 ethereum", async () => {
    //     //try {
    //         balanceBefore = await web3.eth.getBalance(buyer);
    //         console.log(balanceBefore)
    //         await market.buyProjectShares("abc", TokenAmount, {
    //             from: buyer,
    //             value: TokenPrice * TokenAmount,
    //             gas: 11110 //gweo/i
    //         });
    //         let balanceAfter = await web3.eth.getBalance(buyer)
    //         console.log(balanceAfter)

    //         let buyerSharesBefore = await project.balanceOf(buyer);
    //         let sharesInString = buyerSharesBefore.toString(); 


    //         amountAfter = await market.getSharesCount("abc");

    //         //expect(balanceAfter).to.be.equal(balanceAfter)
           
    //         console.log(sharesInString)

             

    //     //}             
    // });

    //TODO:// транзакция создана, эфир снят, баланс 0


});

