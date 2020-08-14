import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";

export default function EscogerBodega(props) {
  const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
  const [bodegas, setBodegas] = props.bodegas;
  const [pendingValue, setPendingValue] = React.useState({});
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setBodegaSeleccionada(pendingValue);
    setPendingValue({});
    setOpen(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 30,
    stringify: (option) =>
      option.nombreBodega +
      option.direccionBodega +
      option.municipio +
      option.pais +
      option.telefono +
      option.departamento +
      (option.duenio ? option.duenio.nombre + option.duenio.numeroDocumento : "")
  });

  return (
    <>
      <div className="rootBodega">
        <h4>Escoja la bodega destino</h4>
        <div className="completeWrapper">
          <Autocomplete
            openOnFocus
            autoHighlight
            disableCloseOnSelect
            open={open}
            value={pendingValue}
            filterOptions={filterOptions}
            noOptionsText="No hay bodegas"
            classes={{
              paper: "paper",
              option: "optionBodega",
              popper: "popper",
            }}
            onClose={handleClose}
            onOpen={() => { setPendingValue(bodegaSeleccionada); }}
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
                open ? handleClose() : (() => { })();
                setOpen(!open);
              }
            }}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            getOptionLabel={(option) => {
              if (option && option.nombreBodega) {
                return option.nombreBodega;
              }
              else {
                return "";
              }
            }
            }
            options={[...bodegas]
              .sort((a, b) => {
                // Muestra la bodega seleccionada primero
                let ai = (a === bodegaSeleccionada) || (a === pendingValue);
                let bi = (b === bodegaSeleccionada) || (b === pendingValue);
                return ai ? -1 : bi ? 1 : 0;
              })}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className="nombreBodega">
                  <span>{(option.duenio ? option.duenio.nombre + " - " : "") + option.nombreBodega}</span>
                  <br />
                  <span className="bodegaDescripcion">
                    {option.municipio +
                      ", " +
                      option.pais +
                      ". " +
                      option.direccionBodega}
                  </span>
                </div>
                <DoneIcon
                  className="iconSelected"
                  style={{ visibility: selected ? "visible" : "hidden" }}
                  onClick={() => {
                    handleClose();
                    setOpen(false);
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
                className="inputBodega"
                placeholder="Buscar bodega"
              />
            )}
          ></Autocomplete>
        </div>
      </div>
    </>
  );
}
