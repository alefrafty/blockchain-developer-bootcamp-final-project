import React, { Component } from "react";
//import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Header from "./pages/Header";
import GamePlayForm from "./components/stages/GamePlayForm";
import Randomio from "./components/operations/Randomio";
import Web3 from 'web3';
import Masterblock from "./abis/Masterblock.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component { 

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
    this.setState({ account: accounts[0] });
    console.log("Account:");
    console.log(this.state.account);    
    this.blockchainRef[0] = this.state.account;
    const networkId = await web3.eth.net.getId();
    const networkData = Masterblock.networks[networkId];
    if(networkData) {
      const masterblock = web3.eth.Contract(Masterblock.abi, networkData.address);
      this.blockchainRef[1] = masterblock;
      this.setState({masterblock});
      // Generate gameplay combination
      const setGame = this.combination;
      console.log("setGame:");
      console.log(setGame);
      // Set the game
      const gameStarted = await this.state.masterblock.methods.setValues(setGame[0],setGame[1],setGame[2],setGame[3]).send({ from: this.state.account, gasPrice: 8000000000, gas: 4700000 });
      console.log("gameStarted:");
      console.log(gameStarted);

//      const attempts = await this.state.masterblock.methods.getAttempts().call({ from: this.state.account, gasPrice: 8000000000, gas: 4700000 });
//      console.log("attempts:");
//      console.log(attempts);      
    } else {
      window.alert('Masterblock contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
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
            <GamePlayForm chainReference={this.blockchainRef}></GamePlayForm>
          </Row>     
        </Layout>
      </div>
    );
  }
}

export default App;

