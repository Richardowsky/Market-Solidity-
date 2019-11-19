const Market = artifacts.require("./Market.sol");
const Project = artifacts.require("./Project.sol");

const chai = require ('chai');
const expect = chai.expect;

const TokenPrice = 1000000000000000;
//onst TokenAmount = 5;


contract("Selling shares", async (accounts)  => {
    let market;
    let buyer  = accounts[1]; 

    before("Сreating a new project and buying five tokens", async function() {
        const TokenAmount = 5;
        market = await Market.new();
        newProject = await market.createProject("abc", "dfi", "SGV", 1500, TokenPrice);
        project = await Project.at(await market.getProject("abc")); 

        //Buying 5 tokens:
        //баланс токенов до их покупки 1500 другим пользователем
        let amountBefore = await market.getSharesCount("abc"); 
        //console.log("getSharesCount before sellShares - " + amountBefore.toString());

        //покупка 
        await market.buyProjectShares("abc", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000
            });
        //покупатель забрал 5 токенов
        let buyerSharesAfter = await project.balanceOf(buyer);
        //console.log("buyer shares - " + buyerSharesAfter.toString());

        //у владельца теперь 1495 токенов
        let amountAfter = await market.getSharesCount("abc");
        //console.log("getSharesCount after  sellShares - " + amountAfter.toString());

        await project.approve(market.address, await project.balanceOf(buyer), {
            from: buyer
        });
    });    
    
    describe('Sale', async function() {

        it("sell of  5 shares", async () => {
            let TokenAmount = 5
            await market.sellProjectShares("abc", TokenAmount, {
                from: buyer,
                gas: 1000000
            });
            let buyerSharesAfterSell = await project.balanceOf(buyer);        
            let amountAfterSell = await market.getSharesCount("abc");

            expect(buyerSharesAfterSell.toString()).to.equal('0');
            expect(amountAfterSell.toString()).to.equal('1500');
        });

        it("sell of  0 shares", async () => {
            let TokenAmount = 0
            await market.sellProjectShares("abc", TokenAmount, {
                from: buyer,
                gas: 1000000
            });
            let buyerSharesAfterSell = await project.balanceOf(buyer);        
            let amountAfterSell = await market.getSharesCount("abc");

            expect(buyerSharesAfterSell.toString()).to.equal('5');
            expect(amountAfterSell.toString()).to.equal('1495');
        });

        it("imbossinle to sell of -1 share", async () => {
            try{
                let TokenAmount = -1
                await market.sellProjectShares("abc", TokenAmount, {
                    from: buyer,
                    gas: 1000000
                });
                expect.fail("No events were emitted");
            } catch (error){
                expect(error.message).to.include('Market: sellProjectShares - You dont have enough shares!');
            }      
        });

        it("buyer's balance of tokens should be different after and before sell", async () => {
            let TokenAmount = 5
            let buyerSharesBeforeSell = await project.balanceOf(buyer);
            await market.sellProjectShares("abc", TokenAmount, {
                from: buyer,
                gas: 1000000
            });
            let buyerSharesAfterSell = await project.balanceOf(buyer);        
            expect(buyerSharesBeforeSell).to.not.equal(buyerSharesAfterSell);
        });

        it("buyer's count of ether should be different before and after sell", async () => {
            let TokenAmount = 5
            let ethereumBefore = await web3.eth.getBalance(buyer);
            await market.sellProjectShares("abc", TokenAmount, {
                from: buyer,
                gas: 1000000
            });
            let ethereumAfter = await web3.eth.getBalance(buyer);
            expect(ethereumBefore).to.not.equal(ethereumAfter);
        });

        it("impossible to sell tokens, more than we have", async () => {
            try{
                let TokenAmount = 2000
                let buyerSharesBeforeSell = await project.balanceOf(buyer);
                await market.sellProjectShares("abc", TokenAmount, {
                    from: buyer,
                    gas: 1000000
                });
                expect.fail("No events were emitted")
            } catch (error){
                expect(error.message).to.equal("Returned error: VM Exception while processing transaction: revert Market: sellProjectShares - You dont have enough shares! -- Reason given: Market: sellProjectShares - You dont have enough shares!.");
            }   
        });

        it("gas should not be a zero", async () => {
            let TokenAmount = 5
            let transaction = await market.sellProjectShares("abc", TokenAmount, {
                from: buyer,
                gas: 0
            });
            expect(transaction.tx).to.be.undefined;
        });

    });    
});   