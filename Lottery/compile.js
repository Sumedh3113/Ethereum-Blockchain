const path = require('path');
const fs = require('fs');

const solc = require('solc');// solc stands for solidity compiler

const LotteryPath =path.resolve(__dirname,'contracts','Lottery.sol');

const source = fs.readFileSync(LotteryPath,'utf8');// version utf8 will be same

module.exports = solc.compile(source,1).contracts[':Lottery'];
