import React, { useState, useEffect } from "react";
import PrefacturaEquipo from "./PrefacturaEquipo";
import PrefacturaTransporte from "./PrefacturaTransporte";
function PrefacturaContenido(props) {
  const {
    idEquipos,
    prefactura,
    mes,
    anio,
    setPrecioMeses,
    precioMeses,
    setPrecioTotal,
    fechaEmision,
    fechaCorte,
    transportes,
  } = props;

  const [acumEquipos, setAcumEquipos] = new useState(0);

  // useEffect(() => {
  //   setPrecioMeses((prevMes) => {
  //     console.log(`acumEquipos precio`, acumEquipos);
  //     console.log(`mes precio ${mes}`, prevMes);
  //     return prevMes + acumEquipos;
  //   });
  // }, [acumEquipos]);

  return (
    <React.Fragment>
      <React.Fragment>
        {transportes.map((transporte) => (
          <PrefacturaTransporte
            key={transporte.fecha}
            transporte={transporte}
            setPrecioTotal={setPrecioTotal}
            fechaEmision={fechaEmision}
          />
        ))}
      </React.Fragment>
      <React.Fragment>
        {idEquipos.map((idEquipo) => (
          <PrefacturaEquipo
            key={idEquipo}
            equipo={prefactura[idEquipo].equipo}
            listaMes={prefactura[idEquipo].listaMes || []}
            mes={mes}
            anio={anio}
            fechaEmision={fechaEmision}
            setAcumEquipos={setAcumEquipos}
            precioMeses={precioMeses}
            setPrecioMeses={setPrecioMeses}
            setPrecioTotal={setPrecioTotal}
          />
        ))}
      </React.Fragment>
    </React.Fragment>
  );
}

export default PrefacturaContenido;
