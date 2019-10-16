const Project = artifacts.require("Project");

module.exports = function(deployer) {
    deployer.deploy(Project, "name2", "description2", "SGV", 15000, 100000);
};
