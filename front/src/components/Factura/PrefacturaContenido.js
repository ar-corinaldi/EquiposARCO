import React from "react";
import PrefacturaEquipo from "./PrefacturaEquipo";
import PrefacturaTransporte from "./PrefacturaTransporte";
function PrefacturaContenido(props) {
  const {
    idEquipos,
    prefactura,
    mes,
    anio,
    setPrecioTotal,
    fechaInicial,
    fechaCorte,
    transportes,
  } = props;

  return (
    <React.Fragment>
      <React.Fragment>
        {transportes.map((transporte) => (
          <PrefacturaTransporte
            key={transporte.fecha}
            transporte={transporte}
            setPrecioTotal={setPrecioTotal}
            fechaInicial={fechaInicial}
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
            fechaCorte={fechaCorte}
            fechaInicial={fechaInicial}
            setPrecioTotal={setPrecioTotal}
          />
        ))}
      </React.Fragment>
    </React.Fragment>
  );
}

export default PrefacturaContenido;
