// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import 'openzeppelin-solidity/contracts/access/Ownable.sol';

/// @title Masterblock - guess the block code before the blockchain
/// @author Alejandro Fraga
/// @notice This contract was developed for Consensys Academy Final Project

contract Masterblock is Ownable {
    // initialize an array
    uint[] private combination;
    bool private gameStarted = false;
    uint public checkCorrect = 0;
    uint public attempts = 0;

    event LogGameBegin(address _player);
    event LogCheckCorrect(uint _checkCorrectRef);
    event LogAttempts(uint _attempts);    

    // Support functions
    
    /// @notice Set the values to be guessed
    /// @dev Assign the combination passed to the array
    function setValues(uint _rand1, uint _rand2, uint _rand3, uint _rand4) public onlyOwner returns (bool){
        // validating inputs
        require((_rand1 > 0) && (_rand1 <= 4));
        require((_rand2 > 0) && (_rand2 <= 4));
        require((_rand3 > 0) && (_rand3 <= 4));
        require((_rand4 > 0) && (_rand4 <= 4));        
        combination = [_rand1, _rand2, _rand3, _rand4];
        emit LogGameBegin(owner());
        // From this point the game is on
        gameStarted = true;
        return gameStarted;
    }

    /// @notice Get the value at the position requested
    /// @dev Returns the value from the combination array
    function get (uint i) public view returns (uint) {
        return combination[i];
    }
    
    /// @notice Function exposed for the interface to track the number of attempts
    /// @dev Returns the number of attempts
    function getAttempts() public view returns(uint) {
        return attempts;
    }

    /// @notice Function exposed for the interface to provide feedback to user about correct tries
    /// @dev Returns an integer representing the number of correct attempts
    function getCorrect() public view returns(uint) {
        return checkCorrect;
    }   

    /// @notice Function exposed for to check if combination is correct
    /// @dev Returns a bool indicating the status for the combination
    function gotWinner() public view returns(bool) {
        bool _gotWinner = false;
        if (checkCorrect == 4) {
            _gotWinner = true;
        }    
        
        return _gotWinner;        
    }        

    
    // Game operations
    
    /// @notice Check the combination assigned at start vs user attempt using their value and position
    /// @dev Returns true if the number and position is correct   
    function gameMove(uint8 try_a, uint8 try_b, uint8 try_c, uint8 try_d) public {
        uint _checkCorrect = 0;
        // validate each attempt
        if (try_a == get(0)) {
            _checkCorrect += 1;
        }
        if (try_b == get(1)) {
            _checkCorrect += 1;
        } 
        if (try_c == get(2)) {
            _checkCorrect += 1;
        } 
        if (try_d == get(3)) {
            _checkCorrect += 1;
        }
        // updating contract variables
        attempts += 1;
        emit LogAttempts(attempts);
        checkCorrect = _checkCorrect;
        emit LogCheckCorrect(_checkCorrect);
    }

}
