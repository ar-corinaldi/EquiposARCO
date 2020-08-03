import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cotizacion.css";
import { useParams, Link } from "react-router-dom";
import EquiposTable from "./EquiposTable";
import useFetchAPI from "../../hooks/useFetchAPI";

function CotizacionDetail(props) {
  const { id, idC } = useParams();

  //const [cotizacion, setCotizacion] = useState({});
  //const [tercero, setTercero] = useState({});
  const [orden, setOrden] = useState({});

  const terceroAPI = useFetchAPI(`/terceros/${id}`, []);
  const tercero = terceroAPI.resource;

  const cotizacionAPI = useFetchAPI(`/cotizaciones/${idC}/tarifasPobladas`, []);
  const cotizacion = cotizacionAPI.resource;

  useEffect(() => {
    fetchOrden();
  }, [cotizacion]);

  const fetchOrden = async () => {
    let res = await fetch(`/ordenes/${cotizacion.orden}`);
    const ord = await res.json();
    //console.log("cotizacion", coti);
    setOrden(ord);
  };

  if (terceroAPI.loading || cotizacionAPI.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!tercero) {
    return terceroAPI.notFound("No se encontro tercero con este id");
  }
  if (!cotizacion) {
    return cotizacionAPI.notFound("No se encontro cotizacion con este id");
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">
              Cotizacion No. {cotizacion.codigo}
            </h3>
            <Row>
              <Col>
                <p className="capitalize">
                  <b>Tercero : </b>
                  <Link to={`/terceros/${tercero._id}`}>{tercero.nombre}</Link>
                </p>
              </Col>
              <Col>
                <p>
                  <b>Orden :</b>{" "}
                  <Link
                    to={`/terceros/${id}/bodegas/${orden.bodega}/ordenes/${cotizacion.orden}`}
                  >
                    {orden.codigo}{" "}
                  </Link>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h4 className="page-title-orden">Equipos</h4>
            <EquiposTable cotizacion={cotizacion}></EquiposTable>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CotizacionDetail;
