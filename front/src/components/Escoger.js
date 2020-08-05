import React, { useState, useEffect } from "react";
import "./Escoger.css";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";

export default function Escoger(props) {
  const nombre = props.nombre;
  const nombre_plural = props.nombre_plural;
  /**
   * Campos que se usaran para buscar el elemento
   */
  const camposBuscar = props.camposBuscar;
  /**
   * Campos principales para mostrar en las opciones
   */
  const campos = props.campos;
  /**
   * Campos para descripcion de las opciones
   */
  const campoDescripcion = props.campoDescripcion;
  const [elementoSeleceted, setElementoSelected] = props.elementoSelected;
  const elementos = props.elementos;
  const [pendingValue, setPendingValue] = React.useState({});
  const [open, setOpen] = useState(false);

  const noHay = `No hay ${nombre_plural}`;
  const buscar = `Buscar ${nombre}`;

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setElementoSelected(pendingValue);
    //console.log("pendingValue", pendingValue);
    //setPendingValue({});
    setOpen(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 40,
    stringify: (option) => {
      let filtOp = "";
      camposBuscar.forEach((campo, i) => {
        if (option[campo]) {
          filtOp += option[campo];
          filtOp += " - ";
        }
      });
      if (filtOp.length >= 3) {
      }
      return filtOp.length >= 3
        ? filtOp.substring(0, filtOp.length - 3)
        : filtOp;
    },
  });

  const nombreElemento = (option) => {
    let nombre = "";
    campos.forEach((campo, i) => {
      if (option[campo]) {
        nombre += option[campo];
        nombre += " - ";
      }
    });
    return nombre.length >= 3 ? nombre.substring(0, nombre.length - 3) : nombre;
  };

  return (
    <>
      <div className="rootElemento">
        <div className="completeWrapper">
          <Autocomplete
            openOnFocus
            autoHighlight
            disableCloseOnSelect
            open={open}
            value={pendingValue}
            filterOptions={filterOptions}
            noOptionsText={noHay}
            classes={{
              paper: "paper",
              option: "optionElemento",
              popper: "popper",
            }}
            onOpen={() => {
              setPendingValue(elementoSeleceted);
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
                open ? handleClose() : (() => { })();
                setOpen(!open);
              }
            }}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            getOptionLabel={(option) => {
              //console.log("pendingValue", pendingValue);
              if (option) {
                return nombreElemento(option);
              } else {
                return "";
              }
            }}
            options={[...elementos].sort((a, b) => {
              let ai = (a == elementoSeleceted) ;
              let bi = (b == elementoSeleceted) ;
              return ai ? -1 : bi ? 1 : 0;
            })}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className="nombreElemento">
                  <span>{nombreElemento(option)}</span>
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
                // autoFocus
                className="inputElemento"
                placeholder={buscar}
              />
            )}
          ></Autocomplete>
        </div>
      </div>
    </>
  );
}
