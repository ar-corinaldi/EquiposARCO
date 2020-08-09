import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPIDetail from "../../hooks/useFetchAPI";
import Prefacturas from "./Prefacturas";
import Factura from "./Factura";
import InfoFactura from "./InfoFactura";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FacturaPrecio from "./FacturaPrecio";

function FacturaDetail() {
  let { idFactura } = useParams();

  const [factura, setFactura] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/facturas/${idFactura}`);
      const data = await res.json();
      const {
        fechaPago,
        fechaCorte,
        fechaInicial,
        fechaPrimeraOrden,
        fechaEmision,
      } = data;
      data.fechaPago = new Date(fechaPago);
      data.fechaCorte = new Date(fechaCorte);
      data.fechaInicial = new Date(fechaInicial);
      data.fechaPrimeraOrden = new Date(fechaPrimeraOrden);
      data.fechaEmision = new Date(fechaEmision);
      let ordenes = factura.ordenes || [];
      factura.ordenes = ordenes.map((orden) => {
        orden.fechaInicio = orden.fechaInicio
          ? new Date(orden.fechaInicio)
          : undefined;
        orden.fechaFin = orden.fechaFin ? new Date(orden.fechaFin) : undefined;

        let remisiones = orden.remisiones || [];
        orden.remisiones = remisiones.map((rem) => {
          rem.fechaSalida = rem.fechaSalida
            ? new Date(rem.fechaSalida)
            : undefined;
          rem.fechaLlegada = rem.fechaLlegada
            ? new Date(rem.fechaLlegada)
            : undefined;
          return rem;
        });

        let devoluciones = orden.devoluciones || [];
        orden.devoluciones = devoluciones.map((dev) => {
          dev.fecahSalida = dev.fechaSalida
            ? new Date(dev.fechaSalida)
            : undefined;
          dev.fechaLlegada = dev.fechaLlegada
            ? new Date(dev.fechaLlegada)
            : undefined;

          return devoluciones;
        });

        return orden;
      });
      setFactura(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

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
        <Col>
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
            setCanFacturar={null}
          />
        </Col>
      </Row>
      <Col>
        <FacturaPrecio
          precioTotal={factura.precioTotal}
          iva={[factura.iva, null]}
          facturar={null}
          canFacturar={[true, null]}
        />
      </Col>
      <Factura
        echaPrimeraOrden={
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
        setCanFacturar={null}
      />
    </Container>
  );
}

export default FacturaDetail;
