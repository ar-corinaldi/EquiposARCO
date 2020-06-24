import React from "react";
import "./Sidebar.css";
import SidebarDetail from "./SidebarDetail";
import { useLocation } from "react-router-dom";

function Sidebar(props) {
  const completePath = useLocation();
  const location = "/" + completePath.pathname.split("/")[1];
  console.log(completePath.pathname.split("/")[1]);
  console.log(location);
  
  //Header, Title, link, menu
  const menu_equipos = [
    {
      type: "Header",
      name: "Inventario",
    },
    {
      type: "Title",
      name: "Opciones",
    },
    {
      type: "Link",
      name: "Listar todos los equipos",
      ref: "/equipos",
    },
    {
      type: "Link",
      name: "Listar todos los equipos x2",
      ref: "/equipos",
    },
  ];

  const home_menu = [

  ]

  const menus_disponibles = {
    "/inventario": menu_equipos,
    "/": home_menu,
  };

  return (
    <div className="wraper">
      <nav id="sidebar" className="visible">
          <SidebarDetail menu={menus_disponibles[location]} baseUrl={location} />
      </nav>
    </div>
  );
}

export default Sidebar;
