import React from "react";
import PrefacturaContenido from "./PrefacturaContenido";
import usePrefacturas from "./usePrefacturas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  } = props;
  let { prefacturas } = usePrefacturas(fechaPrimeraOrden, fechaCorte, ordenes);
  console.log("Renderiza todo", fechaInicial);
  return (
    <React.Fragment>
      {prefacturas.map(({ mes, prefacturaMes, anio }) =>
        Object.keys(prefacturaMes).length > 0 &&
        mes >= fechaInicial.getMonth() &&
        anio >= fechaInicial.getFullYear() &&
        mes <= fechaCorte.getMonth() &&
        anio <= fechaCorte.getFullYear() ? (
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
                      <th>Nombre Equipo</th>
                      <th>Cantidad</th>
                      <th>Periodo</th>
                      <th>Facturado</th>
                      <th>Precio</th>
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
      )}
    </React.Fragment>
  );
}

export default Prefacturas;
