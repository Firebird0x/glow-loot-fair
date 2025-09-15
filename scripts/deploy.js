const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying GlowLootFair contract...");

  // Get the contract factory
  const GlowLootFair = await ethers.getContractFactory("GlowLootFair");

  // Deploy the contract
  // You'll need to provide a verifier address - this can be the deployer for now
  const [deployer] = await ethers.getSigners();
  const verifierAddress = deployer.address; // In production, use a proper verifier address

  const glowLootFair = await GlowLootFair.deploy(verifierAddress);

  await glowLootFair.waitForDeployment();

  const contractAddress = await glowLootFair.getAddress();

  console.log("GlowLootFair deployed to:", contractAddress);
  console.log("Deployed by:", deployer.address);
  console.log("Verifier set to:", verifierAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployer: deployer.address,
    verifier: verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
    transactionHash: glowLootFair.deploymentTransaction().hash
  };

  const fs = require('fs');
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
