pragma solidity ^0.4.19;

import "/home/osboxes/Develop/vultron/contracts/ACFToken.sol";

contract Attack_ACFToken0 {

  ACFToken public target_contract;

  function Attack_ACFToken0(address _targetContract) public payable {
      target_contract = ACFToken(_targetContract);
  } 

  function vultron_approve(address _spender, uint256 _value) public {
    target_contract.approve(_spender, _value);
  } 

  function vultron_transferFrom(address _from, address _to, uint256 _value) public {
    target_contract.transferFrom(_from, _to, _value);
  } 

  function vultron_transfer(address _to, uint256 _value) public {
    target_contract.transfer(_to, _value);
  } 

  function() public payable {
    target_contract.approve(this,  10000);
  }
} 