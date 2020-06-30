import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, Link } from "react-router-dom";

function BreadcrumbComponent(props) {
  const location = useLocation();
  let partes = location.pathname.split(new RegExp("/"));
  let prevParte = "";
  partes = partes.map((parte) => ({
    ruta: parte === "" ? "Equipos Arco" : parte,
    url: `${prevParte}/${parte}`,
  }));
  return (
    <Breadcrumb>
      {partes.length > 0 &&
        partes.map((parte) => (
          <li key={parte.url} className="breadcrumb-item">
            <Link to={parte.url}>{parte.ruta}</Link>
          </li>
        ))}
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
