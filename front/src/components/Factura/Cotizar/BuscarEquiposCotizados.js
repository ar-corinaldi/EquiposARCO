import React, { useState, useEffect } from "react";
import EscogerEquipos from "../../Actividades/Remision/EscogerEquipos";
import FilterLogo from "../../../assets/options.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function BuscarEquiposCotizados(props) {
  //Estados globales
  const [
    equiposSeleccionados,
    setEquiposSeleccionados,
  ] = props.equiposSeleccionados;

  //Estados propios
  const [equipos, setEquipos] = useState([]);

  //Effects

  useEffect(() => {
    async function fetchEquipos() {
      const equiposBack = await (await fetch("/equipos")).json();
      console.log("====================================");
      console.log(equiposBack);
      console.log("====================================");
      setEquipos(equiposBack);
    }
    fetchEquipos();
  }, []);

  useEffect(() => {
    console.log("==========Seleccionados==========================");
    console.log(equiposSeleccionados);
    console.log("====================================");
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
