import React, { useState, useEffect } from "react";
import useFetchAPI from "../../hooks/useFetchAPI";
import Row from "react-bootstrap/Row";
function FacturaObraList(props) {
  const { idObra } = props;
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;
  const [active, setActive] = useState(false);

  let { resource } = useFetchAPI(`/obras/${idObra}/facturas`, [fechaInicial]);
  let facturas = resource;
  useEffect(() => {
    if (resource && resource.length > 0) {
      let inicial = new Date(resource[0].fechaCorte);
      if (fechaInicial.getTime() !== inicial.getTime()) {
        setFechaInicial(inicial);
        if (!active) {
          let corte = new Date(inicial);
          corte.setMonth(corte.getMonth() + 1);
          setActive(false);
          setFechaCorte(corte);
        }
      }
    }
  }, [resource]);

  const renderFechaEmision = (fecha) => {
    let newF = new Date(fecha);
    return `${newF.getDate()}/${newF.getMonth()}/${newF.getFullYear()}`;
  };

  if (!facturas) {
    return <div>Facturas no encontradas</div>;
  }

  if (facturas.length === 0) {
    return null;
  }

  return (
    <div id="info-wrapper">
      <div>Facturas Generadas</div>
      {facturas &&
        facturas.length > 0 &&
        facturas.map((fact) => (
          <Row key={fact._id}>
            <p>
              <strong>Factura : </strong>
              {fact.codigo}
            </p>
            <p>
              <strong>Fecha emision : </strong>
              {renderFechaEmision(fact.fechaEmision)}
            </p>
          </Row>
        ))}
    </div>
  );
}

export default FacturaObraList;
