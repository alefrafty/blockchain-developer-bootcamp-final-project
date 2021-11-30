function Randomio() {
    const MAX_VAL = 4
    let randVal = Math.floor(Math.random() * MAX_VAL);
    if (randVal === 0) {
    randVal += 1;
    }
    return randVal;
  }
  
  export default Randomio;