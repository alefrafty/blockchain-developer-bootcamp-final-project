The Masterblock.sol contract leverage the following design patterns:
- Restricted access: By using the modifiyer 'onlyPlayer' I enforce that the player of the game should use
  this contract

- Ownable: To make sure the player is the owner of the contract granting access to the game play methods,
 I used the Ownable Access Control pattern from OpenZeppelin. This also helps the project the requirement to inherit
 from at least one library

References:
https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

- 