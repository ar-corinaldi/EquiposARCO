import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useAPIDetail from "../../hooks/useFetchAPI";
import Prefacturas from "./Prefacturas";
import InfoFactura from "./InfoFactura";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import formatoPrecios from "../utils/FormatoPrecios";

function FacturaDetail() {
  let { idFactura } = useParams();
  const { resource, loading, notFound } = useAPIDetail(
    `/facturas/${idFactura}`
  );
  const [factura, setFactura] = useState(resource);
  const [fechaCorte, setFechaCorte] = useState(new Date());
  const [fechaEmision, setFechaEmision] = useState(new Date(2020, 5, 1));
  const [fechaInicial, setFechaInicial] = useState(new Date(2020, 5, 1));
  const [precioTotal, setPrecioTotal] = useState(0);
  const [renderPrefacturas, setRenderPrefacturas] = useState(null);
  const refFechaCorte = useRef();
  const refFechaEmision = useRef();

  useEffect(() => {
    setFactura(resource);
    fechaInicialDeOrdenes();
  }, [resource]);

  useEffect(() => {
    setPrecioTotal(0);
    setRenderPrefacturas(
      <Prefacturas
        key={factura._id}
        fechaInicial={fechaInicial}
        fechaCorte={fechaCorte}
        fechaEmision={fechaEmision}
        ordenes={factura.ordenes || []}
        setPrecioTotal={setPrecioTotal}
      />
    );
    console.log("Render prefactura");
  }, [factura, fechaEmision, fechaCorte]);
  const fechaInicialDeOrdenes = () => {
    const ordenes = factura.ordenes || [];
    ordenes.sort((a, b) => {
      const fechaA = new Date(a.fechaInicio);
      const fechaB = new Date(b.fechaInicio);
      return fechaA.getTime() - fechaB.getTime();
    });
    console.log("No entra a ordenes hay", ordenes.length, "ordenes");
    if (ordenes.length > 0) {
      setFechaInicial(new Date(ordenes[0].fechaInicio));
    }
  };

  const cambioFechaEmision = (e) => {
    e.preventDefault();
    const val = refFechaEmision.current.value;
    const newFecha = new Date(val);
    setFechaEmision(newFecha);
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
          fechaEmision={fechaEmision}
          fechaCorte={fechaCorte}
        />
      </Row>
      <Row>
        <Col>
          <label htmlFor="fechaInicial">Fecha de Emision</label>
          <input
            name="fechaInicial"
            defaultValue={parseDate(fechaEmision)}
            type="date"
            ref={refFechaEmision}
          />
          <button onClick={cambioFechaEmision}>Cambiar Fecha de Emision</button>
          <label htmlFor="fechaCorte">Fecha Corte</label>
          <input
            name="fechaCorte"
            defaultValue={parseDate(fechaCorte)}
            type="date"
            ref={refFechaCorte}
          />
          <button onClick={cambioFechaCorte}>Cambiar Fecha Corte</button>
          {renderPrefacturas}
        </Col>
      </Row>
      <Col>
        <Row>
          <div id="info-wrapper">
            <h4 id="titulos">Total</h4>
            <p>
              <strong>{formatoPrecios(precioTotal)}</strong>
            </p>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

export default FacturaDetail;
