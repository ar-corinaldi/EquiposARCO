import React from "react";
import PrefacturaContenido from "./PrefacturaContenido";
import formatoPrecios from "../utils/FormatoPrecios";
import useFacturas from "./useFacturas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

function Factura(props) {
  const {
    fechaPrimeraOrden,
    fechaCorte,
    fechaInicial,
    ordenes,
    setPrecioTotal,
  } = props;

  let { facturas } = useFacturas(
    fechaPrimeraOrden,
    fechaInicial,
    fechaCorte,
    ordenes,
    setPrecioTotal
  );

  useEffect(() => {
    // setPrecioTotal(precioTotal);
  }, [ordenes, fechaInicial, fechaCorte, facturas]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Codigo Remision</th>
          <th>Cantidad</th>
          <th>Nombre Equipo</th>
          <th>Valor Unitario</th>
          <th>Num</th>
          <th>Periodo</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {facturas.map((fact, index) => (
          <tr key={index}>
            <td>{fact.rem}</td>
            <td>{fact.cantidad}</td>
            <td>{fact.nombreEquipo}</td>
            <td>{formatoPrecios(fact.valorUnitario)}</td>
            <td>
              {fact.num} {fact.tiempo}
            </td>
            <td>{fact.periodo}</td>
            <td>{formatoPrecios(fact.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Factura;
