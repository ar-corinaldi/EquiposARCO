import React, { useState, useEffect } from "react";
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

  const [factura, setFactura] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetching();
    setLoading(false);
  }, []);

  const fetching = async () => {
    try {
      const res = await fetch(`/facturas/${idFactura}`);
      const data = await res.json();
      const {
        fechaPago,
        fechaCorte,
        fechaInicial,
        fechaPrimeraOrden,
        fechaEmision,
      } = factura;
      data.fechaPago = new Date(fechaPago);
      data.fechaCorte = new Date(fechaCorte);
      data.fechaInicial = new Date(fechaInicial);
      if (fechaPrimeraOrden) {
        data.fechaPrimeraOrden = new Date(fechaPrimeraOrden);
      }
      data.fechaEmision = new Date(fechaEmision);
      setFactura(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [renderPrefacturas, setRenderPrefacturas] = useState(null);

  useEffect(() => {
    setRenderPrefacturas(
      <Prefacturas
        fechaPrimeraOrden={
          factura.fechaPrimeraOrden ||
          new Date(
            factura.fechaInicial && factura.fechaInicial.getFullYear(),
            0,
            1,
            1
          ) ||
          new Date()
        }
        fechaCorte={factura.fechaCorte || new Date()}
        fechaInicial={factura.fechaInicial || new Date()}
        ordenes={factura.ordenes || []}
        setPrecioTotal={null}
      />
    );
  }, [factura]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <InfoFactura
          tercero={
            factura.bodega && factura.bodega.duenio ? factura.bodega.duenio : {}
          }
          bodega={factura.bodega || {}}
          ordenes={factura.ordenes || []}
        />
      </Row>
      <Row>
        <Col>{renderPrefacturas}</Col>
      </Row>
      <Col>
        <Row>
          <div id="info-wrapper">
            <h4 id="titulos">Total</h4>
            <p>
              <strong>{formatoPrecios(factura.precioTotal)}</strong>
            </p>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

export default FacturaDetail;
