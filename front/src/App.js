import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Container
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Equipo from "./components/Equipo";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="contenido">
        <Navbar></Navbar>
        <Row id="rowWrapper">
          <Col md={3} lg={2} id="sidebar-column" className="d-none d-md-block">
            <Sidebar />
          </Col>
          <Col id="content-column">
            <Route path="/" exact />
            <Route path="/equipos" component={()=> <Equipo />} />
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
