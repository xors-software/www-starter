// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

/**
 * @title Deploy
 * @notice Deploys all contracts and saves deployment info for type generation
 */
contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envOr("DEPLOYER_PRIVATE_KEY", uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80));
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Counter
        Counter counter = new Counter();
        console.log("Counter deployed at:", address(counter));

        vm.stopBroadcast();

        // Save deployment info
        _saveDeployment(block.chainid, address(counter));
    }

    function _saveDeployment(uint256 chainId, address counterAddress) internal {
        string memory chainIdStr = vm.toString(chainId);
        
        string memory json = string.concat(
            '{\n',
            '  "chainId": ', chainIdStr, ',\n',
            '  "contracts": {\n',
            '    "Counter": {\n',
            '      "address": "', vm.toString(counterAddress), '"\n',
            '    }\n',
            '  }\n',
            '}'
        );
        
        string memory path = string.concat("./deployments/", chainIdStr, ".json");
        vm.writeFile(path, json);
        console.log("Deployment info saved to:", path);
    }
}
