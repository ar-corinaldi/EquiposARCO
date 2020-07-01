import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import { useLocation, Link } from "react-router-dom";

function BreadcrumbComponent(props) {
  const location = useLocation();
  let partes = location.pathname.split(new RegExp("/"));
  let prevParte = "";
  partes = partes.map((parte, index) => {
    const obj = {
      ruta: parte === "" && index === 0 ? "Equipos Arco" : parte,
      pathname: parte === "" ? "" : `${prevParte}/${parte}`,
    };
    prevParte = obj.pathname;
    return obj;
  });
  return (
    <React.Fragment>
      <Col>
        <h4 className="page-title">{partes && partes[1].ruta}</h4>
      </Col>
      <Col>
        <Breadcrumb>
          {partes.length > 0 &&
            partes.map((parte) => (
              <li key={parte.pathname} className="breadcrumb-item">
                <Link to={`${parte.pathname}`}>{parte.ruta}</Link>
              </li>
            ))}
        </Breadcrumb>
      </Col>
    </React.Fragment>
  );
}

export default BreadcrumbComponent;
