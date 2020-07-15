import React, { useState } from "react";
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
  const [elementoSelected, setElementoSelected] = props.elementoSelected;
  const [elementos, setElementos] = props.elementos;
  const [pendingValue, setPendingValue] = React.useState({});
  const [open, setOpen] = useState(false);

  const noHay = "No hay " + nombre_plural;
  const buscar = "Buscar " + nombre;

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setElementoSelected(pendingValue);
    setPendingValue({});
    setOpen(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 15,
    stringify: (option) => option.modelo + option.placa,
  });

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
              if (option && option.modelo && option.placa) {
                return option.modelo && option.placa;
              } else {
                return "";
              }
            }}
            options={[...elementos]}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className="nombreElemento">
                  <span>{option.modelo + " - " + option.placa}</span>
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
                autoFocus
                className="inputElemento"
                placeholder="Buscar "
              />
            )}
          ></Autocomplete>
        </div>
      </div>
    </>
  );
}
