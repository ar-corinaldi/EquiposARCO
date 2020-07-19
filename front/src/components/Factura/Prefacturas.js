import React from "react";
import ContenidoPrefactura from "./ContenidoPrefactura";
import usePrefacturas from "./usePrefacturas";

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
  const { fechaInicial, fechaCorte, ordenes } = props;
  let { prefacturas } = usePrefacturas(fechaInicial, fechaCorte, ordenes);

  return (
    <React.Fragment>
      <div>Prefacturas</div>
      {prefacturas.map(({ mes, prefacturaMes, anio }) =>
        Object.keys(prefacturaMes).length > 0 ? (
          <div key={mes} className="row" id="info-wrapper">
            <div className="col-2">
              {anio}/{nombreMeses[mes]}
            </div>
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre Equipo</th>
                    <th>Cantidad</th>
                    <th>Periodo</th>
                    <th>Cantidad Facturada</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(prefacturaMes) &&
                    Object.keys(prefacturaMes).map((idEquipo) => (
                      <ContenidoPrefactura
                        key={idEquipo}
                        equipo={prefacturaMes[idEquipo].equipo}
                        listaMes={prefacturaMes[idEquipo].listaMes}
                        mes={mes + 1}
                        anio={anio}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null
      )}
    </React.Fragment>
  );
}

export default Prefacturas;
