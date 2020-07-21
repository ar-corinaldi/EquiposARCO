import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useAPIDetail from "../../hooks/useFetchAPI";
import Prefacturas from "./Prefacturas";
import InfoFactura from "./InfoFactura";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FacturaDetail() {
  let { idFactura } = useParams();
  const { resource, loading, notFound } = useAPIDetail(
    `/facturas/${idFactura}`
  );
  const [factura, setFactura] = useState(resource);
  const [fechaCorte, setFechaCorte] = useState(new Date());
  const [fechaInicial, setFechaInicial] = useState(new Date(2020, 5, 1));
  const refFechaCorte = useRef();
  const refFechaInicial = useRef();

  const getOrdenMenorFechaInicio = () => {
    let fechaIni = fechaCorte;
    let fechaFin = fechaCorte;
    const ordenes = factura && factura.ordenes;
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

  useEffect(() => {
    // getOrdenMenorFechaInicio();
    setFactura(resource);
  }, [resource]);

  const cambioFechaInicial = (e) => {
    e.preventDefault();
    const val = refFechaInicial.current.value;
    const newFecha = new Date(val);
    setFechaInicial(newFecha);
  };

  const cambioFechaCorte = (e) => {
    e.preventDefault();
    const val = refFechaCorte.current.value;
    const newFecha = new Date(val);
    setFechaCorte(newFecha);
  };

  const parseDate = (date) => {
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mes, dia].join("-");
  };

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

  if (!factura.ordenes || factura.ordenes.length === 0) {
    return <div>No se encontraron ordenes asociadas a la factura</div>;
  }

  return (
    <Container fluid>
      <Row>
        <InfoFactura
          tercero={
            factura &&
            factura.ordenes &&
            factura.ordenes.length > 0 &&
            factura.ordenes[0].bodega &&
            factura.ordenes[0].bodega.duenio
              ? factura.ordenes[0].bodega.duenio
              : null
          }
          bodega={
            factura &&
            factura.ordenes &&
            factura.ordenes.length > 0 &&
            factura.ordenes[0].bodega
              ? factura.ordenes[0].bodega
              : null
          }
          fechaInicial={fechaInicial}
          fechaCorte={fechaCorte}
        />
      </Row>
      <Row>
        <Col>
          <label htmlFor="fechaInicial">Fecha Inicial</label>
          <input
            name="fechaInicial"
            defaultValue={parseDate(fechaInicial)}
            type="date"
            ref={refFechaInicial}
          />
          <button onClick={cambioFechaInicial}>Cambiar Fecha Inicial</button>
          <label htmlFor="fechaCorte">Fecha Corte</label>
          <input
            name="fechaCorte"
            defaultValue={parseDate(fechaCorte)}
            type="date"
            ref={refFechaCorte}
          />
          <button onClick={cambioFechaCorte}>Cambiar Fecha Corte</button>
          {factura.ordenes ? (
            <Prefacturas
              key={factura._id}
              fechaInicial={fechaInicial}
              fechaCorte={fechaCorte}
              ordenes={factura.ordenes || []}
            />
          ) : (
            loading
          )}
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
