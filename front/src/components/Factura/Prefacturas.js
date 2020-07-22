import React from "react";
import PrefacturaContenido from "./PrefacturaContenido";
import usePrefacturas from "./usePrefacturas";
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
    fechaInicial,
    fechaCorte,
    fechaEmision,
    ordenes,
    setPrecioTotal,
  } = props;
  const [precioMeses, setPrecioMeses] = useState(0);
  let { prefacturas } = usePrefacturas(fechaInicial, fechaCorte, ordenes);

  // useEffect(() => {
  //   console.log("precio meses a 0");
  //   setPrecioMeses(0);
  // }, []);

  // useEffect(() => {
  //   console.log("Antes set precioTotal", precioMeses);
  //   setPrecioTotal(precioMeses);
  //   console.log("set precio total");
  // }, [precioMeses]);

  return (
    <React.Fragment>
      <div>Prefacturas</div>
      {prefacturas.map(({ mes, prefacturaMes, anio }) =>
        Object.keys(prefacturaMes).length > 0 &&
        mes >= fechaEmision.getMonth() &&
        anio >= fechaEmision.getFullYear() &&
        mes <= fechaCorte.getMonth() &&
        anio <= fechaCorte.getFullYear() ? (
          <div key={`${anio}-${mes}`} className="row" id="info-wrapper">
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
                    fechaEmision={fechaEmision}
                    fechaCorte={fechaCorte}
                    setPrecioTotal={setPrecioTotal}
                    setPrecioMeses={setPrecioMeses}
                    precioMeses={precioMeses}
                  />
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
