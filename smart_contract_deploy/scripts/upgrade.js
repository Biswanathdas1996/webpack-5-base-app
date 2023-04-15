/* eslint-disable no-undef */
const Address = require("../../src/web3/Address/Address.json");

async function main() {
  const JIRAV2 = await ethers.getContractFactory("JIRAV2");
  const jirav2 = await upgrades.upgradeProxy(Address, JIRAV2);
  console.log("Box upgraded transction no: ", jirav2?.deployTransaction?.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
