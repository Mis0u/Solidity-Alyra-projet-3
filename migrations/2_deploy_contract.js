const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting)
      .then(() => console.log(Voting.address))

};
