const { catchRevert } = require("./exceptionsHelpers.js");
const Masterblock = artifacts.require("./Masterblock");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Masterblock", function (accounts) {
  const [player] = accounts;
  let catchRevert = require("./exceptions.js").catchRevert;

  beforeEach(async () => {
    instance = await Masterblock.new();
  });

  it("let's check player has enough funds!", async() => {
    const eth0 = 0;
    assert.notEqual(await web3.eth.getBalance(player), eth0.toString());
  });

  it("is owned by player", async () => {
    assert.equal(
      // Hint:
      //   the error `TypeError: Cannot read property 'call' of undefined`
      //   will be fixed by setting the correct visibility specifier. See
      //   the following two links
      //   1: https://docs.soliditylang.org/en/v0.8.5/cheatsheet.html?highlight=visibility#function-visibility-specifiers
      //   2: https://docs.soliditylang.org/en/v0.8.5/contracts.html#getter-functions
      await instance.owner.call(),
      player,
      "owner is not correct",
    );
  });

  it("should accept 4 numbers between 1-4 for combination", async () => {
    let randParam1 = 1;
    let randParam2 = 2;
    let randParam3 = 3;
    let randParam4 = 4;

    const setGame = await instance.setValues.call(randParam1, randParam2, randParam3, randParam4, { from: player });
    assert.equal(
      setGame,
      true,
      "parameters provided are incorrect must be a number between 1-4",
    );
  });

  it("should fail if any of the 4 numbers is higher than 4", async () => {
    let randParam1 = 8;
    let randParam2 = 2;
    let randParam3 = 3;
    let randParam4 = 4;

    await catchRevert(instance.setValues.call(randParam1, randParam2, randParam3, randParam4, { from: player }));
  });

  it("should inform player that the combination used is not correct", async () => {
    let setParam1 = 1;
    let setParam2 = 2;
    let setParam3 = 3;
    let setParam4 = 4;
    let entryParam1 = 1;
    let entryParam2 = 1;
    let entryParam3 = 2;
    let entryParam4 = 4;    

    await instance.owner({ from: player });
    await instance.setValues(setParam1, setParam2, setParam3, setParam4, {from: player })
    await instance.gameMove(entryParam1, entryParam2, entryParam3, entryParam4, {from: player })
    const gotWinner = await instance.gotWinner({from: player })
    assert.equal(
      gotWinner,
      false,
      "the game result do not match the expected outcome",
    );
  });    
 
  it("should confirm winner if the number and their position is correct", async () => {
    let entryParam1 = 1;
    let entryParam2 = 2;
    let entryParam3 = 3;
    let entryParam4 = 4;

    await instance.owner({ from: player });
    await instance.setValues(entryParam1, entryParam2, entryParam3, entryParam4, {from: player })
    await instance.gameMove(entryParam1, entryParam2, entryParam3, entryParam4, {from: player })
    const gotWinner = await instance.gotWinner({from: player })
    assert.equal(
      gotWinner,
      true,
      "the game result do not match the expected outcome",
    );
  });

  it("should return the number of attempts", async () => {
    let entryParam1 = 1;
    let entryParam2 = 2;
    let entryParam3 = 3;
    let entryParam4 = 4;

    await instance.owner({ from: player });
    await instance.setValues(entryParam1, entryParam2, entryParam3, entryParam4, {from: player})
    await instance.gameMove(entryParam1, entryParam2, entryParam3, entryParam4, {from: player})

    const getAttempts = await instance.getAttempts.call({ from: player });
    assert.equal(
      getAttempts,
      1,
      "the number of attempts do not match expected value",
    );
  });  

  it("should return the number of correct positions on every attempt", async () => {
    let setParam1 = 1;
    let setParam2 = 2;
    let setParam3 = 3;
    let setParam4 = 4;
    let entryParam1 = 1;
    let entryParam2 = 1;
    let entryParam3 = 2;
    let entryParam4 = 4;    

    await instance.owner({ from: player });
    await instance.setValues(setParam1, setParam2, setParam3, setParam4, {from: player})
    await instance.gameMove(entryParam1, entryParam2, entryParam3, entryParam4, {from: player})

    const getAttempts = await instance.getCorrect.call({ from: player });
    assert.equal(
      getAttempts,
      2,
      "the number of attempts do not match expected value",
    );
  });   


  
});
