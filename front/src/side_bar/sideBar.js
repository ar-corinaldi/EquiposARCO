import React from "react";
import Button from "react-bootstrap/Button";
import "./sideBar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function SideBar(params) {
  function changeSideBarVisibility(params) {
    console.log("entró");

    let side_bar = document.getElementById("sidebar");
    let bar_button = document.getElementById("side-bar-button");
    if (side_bar != null && bar_button != null) {
      side_bar.classList.remove("hidden");
      side_bar.classList.add("visible");
      bar_button.classList.remove("visible");
      bar_button.classList.add("hidden");
    }
  }

  return (
    <Nav defaultActiveKey="/home" className="sidebar flex-column">
      <Navbar.Brand
        href="#home"
        className="white d-flex justify-content-center"
      >
        Logo
      </Navbar.Brand>
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
}

export default SideBar;
