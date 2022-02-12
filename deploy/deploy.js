const { networkConfig } = require('../helper-hardhat-config');

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = await getChainId();

    const args = ["Hello, Hardhat!"];
    
    log("=====================================================")
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...");
    }

    const greeter = await deploy('Greeter', {
        from: deployer,
        args: args,
        log: true,
    });
    const networkName = networkConfig[chainId]['name'];
    log(`You have deployed Greeter contract to ${greeter.address} on network ${networkName}`);
    
    // VERIFY ON ETHERSCAN
    // log(`Verify with: \n hardhat verify --network ${networkname} ${greeter.address}`);
    log("=====================================================")
}
module.exports.tags = ["all"]