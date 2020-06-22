import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import "./prueba.css";
import NavigationBar from "./navbar";
import SideBar from "./side_bar/sideBar";
import Prueba from "./prueba";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
console.log("hooooh");

function App() {
  return (
    <div id="contenido">
      <Row>
        <Col className="pr-0" sm={2}>
          <SideBar />
        </Col>

        <Col className="m-0 p-0">
          <NavigationBar />
          <p>Holaaaa, Contenidoooo</p>
        </Col>
      </Row>
    </div>
  );
}
export default App;
