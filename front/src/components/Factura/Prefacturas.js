import React, { useState, useEffect } from "react";
import PrefacturaTable from "./PrefacturaTable";
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
  const { fechaInicial, fechaActual, ordenes } = props;
  const { equipos, prefacturas } = usePrefacturas(
    fechaInicial,
    fechaActual,
    ordenes
  );

  return (
    <React.Fragment>
      <div>Prefacturas</div>
      {prefacturas.map(({ mes, prefacturasDiarias, anio }) => (
        <div key={mes} className="row" id="info-wrapper">
          <div className="col-2">{nombreMeses[mes]}</div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre Equipo</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Periodo Facturado</th>
                </tr>
              </thead>
              <tbody>
                {equipos &&
                  equipos.map((equipo) => (
                    <PrefacturaTable
                      key={equipo._id}
                      equipo={equipo}
                      prefactura={prefacturasDiarias["_" + equipo._id]}
                      mes={mes + 1}
                      anio={anio}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Prefacturas;
