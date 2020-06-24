import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import logo from "../static-files/logo-letras.png";

function NavBar(params) {
  return (
    <div>
      <Navbar bg="light" expand="md" sticky="top" id="navbar">
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="100%"
            height="auto"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-menu" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/equipo">Invertario</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Clientes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Facturacion</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Cartera</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>Contabilidad</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
