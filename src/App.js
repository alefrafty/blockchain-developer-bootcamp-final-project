import React, { Component } from "react";
import Layout from "./components/layout/Layout";
import Header from "./pages/Header";
import GamePlayForm from "./components/stages/GamePlayForm";
import Randomio from "./components/operations/Randomio";
import Web3 from 'web3';
import Masterblock from "./abis/Masterblock.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component { 

  setCount(value) {
    this.setState({correctCount: value.toString()});
    console.log("Correct Count");
    console.log(this.state.correctCount);
  }

  setAttempts(value) {
    this.setState({attempts: value.toString()});
    console.log("Attempts:");
    console.log(this.state.attempts);
  }  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }  

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.eth.accounts)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.account = accounts[0];
    console.log("Account:");
    console.log(this.account);        
    this.blockchainRef[0] = this.state.account;
    this.blockchainRef[0] = this.account;    
    this.networkId = await web3.eth.net.getId();    
    this.networkData = Masterblock.networks[this.networkId];        
    
    if(this.networkData) {
      this.masterblock = web3.eth.Contract(Masterblock.abi, this.networkData.address);
      this.blockchainRef[1] = this.masterblock;      
      // Generate gameplay combination
      const setGame = this.combination;
      // Set the game
      const gameStarted = await this.masterblock.methods.setValues(setGame[0],setGame[1],setGame[2],setGame[3]).send({ from: this.account, gasPrice: 8000000000, gas: 4700000 });      
      console.log("Game combination is set...");  
    } else {
      window.alert('Masterblock contract not deployed to detected network.')
    }
  }

  async checkCombination(event) {
    // prevents browser default, allowing us to handle the submission with JS    
    event.preventDefault();
    console.log("Number Correct");
    // Get the number correct
    await this.masterblock.methods.getCorrect().call().then((data) => {this.setCount(data)});
    // Update attempts
    await this.masterblock.methods.getAttempts().call().then((data) => {this.setAttempts(data)});    

  }    

  constructor(props) {
    super(props);
    this.state = {
      correctCount: 0,
      attempts: 0
    }
    // Blockchain Vars
    this.account = 0;
    this.networkId = 0;
    this.networkData = 0;
    this.masterblock = 0;
    // the connection to the contract
    this.blockchainRef = []
    // set the combination
    this.combination = this.setGameCombination();
  }


  setGameCombination() {
    let initCombination = [];
    initCombination[0] = Randomio();
    initCombination[1] = Randomio();
    initCombination[2] = Randomio();
    initCombination[3] = Randomio();        
    
    return initCombination;
  }

  // localhost:3000/
  // the path after the domain is the path
  // App focus on rendering the routing
  render() {
    return (
      <div>
        <Layout>
          <Header></Header>
          <Row>
            <Col>
              <p>Number of Attempts: {this.state.attempts} </p>
            </Col>
            <Col>
              <p>Correct Positions: {this.state.correctCount} </p>
            </Col>                                
          </Row>
          <Row>
            <p>Pick your combination of colors. When ready press "Submit" button</p>
          </Row>
          <Row>
            <GamePlayForm chainReference={this.blockchainRef}></GamePlayForm>
          </Row>
          <Row>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg" onClick={this.checkCombination.bind(this)}>
                Check 
              </Button>
            </div>              
          </Row>     
        </Layout>
      </div>
    );
  }
}

export default App;

