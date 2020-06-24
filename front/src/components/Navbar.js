import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import logo from "../static-files/logo-letras.png";
import { Link } from "react-router-dom";

function NavBar(params) {
  //Este arreglo tiene las opciones del menú y la url a la que va cuando se seleccionan
  const opciones_menu = [
    {
      nombre: "Inventario",
      ref: "/equipos",
    },
    {
      nombre: "Clientes",
      ref: "/equipos",
    },
    {
      nombre: "Facturación",
      ref: "/equipos",
    },
    {
      nombre: "Cartera",
      ref: "/equipos",
    },
    {
      nombre: "Contabilidad",
      ref: "/equipos",
    },
  ];

  return (
    <div>
      <Navbar bg="light" expand="md" sticky="top" id="navbar">
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <img
              src={logo}
              width="100%"
              height="auto"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-menu" activeKey="/home">
            {opciones_menu.map((menu_item) => (
              <Nav.Item>
                <Link to={menu_item.ref} className="nav-link">
                  {menu_item.nombre}
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
