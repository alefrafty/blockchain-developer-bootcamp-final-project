import React from "react";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';


function GamePlayForm(props) {

  const pos1InputRef = useRef();
  const pos2InputRef = useRef();
  const pos3InputRef = useRef();
  const pos4InputRef = useRef();

  async function submitCombination(event) {
    // prevents browser default, allowing us to handle the submission with JS
    event.preventDefault();
    
    console.log("Working with address");
    console.log(props.chainReference[0])
    // Read input values referenced from the form
    const enteredPos1 = parseInt(pos1InputRef.current.value,10);
    const enteredPos2 = parseInt(pos2InputRef.current.value,10);
    const enteredPos3 = parseInt(pos3InputRef.current.value,10);
    const enteredPos4 = parseInt(pos4InputRef.current.value,10);

    const gameData = [enteredPos1,enteredPos2,enteredPos3,enteredPos4];
    console.log(gameData);
    const doGameMove = await props.chainReference[1].methods.gameMove(gameData[0],gameData[1],gameData[2],gameData[3]).send({ from: props.chainReference[0], gasPrice: 8000000000, gas: 4700000 });
  }

  async function checkCombination(event) {
    // prevents browser default, allowing us to handle the submission with JS    
    event.preventDefault();
    console.log("Check Button clicked!");
    const correctCount = await props.chainReference[1].methods.getCorrect().call({ from: props.chainReference[0]});    
    console.log("Number Correct");
    console.log(correctCount);
  }  

  return (
    <div>
      <form>
        <Row>
          <Col>
            <span><label>Position 1</label></span>
            <select required id="pos1" name="pos1" ref={pos1InputRef}>
              <option value="x" default></option>
              <option value="1">Blue</option>
              <option value="2">Green</option>
              <option value="3">Red</option>
              <option value="4">Yellow</option>
            </select>
          </Col>
          <Col s={{ order: 12 }}>
            <label>Position 2</label>
            <select required id="pos2" name="pos2" ref={pos2InputRef}>
              <option value="x" default></option>
              <option value="1">Blue</option>
              <option value="2">Green</option>
              <option value="3">Red</option>
              <option value="4">Yellow</option>
            </select>     
          </Col>
          <Col s={{ order: 1 }}>
            <label>Position 3</label>
            <select required id="pos3" name="pos3" ref={pos3InputRef}>
              <option value="x" default></option>
              <option value="1">Blue</option>
              <option value="2">Green</option>
              <option value="3">Red</option>
              <option value="4">Yellow</option>
            </select>
          </Col>
          <Col s={{ order: 1 }}>
            <label>Position 4</label>
            <select required id="pos4" name="pos4" ref={pos4InputRef}>
              <option value="x" default></option>
              <option value="1">Blue</option>
              <option value="2">Green</option>
              <option value="3">Red</option>
              <option value="4">Yellow</option>
            </select>
          </Col>    
        </Row>

        <Row>
          <Col>
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={submitCombination}> 
                Submit
              </Button>
            </div>        
          </Col>
          <Col>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg" onClick={checkCombination}>
                Check 
              </Button>
            </div>  
          </Col>
        </Row>
      </form>  
    </div>
  );
}

export default GamePlayForm;
