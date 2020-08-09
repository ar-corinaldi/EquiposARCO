import React, { useState, useEffect, useContext } from "react";
import EscogerEquipos from "../../Actividades/Remision/EscogerEquipos";
import FilterLogo from "../../../assets/options.svg";
import GlobalsContext from "../../GlobalsContext";
import { Popper, Fade, Popover } from '@material-ui/core';

function BuscarEquiposCotizados(props) {
  //Estados globales
  const [
    equiposSeleccionados,
    setEquiposSeleccionados,
  ] = props.equiposSeleccionados;

  const [equipos, setEquipos] = props.equipos;

  //Estados propios
  const [equiposFilter, setEquiposFilter] = useState({ open: false });
  const [anchorEl, setAnchorEl] = useState(null);

  //Contexto global
  const context = useContext(GlobalsContext);

  //Variables
  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;


  //Funciones

  function handleFilterClick(event) {
    console.log('===============Target=====================');
    console.log(event.currentTarget);
    console.log('====================================');
    setAnchorEl(anchorEl ? null : event.currentTarget);

  }


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
          id="boton-filter"
          type="button"
          className="border-0 bg-transparent no-border-active"
          onClick={handleFilterClick}
        >
          <img src={FilterLogo} className="basicLogo" />
        </button>
        <Popover id={id} open={open} anchorEl={anchorEl}
          onClose={() => { setAnchorEl(null) }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        // transition
        >
          {/* {({ TransitionProps }) => (
            <Fade {...TransitionProps}>
              <div className={classes.paper}>The content of the Popper.</div>
            </Fade>
          )} */}
          <div className="escogerWrapper equipo-filter-wrapper">
            <p> Hola</p>
          </div>
        </Popover>
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
