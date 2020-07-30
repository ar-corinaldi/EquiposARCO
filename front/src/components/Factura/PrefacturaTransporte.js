import React from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import { useEffect } from "react";

function PrefacturaTransporte(props) {
  const { transporte, setPrecioTotal, fechaInicial, fechaCorte } = props;
  const { costo, fecha } = transporte;

  useEffect(() => {
    if (fecha.getDate() >= fechaInicial.getDate()) {
      setPrecioTotal && setPrecioTotal((prevPrecio) => prevPrecio + costo);
    }
  }, [fechaInicial, fechaCorte]);
  return fecha.getDate() >= fechaInicial.getDate() ? (
    <tr>
      <td>N/A</td>
      <td>Servicio Transporte</td>
      <td>{formatoPrecios(costo)}</td>
      <td>N/A</td>
      <td>{`${fecha.getDate()}/${
        fecha.getMonth() + 1
      }/${fecha.getFullYear()}`}</td>
      <td>{formatoPrecios(costo)}</td>
    </tr>
  ) : null;
}

export default PrefacturaTransporte;
