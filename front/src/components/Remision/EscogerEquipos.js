/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import "./EscogerEquipos.css";

export default function EscogerEquipos(props) {
  const [equipoSel, setEquipoSel] = props.equipoSel;
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const [equipos, setEquipos] = props.equipos;
  const [pendingValue, setPendingValue] = React.useState({});
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setEquipoSel(pendingValue);
    //console.log("equiposSels", equiposSels);
    //console.log("pendingValue", pendingValue);
    const newEquiposSels = equiposSels.concat(pendingValue);
    //console.log("newEquiposSels", newEquiposSels);
    setEquiposSels(newEquiposSels);
    setPendingValue({});
    setEquipoSel({});
    setOpen(false);
  };
  const handleSelect = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    //setEquipoSel(pendingValue);
    //console.log("equiposSels", equiposSels);
    //console.log("pendingValue", pendingValue);
    const newEquiposSels = equiposSels.concat(pendingValue);
    //console.log("newEquiposSels", newEquiposSels);
    setEquiposSels(newEquiposSels);
    setPendingValue({});
    setEquipoSel({});
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 15,
    stringify: (option) =>
      option.nombreEquipo +
      option.nombreGrupo +
      option.nombreFamilia +
      option.tipoEquipo +
      option.codigo,
  });

  return (
    <>
      <div className="rootEquipo">
        <label htmlFor="equipos">Escoja los equipos que serán enviados </label>
        <div className="completeWrapper">
          <Autocomplete
            openOnFocus
            autoHighlight
            disableCloseOnSelect
            open={open}
            value={pendingValue}
            filterOptions={filterOptions}
            noOptionsText="No hay equipos registrados en la orden"
            classes={{
              paper: "paper",
              option: "optionEquipo",
              popper: "popper",
            }}
            onClose={handleClose}
            onFocus={() => {
              setOpen(true);
            }}
            onBlur={() => {
              setOpen(false);
            }}
            onInputChange={(e, value) => {
              if (!open && value) {
                setOpen(true);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                open ? handleClose() : (() => {})();
                setOpen(!open);
              }
            }}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            getOptionLabel={(option) => {
              if (option && option.nombreEquipo) {
                return option.nombreEquipo;
              } else {
                return "";
              }
            }}
            options={
              [...equipos]
              //   .sort((a, b) => {
              //   // Muestra la bodega seleccionada primero
              //   let ai = a === equipoSeleccionado || a === pendingValue;
              //   let bi = b === equipoSeleccionado || b === pendingValue;
              //   return ai ? -1 : bi ? 1 : 0;
              // })}
            }
            getOptionDisabled={(option) => {
              return equiposSels.includes(option);
              //console.log("verificacion", equiposSels.includes(option));
            }}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className="nombreEquipo">
                  <span>{option.nombreEquipo}</span>
                  <br />
                  {/* <span className="equipoDescripcion">
                    {option.nombreGrupo +
                      ", " +
                      option.nombreFamilia +
                      ". " +
                      option.tipoEquipo}
                  </span> */}
                </div>
                <DoneIcon
                  className="iconSelected"
                  style={{ visibility: selected ? "visible" : "hidden" }}
                  onClick={() => {
                    handleSelect();
                    //setOpen(false);
                  }}
                />
                <CloseIcon
                  onClick={() => {
                    setPendingValue(null);
                  }}
                  className="iconSelected"
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
              </React.Fragment>
            )}
            renderInput={(params) => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className="inputEquipo"
                placeholder="Buscar equipo"
              />
            )}
          ></Autocomplete>
        </div>
      </div>
    </>
  );
}
