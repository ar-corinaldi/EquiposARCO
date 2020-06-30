import React from "react";
import "./SidebarDetail.css";
import { Link } from "react-router-dom";

function SidebarDetail(props) {
  const menu = props.menu;
  const url = props.baseUrl;

  return (
    <ul className="components">
      {menu &&
        menu.map((item, index) => {
          if (item.type === "Header") {
            return Header(item, index);
          } else if (item.type === "Title") {
            return Title(item, index);
          } else if (item.type === "Link") {
            return Url(item, index, url);
          } else if (item.type === "Menu") {
            return Menu(item, index);
          }
        })}
    </ul>
  );
}

//TODO: Estilizarlo más
function Header(params, index) {
  const header = params.name;
  return (
    <div className="sidebar-header" key={index}>
      <h3>{header}</h3>
    </div>
  );
}

function Title(params, index) {
  const title = params.name;
  return (
    <li className="sidebar-title" key={index}>
      <h5>{title}</h5>
    </li>
  );
}

function Url(item, index, url) {
  return (
    <li className="sidebar-link-container" key={index}>
      <Link to={url + item.ref} className="sidebar-link">
        {item.name}
      </Link>
    </li>
  );
}
//TODO: Todo. Ojo que esto es menu dropdown.
function Menu(params) {}

export default SidebarDetail;
