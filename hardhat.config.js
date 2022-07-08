// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.4",
// };


require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// const network = "rinkeby"; //rinkeby, ropsten, goerli, ..., mainnet
const API_KEY = "3a43063e4da54770840d932487936a77";
const PRIVATE_KEY = fs.readFileSync(".secret").toString().trim(); //mnemonic phrase o chiave privata ;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.8.1"
      }
    ]
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};