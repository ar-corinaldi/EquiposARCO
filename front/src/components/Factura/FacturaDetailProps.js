import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Prefacturas from "./Prefacturas";
import FacturaObraList from "./FacturaObraList";
import Toast from "../Toast";
import FacturaPrecio from "./FacturaPrecio";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function FacturaDetail(props) {
  const { ordenes, tercero, bodega, fechaPrimeraOrden, idObra } = props;
  const [fechaPago, setFechaPago] = props.fechaPago;
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;

  const [precioTotal, setPrecioTotal] = useState(0);
  const [iva, setIva] = useState(19);
  const [renderPrefacturas, setRenderPrefacturas] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (fechasValida(fechaCorte, fechaInicial)) {
      setPrecioTotal(0);
      setRenderPrefacturas(
        <Prefacturas
          fechaPrimeraOrden={
            new Date(fechaCorte.getFullYear(), 0, 1) || fechaPrimeraOrden
          }
          fechaCorte={fechaCorte}
          fechaInicial={fechaInicial}
          ordenes={ordenes || []}
          setPrecioTotal={setPrecioTotal}
        />
      );
    }
  }, [ordenes, fechaInicial, fechaCorte]);

  useEffect(() => {
    let newFechaPago = new Date(fechaCorte);
    // Revisar que no se lleve la referencia
    newFechaPago.setDate(newFechaPago.getDate() + 5);
    setFechaPago(newFechaPago);
  }, [fechaCorte]);

  const facturar = async () => {
    const factura = {
      ordenes,
      fechaCorte,
      fechaInicial,
      fechaPago,
      tercero,
      precioTotal: precioTotal * (1 + iva / 100),
      subTotal: precioTotal,
      iva,
      codigoObra: idObra,
      bodega: bodega._id,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(factura),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch("/facturas", options);
      const factura = await res.json();
      if (!res.ok) {
        return Toast(["No se pudo crear la factura"], true, res.status);
      } else {
        Toast(["Factura creada correctamente"], true, res.status);
        let fecha = new Date(factura.fechaCorte);
        setFechaInicial(new Date(fecha));
        //  history.push("/facturas/${factura._id}");
      }
    } catch (e) {
      Toast(["Error en el sistema"], true, 500);
    }
  };

  const fechasValida = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() > fechaMenor.getTime();

  return (
    <React.Fragment>
      <Row>
        <Col>{renderPrefacturas}</Col>
      </Row>
      <FacturaPrecio
        precioTotal={precioTotal}
        iva={[iva, setIva]}
        facturar={facturar}
      />
    </React.Fragment>
  );
}

export default FacturaDetail;
