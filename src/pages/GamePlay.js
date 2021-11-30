//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Header"
import GamePlayForm from "../components/stages/GamePlayForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function GamePlayPage() {
  //  const navigate = useNavigate();

  function playGameHandler(gameData) {
    // Add here web3 info to submit responses
    console.log(gameData);
    // If combination is solved or user press give up
    //    navigate("/play");
  }

  return (
    <div>
      <Header></Header>
      <Row>
        <Col>
        <p>Number of Attempts:</p>
        </Col>
        <Col>
          <p>Correct Positions:</p>
        </Col>                                
      </Row>
      <Row>
        <p>Pick your combination of colors. When ready press "Submit" button</p>
      </Row>
      <Row>
        <GamePlayForm />
      </Row>
    </div>            
  );
}
export default GamePlayPage;
