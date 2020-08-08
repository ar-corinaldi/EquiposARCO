import React, { useState, useEffect } from "react";
import EscogerEquipos from "../../Actividades/Remision/EscogerEquipos";
import FilterLogo from "../../../assets/options.svg";

function BuscarEquiposCotizados(props) {
  //Estados globales
  const [
    equiposSeleccionados,
    setEquiposSeleccionados,
  ] = props.equiposSeleccionados;

  const [equipos, setEquipos] = props.equipos;

  //Estados propios


  //Effects

  useEffect(() => {
    async function fetchEquipos() {
      let equiposBack = await (await fetch("/equipos/precios-exists")).json();
      // console.log("================BAAAAAACK====================");
      // console.log(equiposBack);

      for (let i = 0; i < equiposBack.length; i++) {
        let equipo = equiposBack[i];
        // console.log(equipo);
        if (equipo.precios.length === 0 || !equipo.precios || !equipo.precios[0]) {
          console.log("- " + i);
          // equiposBack.splice(i,i);
          equiposBack = equiposBack.filter((prev, index) => i !== index)
        }
      }
      // console.log(equiposBack);
      // console.log("====================================");
      setEquipos(equiposBack);
    }
    fetchEquipos();
  }, []);

  useEffect(() => {
    // console.log("==========Seleccionados==========================");
    // console.log(equiposSeleccionados);
    // console.log("====================================");
  }, [equiposSeleccionados]);

  return (
    <>
      <div className="filtersWrapper">
        <button
          type="button"
          className="border-0 bg-transparent no-border-active"
        >
          <img src={FilterLogo} className="basicLogo" />
        </button>
      </div>
      <div className="escogerWrapper">
        <EscogerEquipos
          equiposSels={[equiposSeleccionados, setEquiposSeleccionados]}
          equipos={[equipos, setEquipos]}
        />
      </div>
    </>
  );
}

export default BuscarEquiposCotizados;
