const Project = artifacts.require("Project");
const Market = artifacts.require("Market");
const TokenPrice = 1000000000000000;
const TokenAmount = 99860;
contract("Test all market functions!", accounts => {
    var buyer = accounts[1];
    it(" ", async () => {
        // let project2 = await Project.new("name1", "description1", "SMV", 1500, 10000000000);

        let market = await Market.new();
        await market.createProject("name2", "description2", "SGV", 150000, TokenPrice);
        let project = await Project.at(await market.getProject("name2"));
        let amountBefore = await market.getSharesCount("name2");
        console.log("buyer ethereum before buy shares - " + await web3.eth.getBalance(buyer));

        await market.buyProjectShares("name2", TokenAmount, {
            from: buyer,
            value: TokenPrice * TokenAmount,
            gas: 1000000
        });

        let buyerSharesAfter = await project.balanceOf(buyer);
        let amountAfter = await market.getSharesCount("name2");
        let projectInfo = await market.getProjectInfo("name2");
        let price = await market.getPrice("name2");

        console.log("buyer ethereum after buy shares - " + await web3.eth.getBalance(buyer));
        console.log("buyer shares - " + buyerSharesAfter.toString());
        console.log("getSharesCount before sellShares - " + amountBefore.toString());
        console.log("getSharesCount after  sellShares - " + amountAfter.toString());
        console.log("getProjectInfo - " + projectInfo);
        console.log("getPrice - " + price.toString());

        await project.approve(market.address, await project.balanceOf(buyer), {
            from: buyer
        });

        await market.sellProjectShares("name2", TokenAmount, {
            from: buyer,
            gas: 1000000
        });

        let buyerSharesAfterSell = await project.balanceOf(buyer);
        let amountAfterSell = await market.getSharesCount("name2");
        console.log(" ");
        console.log("buyer ethereum after sell shares - " + await web3.eth.getBalance(buyer));
        console.log("buyer shares - " + buyerSharesAfterSell.toString());
        console.log("getSharesCount after sellShares - " + amountAfterSell.toString());
    })

});