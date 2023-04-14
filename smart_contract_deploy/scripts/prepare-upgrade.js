// scripts/prepare_upgrade.js
const proxyAddress = require("../src/address/Address.json");
async function main() {
  // const proxyAddress = "0x6BC0C2B913E73a73307B94ce272efa2bE97C3B3a";

  const JIRAV2 = await ethers.getContractFactory("JIRAV2");
  console.log("Preparing upgrade...");
  const boxV2Address = await upgrades.prepareUpgrade(proxyAddress, JIRAV2);
  console.log("JIRAV2 at:", boxV2Address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
