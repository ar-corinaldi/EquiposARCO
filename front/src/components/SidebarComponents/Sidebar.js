import React from "react";
import "./Sidebar.css";
import SidebarDetail from "./SidebarDetail";
import { useLocation } from "react-router-dom";

function Sidebar(props) {
  let location = useLocation();
  console.log(location.pathname);
  //Header, Title, link, menu
  const menu_equipos = [
    {
      type: "Header",
      name: "Inventario",
    },
    {
      type: "Title",
      name: "Equipos",
    },
    {
      type: "Link",
      name: "Listar todos los equipos",
      ref: "/equipos",
    },
  ];

  const home_menu = [

  ]

  const menus_disponibles = {
    "/equipos": menu_equipos,
    "/": home_menu,
  };

  return (
    <div className="wraper">
      <nav id="sidebar" className="visible">
          <SidebarDetail menu={menus_disponibles[location.pathname]} />
      </nav>
    </div>
  );
}

export default Sidebar;
