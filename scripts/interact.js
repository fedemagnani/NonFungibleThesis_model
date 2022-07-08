const hre = require("hardhat");
var address = "0x03e907B27570d2CA95CD49C134a60852de4E634B"
async function main() {
    const NFThesis = await ethers.getContractFactory('NonFungibleThesis');
    const nfthesis = await NFThesis.attach(address);
    var uniID = 231851;
    var name = "Federico Magnani";
    var alumnoAddress = "0xD59488d45304b2C7DC593f491F7206073602854B"
    var link = "https://gateway.pinata.cloud/ipfs/QmWvjM5rKeozN7Yy8n3Ckg95VLFxhVWHQeUmYEhvtsRBqg";
    await nfthesis.registerAlumno(uniID,name,alumnoAddress,link);
    // await nfthesis.mint(uniID)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
