import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cotizacion.css";
import { useParams, Link } from "react-router-dom";
import EquiposTable from "./EquiposTable";

function CotizacionDetail(props) {
  const { id, idB, idC } = useParams();

  const [cotizacion, setCotizacion] = useState({});
  const [tercero, setTercero] = useState({});
  const [bodega, setBodega] = useState({});

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
    let bodegaA;
    terceroA.bodegas.forEach((bod) => {
      if (bod._id.toString() === idB) {
        bodegaA = bod;
      }
    });
    //console.log("bodega", bodegaA);
    setBodega(bodegaA);
    bodegaA.cotizaciones.forEach((co) => {
      if (co._id.toString() === idC) {
        fetchInfoCotizacion();
        return;
      }
    });
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
                <p className="capitalize">
                  <b>Bodega : </b> {bodega.nombreBodega}
                </p>
              </Col>
              <Col>
                <p>
                  <b>Orden :</b>{" "}
                  <Link
                    to={`/terceros/${id}/bodegas/${idB}/ordenes/${cotizacion.orden}`}
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
