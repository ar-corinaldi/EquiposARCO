/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import "./EscogerBodega.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  inputBase: {
    "& input": {
      color: "#6c757d",
      fontFamily: "Karla",
      fontWeight: 700,
      textTransform: "capitalize",
      borderRadius: 0,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontSize: 15,
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
    width: 24,
    height: 24,
    marginRight: 17,
    marginLeft: -2,
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
    }
  },
}));


export default function EscogerBodega(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
  const [bodegas, setBodegas] = props.bodegas;
  const [terceros, setTerceros] = props.terceros;
  const [pendingValue, setPendingValue] = React.useState([]);
  const [open, setOpen] = useState(false);

  console.log('====================================');
  console.log(terceros  );
  console.log('====================================');
  let bodegasPrueba = [];
   
  terceros.map((tercero) => {
    tercero.bodegas.map((bodega) => {
      
      bodega.duenio = {bodegas, ...tercero};
      bodegasPrueba.push(bodega);
    })
  })
  console.log("Bodegas");
  
  console.log(bodegasPrueba);
  


  

  const classes = useStyles();

  // const handleClick = (event) => {
  //   setPendingValue(bodegaSeleccionada);
  //   setAnchorEl(event.currentTarget);
  //   console.log(event.currentTarget);
    
    
  // };

  // const handleChange = (event, value) =>{
  //   setBodegaSeleccionada(value);
  // }

  const handleClose = (event, reason) => {
    if (reason === "toggleInput") {
      return;
    }
    setBodegaSeleccionada(pendingValue);
    setOpen(false)
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

  // let open = false;
  // const id = open ? "github-label" : undefined;

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
        <h4>Escoja la bodega destino</h4>
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
            open = { open}
            onFocus = {()=>{setOpen(true)}}
            onBlur = { ()=>{setOpen(false)}}
            onInputChange = {()=>{setOpen(true)}}
            onKeyPress = {(e)=>
              { 
                if(e.key === 'Enter'){
                  open? handleClose(): (()=>{})(); 
                  setOpen(!open); 
                  }
              }
            }
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
            openOnFocus
            disableCloseOnSelect
            disablePortal
            filterOptions={filterOptions} 
            noOptionsText="No hay bodegas"
            renderOption={(option, { selected }) => (
              <React.Fragment >
                {/* <DoneIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                /> */}
                <div className="nombreBodega">
                  <span>{option.nombreBodega}</span>
                  <br />
                  <span className="bodegaDescripcion">{option.municipio + ", " + option.pais + ". " + option.direccionBodega}</span>
                </div>
                <DoneIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                  onClick = {()=>{handleClose(); setOpen(false)}}
                />
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
