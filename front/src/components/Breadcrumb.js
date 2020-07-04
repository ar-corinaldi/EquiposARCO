import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import { useLocation, Link } from "react-router-dom";
import "./Breadcrumb.css";

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
      <Col className="page-title-col " >
        <div className="breadcrumbTitle">
          <h3 className="page-title">{partes && partes[1].ruta}</h3>
        </div>
      </Col>
      <Col md={6} xs={8}>
        <Breadcrumb className="breadcrumb">
          {partes.length > 0 &&
            partes.map((parte) => (
              <li key={parte.pathname} className="breadcrumb-item">
                <Link className="breadcrumbLink" to={`${parte.pathname}`}>
                  {parte.ruta}
                </Link>
              </li>
            ))}
        </Breadcrumb>
      </Col>
    </React.Fragment>
  );
}

export default BreadcrumbComponent;
