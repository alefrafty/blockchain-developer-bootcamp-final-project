const Masterblock = artifacts.require("Masterblock");

module.exports = function (deployer) {
  deployer.deploy(Masterblock);
};