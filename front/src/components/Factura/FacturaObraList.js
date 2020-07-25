import React, { useState, useEffect } from "react";
import useFetchAPI from "../../hooks/useFetchAPI";
import Row from "react-bootstrap/Row";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";
function FacturaObraList(props) {
  const { idObra, setFechaCorte, fechaCorte } = props;
  const [fechaInicial, setFechaInicial] = props.fechaInicial;

  let { resource, loading } = useFetchAPI(`/obras/${idObra}/facturas`, [
    fechaInicial,
  ]);
  let facturas = resource;

  useEffect(() => {
    if (resource && resource.length > 0) {
      let inicial = new Date(resource[0].fechaCorte);
      if (fechaInicial.getTime() !== inicial.getTime()) {
        setFechaInicial(inicial);
      }
    }
  }, [resource]);

  if (loading) {
    return loading;
  }

  if (!facturas) {
    return <div>Facturas no encontradas</div>;
  }

  if (facturas.length === 0) {
    return null;
  }

  return (
    <div id="info-wrapper">
      <Row>
        <strong id="titulo">Facturas Generadas</strong>
      </Row>
      {facturas &&
        facturas.length > 0 &&
        facturas.map((fact) => (
          <Row key={fact._id}>
            <p className="mr-2 mb-0">
              <strong>Factura : </strong>
              {fact.codigo}
            </p>
            <p className="mr-2 mb-0">
              <strong>Fecha Inicial : </strong>
              {formatoFechas(fact.fechaInicial)}
            </p>
            <p className="mr-2 mb-0">
              <strong>Factura Corte: </strong>
              {formatoFechas(fact.fechaCorte)}
            </p>
            <p className="mr-2 mb-0">
              <strong>Costo: </strong>
              {formatoPrecios(fact.precioTotal)}
            </p>
          </Row>
        ))}
    </div>
  );
}

export default FacturaObraList;
