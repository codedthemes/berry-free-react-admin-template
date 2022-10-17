const Web3 = require('web3');
const fs = require('fs');

// Loading the contract ABI
const ABI = JSON.parse(fs.readFileSync('TransportRegister.json'))['abi'];

// Constants using in connection
const INFURA_API_KEY = 'https://goerli.infura.io/v3/91ffb138f72746df9638af491caf6c82';
const CONTRACT_ADDRESS = '0x8fe218a1B267880Ce20229b9bf8452C630F9A2c7';
const ACCOUNT_PRIVATE_KEY = '3707030909a565b20dea7deaf76b9d6ab60d562f50059dd5157603ee673e6bbe';

const DATA_PACKAGE = {
    description: 'iPhone 12 128GB Branco',
    deliveryAddress: {
        name: 'Av Comendador Jose Cruz',
        district: 'Lago Azul',
        city: 'Manaus',
        state: 'AM',
        number: '123'
    }
};

// Network
const NETWORK = 'goerli';

async function listPackages(contract) {
    await contract.methods.listMySentPackages().call(function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("The balance is: ", res)
      })
}

async function main() {
    // Configuring the connection to an Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_API_KEY));

    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(ACCOUNT_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(signer);

    // Creating a Contract instance
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    listPackages(contract);

    // Issuing a transaction that calls the `echo` method
    // const tx = contract.methods.listMySentPackages();
    // const estimateGas = 1000000;
    // console.log('Gas estimate: ' + estimateGas);
    // const receipt = await tx
    //     .send({
    //         from: signer.address,
    //         gas: estimateGas
    //     })
    //     .once('transactionHash', (txhash) => {
    //         console.log(`Mining transaction ...`);
    //         console.log(`https://${NETWORK}.etherscan.io/tx/${txhash}`);
    //     });

    // The transaction is now on chain!
    // console.log(`Mined in block ${receipt.blockNumber}`);
}

// require("dotenv").config();
main();
