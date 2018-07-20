 const assert = require('assert');
 const ganache = require('ganache-cli');
 const Web3 = require('Web3');
 //const web3 =new Web3(ganache.provider());

 //New changes
 const provider = ganache.provider();
 const web3 = new Web3(provider);

 const {interface , bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach( async ()=>{
  accounts = await web3.eth.getAccounts();
// here we are deploying our code to ganache network
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data :bytecode, arguments :['Hi there'] })
  .send({from: accounts[0], gas: '1000000'})

  // ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
  inbox.setProvider(provider);
 });

describe('Inbox', ()=>{
  //to check address assigned
                  it('deployss a contract', ()=>{
                  assert.ok(inbox.options.address);
                  });
//to verify message field
                it('message', async () =>{
                    const message = await inbox.methods.message().call();
                    assert.equal(message,'Hi there!');
                });
// to verify setMessage function
              it('change message', async () =>{
                inbox.methods.setMessage('bye').send({from:accounts[0]});
                  const message = await inbox.methods.message().call();
                  assert.equal(message,'Hi there!');
                });
});
