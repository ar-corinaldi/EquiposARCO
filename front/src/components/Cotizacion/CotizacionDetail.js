import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cotizacion.css";
import { useParams, Link } from "react-router-dom";
import EquiposTable from "./EquiposTable";

function CotizacionDetail(props) {
  const { id, idC } = useParams();

  const [cotizacion, setCotizacion] = useState({});
  const [tercero, setTercero] = useState({});
  const [orden, setOrden] = useState({});

  useEffect(() => {
    fetchInfo();
  }, []);

  /*
   * Obtener el tercero, la bodega y la cotizacion
   */
  const fetchInfo = async () => {
    let res = await fetch("/terceros/" + id);
    const terceroA = await res.json();
    //console.log("tercero", terceroA);
    setTercero(terceroA);
    fetchInfoCotizacion();
  };

  /*
   * Obtener la cotizacion con las tarifas pobladas
   */

  const fetchInfoCotizacion = async () => {
    //console.log("llegaCotizaciones");
    let res = await fetch(`/cotizaciones/${idC}/tarifasPobladas`);
    const coti = await res.json();
    //console.log("cotizacion", coti);
    setCotizacion(coti);
    fetchInfoOrden(coti);
  };

  const fetchInfoOrden = async (coti) => {
    //console.log(`/ordenes/${coti.orden}`);
    let res = await fetch(`/ordenes/${coti.orden}`);
    const ord = await res.json();
    //console.log("cotizacion", coti);
    setOrden(ord);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">
              Cotizacion No. {cotizacion._id}
            </h3>
            <Row>
              <Col>
                <p className="capitalize">
                  <b>Tercero : </b>
                  <Link to={`terceros/${tercero._id}`}>{tercero.nombre}</Link>
                </p>
              </Col>
              <Col>
                <p>
                  <b>Orden :</b>{" "}
                  <Link
                    to={`/terceros/${id}/bodegas/${orden.bodega}/ordenes/${cotizacion.orden}`}
                  >
                    {cotizacion.orden}{" "}
                  </Link>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="orden-wrapper" id="orden-equipos-wrapper">
            <h4 className="page-title-orden">Equipos</h4>
            <EquiposTable tarifas={cotizacion.tarifasCotizadas}></EquiposTable>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CotizacionDetail;
