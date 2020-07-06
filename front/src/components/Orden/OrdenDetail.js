import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Orden.css";

import { useParams } from "react-router-dom";

function OrdenDetail(props) {
  const { id, idB, idOr } = useParams();

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">Orden No. {idOr}</h3>
            <p>Tercero : {id} </p>
            <p>Bodega : {idB}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div className="orden-wrapper" id="orden-equipos-wrapper">
            <h4 className="page-title-orden">Equipos</h4>
          </div>
        </Col>
        <Col>
          <Row>
            <div className="orden-wrapper" id="orden-actividad-wrapper">
              <h4 className="page-title-orden">Actividad reciente</h4>
            </div>
          </Row>
          <Row>
            <div className="orden-wrapper" id="orden-actividad-wrapper">
              <h4 className="page-title-orden">Cartera</h4>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default OrdenDetail;
