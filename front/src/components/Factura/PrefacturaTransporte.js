import React from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import { useEffect } from "react";

function PrefacturaTransporte(props) {
  const { transporte, setPrecioTotal, fechaEmision } = props;
  const { costo, fecha } = transporte;

  useEffect(() => {
    setPrecioTotal((prevPrecio) => prevPrecio + costo);
  }, [fechaEmision]);
  return (
    <tr>
      <td>Servicio Transporte</td>
      <td>N/A</td>
      <td>{`${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`}</td>
      <td>N/A</td>
      <td>{formatoPrecios(costo)}</td>
      <td>{formatoPrecios(costo)}</td>
    </tr>
  );
}

export default PrefacturaTransporte;
