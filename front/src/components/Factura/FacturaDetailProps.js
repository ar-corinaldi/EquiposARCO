import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Prefacturas from "./Prefacturas";
import Toast from "../Toast";
import FacturaPrecio from "./FacturaPrecio";
import Factura from "./Factura";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function FacturaDetail(props) {
  const { ordenes, tercero, bodega, fechaPrimeraOrden, idObra } = props;
  const [fechaPago, setFechaPago] = props.fechaPago;
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;
  const [canFacturar, setCanFacturar] = useState(true);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [iva, setIva] = useState(19);
  const [opcion, setOpcion] = useState(1);

  const history = useHistory();

  useEffect(() => {
    let newFechaPago = new Date(fechaCorte);
    newFechaPago.setDate(newFechaPago.getDate() + 5);
    setFechaPago(newFechaPago);
  }, [fechaCorte]);

  const toggle = (value) => {
    setOpcion(value);
  };

  const facturar = async () => {
    setCanFacturar(false);
    const factura = {
      ordenes,
      fechaCorte,
      fechaInicial,
      fechaPago,
      tercero,
      fechaPrimeraOrden,
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
        Toast(
          [`Factura ${factura.codigo} creada correctamente`],
          true,
          res.status
        );
        let fecha = new Date(factura.fechaCorte);
        setFechaInicial(new Date(fecha));
        //  history.push("/facturas/${factura._id}");
      }
    } catch (e) {
      Toast(["Error en el sistema"], true, 500);
    }
  };

  const fechasValida = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  return (
    <React.Fragment>
      <Row id="info-wrapper">
        <Col>
          <ul className="nav nav-tabs nav-bordered box">
            <li className="nav-item">
              <a
                className={
                  opcion === 1
                    ? "nav-link px-3 py-2 active"
                    : "nav-link px-3 py-2"
                }
                onClick={() => toggle(1)}
              >
                <i className="mdi mdi-pencil-box-multiple font-18 d-md-none d-block"></i>
                <span className="d-none d-md-block">Por remision</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  opcion === 2
                    ? "nav-link px-3 py-2 active"
                    : "nav-link px-3 py-2"
                }
                onClick={() => toggle(2)}
              >
                <i className="mdi mdi-image font-18 d-md-none d-block"></i>
                <span className="d-none d-md-block">Por equipo</span>
              </a>
            </li>
          </ul>
          <br></br>
          {opcion === 2 ? (
            <Prefacturas
              fechaPrimeraOrden={
                fechaPrimeraOrden ||
                new Date(fechaInicial.getFullYear(), 0, 1, 1)
              }
              fechaCorte={fechaCorte}
              fechaInicial={fechaInicial}
              ordenes={ordenes || []}
              setPrecioTotal={setPrecioTotal}
              fechasValida={fechasValida}
              setCanFacturar={setCanFacturar}
            />
          ) : (
            <Row id="info-wrapper">
              <Factura
                fechaPrimeraOrden={
                  fechaPrimeraOrden ||
                  new Date(fechaInicial.getFullYear(), 0, 1, 1)
                }
                fechaCorte={fechaCorte}
                fechaInicial={fechaInicial}
                ordenes={ordenes || []}
                setPrecioTotal={setPrecioTotal}
                fechasValida={fechasValida}
                setCanFacturar={setCanFacturar}
              />
            </Row>
          )}
        </Col>
      </Row>
      <FacturaPrecio
        precioTotal={precioTotal}
        iva={[iva, setIva]}
        facturar={facturar}
        canFacturar={[canFacturar, setCanFacturar]}
      />
    </React.Fragment>
  );
}

export default FacturaDetail;
