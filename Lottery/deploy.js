const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface , bytecode} = require('./compile');// here we use only one dot as in same directory with compile.js

const provider = new HDWalletProvider(
'blade develop disease hospital first kangaroo brown march market record corn engine',
'https://rinkeby.infura.io/v3/19f06dc35ffd41b7a57477f27a85f06f'


);

const web3 = new Web3(provider);

const deploy = async ()=>{

  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x'+ bytecode})
    .send({from: accounts[0]}); // remove 'gas'


 console.log('Contract deployed to ', result.options.address);
};

deploy();
