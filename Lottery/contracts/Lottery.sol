pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;

    constructor () public{

        manager = msg.sender; // address of the account that started fun invocation
    }

    function enter() public payable{
        require(msg.value > .01 ether);//some condition should be satisfied before
        //allowing rest of the function to be executed

        players.push(msg.sender);
    }

    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public{


         uint index = random() % players.length;

         players[index].transfer(this.balance);
         players = new address[](0);// resetting the address to 0

    }

    modifier restrict() {// we can give any name to the function
        require(msg.sender == manager);
        _;

    }

    function returnPlayer() public view returns(address[]){
        return players;

    }
}
