import React from "react";
import { useParams } from "react-router-dom";
import useAPIDetail from "../../hooks/useFetchAPI";
import Prefacturas from "./Prefacturas";
import InfoFactura from "./InfoFactura";
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
      <Row>
        <InfoFactura
          tercero={
            factura.ordenes.length > 0 &&
            factura.ordenes[0].bodega &&
            factura.ordenes[0].bodega.duenio
              ? factura.ordenes[0].bodega.duenio
              : null
          }
          bodega={
            factura.ordenes.length > 0 && factura.ordenes[0].bodega
              ? factura.ordenes[0].bodega
              : null
          }
          fechaInicial={fechaInicial}
          fechaActual={fechaActual}
        />
      </Row>
      <Row>
        <Col>
          <Prefacturas
            key={factura._id}
            fechaInicial={fechaInicial}
            fechaActual={fechaActual}
            ordenes={factura.ordenes}
          />
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
