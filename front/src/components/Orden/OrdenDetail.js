import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Orden.css";

import { useParams } from "react-router-dom";

function OrdenDetail(props) {
  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [statusOr, setStatus] = useState("");
  const [tercero, setTercero] = useState({});
  const [bodega, setBodega] = useState({});

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    let res = await fetch("/terceros/" + id);
    const terceroA = await res.json();
    console.log("tercero", terceroA);
    setTercero(terceroA);
    let bodegaA;
    terceroA.bodegas.forEach((bod) => {
      if (bod._id.toString() === idB) {
        bodegaA = bod;
      }
    });
    console.log("bodega", bodegaA);
    setBodega(bodegaA);
    let ordenA;
    bodegaA.ordenesActuales.forEach((or) => {
      if (or._id.toString() === idOr) {
        ordenA = or;
        setStatus("En curso");
        return;
      }
    });
    if (!ordenA) {
      bodegaA.ordenesPasadas.forEach((or) => {
        if (or._id.toString() === idOr) {
          ordenA = or;
          setStatus("Terminada");
          return;
        }
      });
    }
    console.log("orden", ordenA);
    console.log("status", statusOr);
    setOrden(ordenA);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">Orden No. {idOr}</h3>
            <p>Tercero : {tercero.nombre} </p>
            <p>Bodega : {bodega.nombreBodega}</p>
            <p>Status : {statusOr} </p>
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
