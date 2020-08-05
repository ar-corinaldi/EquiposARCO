import React from "react";
import PrefacturaContenido from "./PrefacturaContenido";
import usePrefacturas from "./usePrefacturas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

const nombreMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function Prefacturas(props) {
  const {
    fechaPrimeraOrden,
    fechaCorte,
    fechaInicial,
    ordenes,
    setPrecioTotal,
    setCanFacturar,
    fechasValida,
  } = props;
  const [renderPrefacturas, setRenderPrefacturas] = useState(null);
  let { prefacturas } = usePrefacturas(fechaPrimeraOrden, fechaCorte, ordenes);
  useEffect(() => {
    console.log(prefacturas);
    console.log(fechaCorte);
    console.log(fechaPrimeraOrden);
  }, [prefacturas]);

  useEffect(() => {
    let shouldRender =
      fechasValida === undefined ||
      fechasValida(fechaCorte, fechaInicial) === true;
    shouldRender && setRenderPrefacturas(render());

    if (fechasValida && fechasValida(fechaCorte, fechaInicial)) {
      setCanFacturar && setCanFacturar(true);
      setPrecioTotal && setPrecioTotal(0);
    } else if (
      fechasValida &&
      fechasValida(fechaCorte, fechaInicial) === false
    ) {
      setCanFacturar && setCanFacturar(false);
    }
  }, [ordenes, fechaInicial, fechaCorte, prefacturas]);

  const render = () => {
    return prefacturas.map(({ mes, prefacturaMes, anio }) =>
      Object.keys(prefacturaMes).length > 0 &&
      new Date(anio, mes + 1).getTime() >= fechaInicial.getTime() &&
      new Date(anio, mes).getTime() <= fechaCorte.getTime() ? (
        <Row key={`${anio}-${mes}`} id="info-wrapper">
          <Row>
            <Col>
              {anio}/{nombreMeses[mes]}
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="table">
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Nombre Equipo</th>
                    <th>Valor Unitario</th>
                    <th>Num</th>
                    <th>Periodo</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <PrefacturaContenido
                    idEquipos={Object.keys(prefacturaMes) || []}
                    prefactura={prefacturaMes}
                    transportes={prefacturaMes.transportes || []}
                    mes={mes + 1}
                    anio={anio}
                    fechaInicial={fechaInicial}
                    fechaCorte={fechaCorte}
                    setPrecioTotal={setPrecioTotal}
                  />
                </tbody>
              </table>
            </Col>
          </Row>
        </Row>
      ) : null
    );
  };
  return <React.Fragment>{renderPrefacturas}</React.Fragment>;
}

export default Prefacturas;
