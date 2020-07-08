import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Orden.css";
import { useParams, Link } from "react-router-dom";
import EquiposTable from "./EquiposTable";

function OrdenDetail(props) {
  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [statusOr, setStatus] = useState("");
  const [tercero, setTercero] = useState({});
  const [bodega, setBodega] = useState({});

  useEffect(() => {
    fetchInfo();
  }, []);

  /*
   * Obtener el tercero, la bodega y la orden
   */
  const fetchInfo = async () => {
    let res = await fetch("/terceros/" + id);
    const terceroA = await res.json();
    //console.log("tercero", terceroA);
    setTercero(terceroA);

    // res = await fetch("/bodegas/" + idB);
    // const bodegaA = await res.json();
    // console.log("bodega", bodegaA);
    // setBodega(bodegaA);
    // res = await fetch("/ordenes/" + idOr);
    // const ordenA = await res.json();
    // console.log("orden", ordenA);
    // setOrden(ordenA);

    let bodegaA;
    terceroA.bodegas.forEach((bod) => {
      if (bod._id.toString() === idB) {
        bodegaA = bod;
      }
    });
    //console.log("bodega", bodegaA);
    setBodega(bodegaA);
    let ordenA;
    bodegaA.ordenesActuales.forEach((or) => {
      if (or._id.toString() === idOr) {
        fetchInfoOrden();
        setStatus("En curso");
        return;
      }
    });
    if (!ordenA) {
      bodegaA.ordenesPasadas.forEach((or) => {
        if (or._id.toString() === idOr) {
          fetchInfoOrden();
          setStatus("Terminada");
          return;
        }
      });
    }
    // console.log("orden", ordenA);
    // console.log("status", statusOr);
    // setOrden(ordenA);
  };

  /*
   * Obtener la orden con las tarifas pobladas
   */

  const fetchInfoOrden = async () => {
    console.log("llegaOrdenes");
    let res = await fetch(`/ordenes/${idOr}/tarifasPobladas`);
    const ordenA = await res.json();
    //console.log("orden", ordenA);
    setOrden(ordenA);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">Orden No. {orden._id}</h3>
            <Row>
              <Col>
                <p className="capitalize">
                  <b>Tercero : </b>
                  <Link to={`terceros/${tercero._id}`}>{tercero.nombre}</Link>
                </p>
                <p className="capitalize">
                  <b>Bodega : </b> {bodega.nombreBodega}
                </p>
              </Col>
              <Col>
                <p>
                  <b>Status :</b> {statusOr}{" "}
                </p>
                <p>
                  <b>Cotizacion :</b>{" "}
                  <Link
                    to={`/terceros/${id}/bodegas/${idB}/cotizaciones/${orden.cotizacion}`}
                  >
                    {orden.cotizacion}{" "}
                  </Link>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div className="orden-wrapper" id="orden-equipos-wrapper">
            <h4 className="page-title-orden">Equipos</h4>
            <EquiposTable tarifas={orden.tarifasDefinitivas}></EquiposTable>
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
