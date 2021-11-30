//import { useState, useEffect } from "react";
import React from "react";
import GameBeginsForm from "../components/stages/GameBeginsForm";
import Header from "./Header"
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

function GameStartPage() {
  
  return (
    <div>
      <Header></Header>
      <Row>
        <h2>Instructions</h2>
        <p>Pick a user name and start your game. To win you will need to pick the right color on the right position. The player with less attempts wins!</p>        
      </Row>
      <Row>
        <GameBeginsForm />
      </Row>
    </div> 
  );
}

export default GameStartPage;
