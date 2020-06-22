import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "./navbar.css";

function navigationBar(params) {
  function dropDownHandler(params) {
    let activo = document.querySelector(".nav-link.white.active");
    if (activo != null) {
      activo.classList.remove("active");
    }
  }

  return (
    <Navbar id="navigationBar" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="floatLeft" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" className="white">
            Home
          </Nav.Link>
          <Nav.Link href="#link" className="white">
            Link
          </Nav.Link>
          <NavDropdown
            title="Dropdown"
            id="basic-nav-dropdown"
            onClick={dropDownHandler}
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default navigationBar;
