/* eslint-disable no-use-before-define */
import React from "react";
import "./EscogerBodega.css";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles((theme) => ({
  inputBase: {
    "& input": {
      borderRadius: 0,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent",
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  popperDisablePortal: {
    position: "relative",
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
  },
}));


export default function EscogerBodega(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
  const [bodegas, setBodegas] = props.bodegas;
  const [value, setValue] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);

  const classes = useStyles();

  const handleClick = (event) => {
    setPendingValue(bodegaSeleccionada);
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
    
    
  };

  const handleChange = (event, value) =>{
    console.log('====================================');
    console.log(value);
    console.log('====================================');
    setBodegaSeleccionada(value);
  }

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setBodegaSeleccionada(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.nombreBodega + option.direccionBodega + option.municipio + 
    option.pais + option.telefono + option.departamento
  });

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    <>
      <div className="rootBodega">
        {/* <ButtonBase
          disableRipple
          className="buttonBodega"
          aria-describedby={id}
          onClick={handleClick}
        >
          <span>Escoja bodega destino</span>
        </ButtonBase> */}
        <h5>Escoja la bodega destino</h5>
        {/* <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          className="popperBodega"
        > */}
        <div className="completeWrapper" >
          <Autocomplete
            onClose={handleClose}
            className = "paper"
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal,
            }}
            value={pendingValue}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            disableCloseOnSelect
            disablePortal
            filterOptions={filterOptions} 
            noOptionsText="No hay bodegas"
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <DoneIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
                <div className="nombreBodega">
                  <span>{option.nombreBodega}</span>
                  <br />
                  <span className="bodegaDescripcion">{option.municipio + ", " + option.pais + ". " + option.direccionBodega}</span>
                </div>
                <CloseIcon
                  onClick={()=>{setPendingValue(null)}}
                  className= "close"
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
              </React.Fragment>
            )}
            options={[...bodegas].sort((a, b) => {
              // Muestra la bodega seleccionada primero y solo las 5 primeras 
              let ai = a==bodegaSeleccionada;
              let bi = b==bodegaSeleccionada;
              return (ai? -1: (bi? 1: 0));
            }).slice(0,5)}
            getOptionLabel={(option) => 
              option.nombreBodega 
            }
            renderInput={(params) => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase + " inputBodega"}
                placeholder="Buscar bodega"
              />
            )}
          ></Autocomplete>
          </div>
        {/* </Popper> */}
      </div>
    </>
  );
}
