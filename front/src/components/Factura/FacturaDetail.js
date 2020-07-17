import React from "react";
import { useParams, Link } from "react-router-dom";
import useAPIDetail from "../../hooks/useFetchAPI";
import formatoFechas from "../utils/FormatoFechas";
import Prefacturas from "./Prefacturas";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FacturaDetail() {
  let { idFactura } = useParams();
  const { resource, loading, notFound, setLoading } = useAPIDetail(
    `/facturas/${idFactura}`
  );

  const factura = resource;

  let fechaActual = new Date();
  let fechaInicial = fechaActual;

  const getOrdenMenorFechaInicio = () => {
    let fechaIni = fechaActual;
    let fechaFin = fechaActual;
    const { ordenes } = factura;
    ordenes &&
      ordenes.forEach((orden) => {
        orden.remisiones.forEach((remision) => {
          const currentRemisionDate = new Date(remision.fechaLlegada);
          if (currentRemisionDate.getTime() < fechaIni.getTime()) {
            fechaIni = currentRemisionDate;
          }
          if (currentRemisionDate.getTime() > fechaFin.getTime()) {
            fechaFin = currentRemisionDate;
          }
        });
        orden.devoluciones.forEach((devolucion) => {
          const currentDevolucionDate = new Date(devolucion.fechaSalida);
          if (currentDevolucionDate.getTime() < fechaIni.getTime()) {
            fechaIni = currentDevolucionDate;
          }
          if (currentDevolucionDate.getTime() > fechaFin.getTime()) {
            fechaFin = currentDevolucionDate;
          }
        });
      });

    fechaInicial = fechaIni;
  };

  getOrdenMenorFechaInicio();

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!factura) {
    return notFound("La factura no fue encontrada");
  }

  if (factura.ordenes && factura.ordenes.length === 0) {
    return <div>No se encontraron ordenes asociadas a la factura</div>;
  }

  return (
    <Container fluid>
      <Col>
        <Row>
          <div id="info-wrapper">
            <h4 id="titulos">Informacion factura</h4>
            <p>
              <strong>Nombre Tercero : </strong>
              {factura.ordenes &&
              factura.ordenes.length > 0 &&
              factura.ordenes[0].bodega &&
              factura.ordenes[0].bodega.duenio ? (
                <Link to={`/terceros/${factura.ordenes[0].bodega.duenio._id}`}>
                  {factura.ordenes[0].bodega.duenio.nombre}
                </Link>
              ) : null}
            </p>
            <p>
              <strong>Tipo Documento : </strong>
              {factura.ordenes &&
              factura.ordenes.length > 0 &&
              factura.ordenes[0].bodega &&
              factura.ordenes[0].bodega.duenio
                ? factura.ordenes[0].bodega.duenio.tipoDocumento
                : null}
            </p>
            <p>
              <strong>Numero Documento : </strong>
              {factura.ordenes &&
              factura.ordenes.length > 0 &&
              factura.ordenes[0].bodega &&
              factura.ordenes[0].bodega.duenio
                ? factura.ordenes[0].bodega.duenio.numeroDocumento
                : null}
            </p>
            <p>
              <strong>Fecha Inicial - Fecha Final : </strong>
              {`${formatoFechas(fechaInicial)} - ${formatoFechas(fechaActual)}`}
            </p>
          </div>
        </Row>
      </Col>
      <Row>
        <Col>
          {factura.ordenes &&
            factura.ordenes.map((orden) => (
              <Prefacturas
                fechaInicial={fechaInicial}
                fechaActual={fechaActual}
                ordenes={factura.ordenes}
              />
            ))}
        </Col>
      </Row>
      <Col>
        <Row>
          <div id="info-wrapper">
            <h4 id="titulos">Total</h4>
            <p>
              <strong>Nombre : </strong>
              {"Total"}
            </p>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

export default FacturaDetail;
