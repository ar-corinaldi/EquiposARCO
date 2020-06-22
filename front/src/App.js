import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
  return (
      <div id="contenido">
        <Navbar></Navbar>
        <Row>
          <Col md={2} id="sidebar-column">
            <Sidebar />
          </Col>
          <Col id="content-column"><p>Acá va el contenido</p>
          </Col>
        </Row>  
      </div>
  );
}

export default App;
