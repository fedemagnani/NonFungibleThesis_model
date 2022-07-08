const hre = require("hardhat");

async function main() {

  const NFThesis = await hre.ethers.getContractFactory("NonFungibleThesis");
  const nfthesis = await NFThesis.deploy("University Thesis","UNIT");
  await nfthesis.deployed();
  console.log("Contract deployed to:", nfthesis.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
