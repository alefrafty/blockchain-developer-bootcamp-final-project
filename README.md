# blockchain-developer-bootcamp-final-project

# Project Name: MasterBlock

# Goal
Develop a game on the blockchain

The purpose of the game is to solve the secret code from the oponent in the fewer number of attempts.
The player will compete against the ethereum virtual machine using a web interface

# Use Cases
- A player starts the game. When the player starts the game the contract will generate a random array with the combination to beat 
- A player enters a 4 color combination into the interface. Once finish press 'Submit' button.
- After submitting the combination, the player input will be compared with the contract combination generated randomly when game started.
- After solving the combination, the user will be declared winner and the number of attempts will be displayed
- The player give up and end the game before guessing the combination

# Pseudocode 
- Player starts the game. 
1. To start the game, a name should be provided
2. User press start button. This will trigger the smart contract constructor generating the random combination

- Player attempts combination
Pre-requisite: Game is in progress
1. The player selects from the drop down options on the interface
2. Player press "Submit". When player submits it's combination it should call checkCombination function on the contract 
- If the combination is not valid, the user get a response from the contract that the combination was invalid and a attempt counter will be incremented
- If the combination is valid, then the user will be declared winner with the number of attempts.
 
- Player gives up
Pre-requisite: Game is in progress
1. If Player press Give Up button, the game will end. The interface should call revealCombination function so the value generated on the contract is displayed on the interface

Installation instructions:
The project uses React framework. All the required packages are described under package.json file.
The contract is located under /src/contract directory
The test are located under /test and can be executed in truffle using "truffle test" command.
It was deployed on Rinkeby network.


Link to Video with screencast: https://youtu.be/UHCpqJR6UHw

Link to the application online: https://masterblock.pages.dev