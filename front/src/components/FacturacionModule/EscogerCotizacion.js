import "./EscogerCotizacion.css";
import React, { useState } from "react";

function EscogerCotizacion(params) {
  const miEstado = params.miEstado;
  const setMiEstado = params.setMiEstado;

  function changeEstado(params) {
    setMiEstado("complete");
  }
  return <div className={"escoger-cotizacion-wrapper " + (miEstado === "active" ? "show" : "hide")}>
      {miEstado}
      <button type="button" onClick={changeEstado} >
          Botoncito
      </button>
      </div>;
}

export default EscogerCotizacion;
