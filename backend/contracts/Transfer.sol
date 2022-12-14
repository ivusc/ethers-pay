// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transfer {

    event TransferEvent(address indexed payer, address indexed payee, uint256 amount, string message, uint256 datetime);

    struct Transaction {
        address payable payer;
        address payable payee;
        uint256 amount;
        string message;
        uint256 datetime;
    }

    mapping(uint256 => Transaction) transactions;

    uint256 private totalTransactions = 0;

    function transferEthers (address _payee, string memory _message) public payable {
        require(_payee != msg.sender, 'You cannot transfer ethereum to yourself.');
        
        Transaction storage transfer = transactions[totalTransactions];
        transfer.payer = payable(msg.sender);
        transfer.payee = payable(_payee);
        transfer.amount = msg.value;
        transfer.message = _message;
        transfer.datetime = block.timestamp;

        payable(_payee).transfer(msg.value);
        totalTransactions++;
        emit TransferEvent(msg.sender, _payee, msg.value, _message, block.timestamp);
    }

    function getTransactions () public view returns (Transaction[] memory){
        Transaction[] memory allTransactions = new Transaction[](totalTransactions);

        for (uint i = 0; i < totalTransactions; i++){
            Transaction storage transfer = transactions[i];
            allTransactions[i] = transfer;
        }
        
        return allTransactions;
    }

    function getTransactionCount () public view returns (uint256) {
        return totalTransactions;
    }
}