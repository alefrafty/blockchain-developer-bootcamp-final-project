import React from "react";
import logo from "../images/masterblock_200.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {

  return (
    <div>
      <Row>
          <Col>
            <img src={logo} alt="MasterBlock Logo" />
          </Col>
          <Col>
            <Row>
              <h1>Masterblock</h1>
              <p>Solve the secret code on the next block </p> 
            </Row>
           </Col>
      </Row>
    </div>            
  );
}
export default Header;