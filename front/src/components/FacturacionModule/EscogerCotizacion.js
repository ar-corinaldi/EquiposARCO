import "./EscogerCotizacion.css";
import React, { useState, useEffect } from "react";

function EscogerCotizacion(params) {
  const miEstado = params.estadoStepOne;
  const setMiEstado = params.setEstadoStepOne;

  const [cotizaciones, setCotizaciones] = useState([]);
  const [bodegaDestino, setBodega] = useState({});

  useEffect( ()=>{
      async function fetchCotizaciones(params) {
        const cotizacionesBack =await (await fetch("/cotizaciones")).json();
        console.log(cotizacionesBack);
        setCotizaciones(cotizacionesBack);
      }
      fetchCotizaciones();
      
  }, []);

  function changeEstado(params) {
    setMiEstado("complete");
  }
  return <div className={"escoger-cotizacion-wrapper " + (miEstado === "active" ? "show" : "hide")}>
      {miEstado}
      <ul>
          {cotizaciones.map((item, index)=>{
              return (
              <li key={index} > 
                  {"Cotización con número de contrato: "+ item.numeroContrato}
                  <ul>
                      {item.tarifasCotizadas.map((item,index) => {
                          return <li key={index} >{"Tarifa detail colapsable de tarifa con id: "+ item}</li>
                      })}
                  </ul>
              </li>
              )
          })}
      </ul>

      
      <button type="button" onClick={changeEstado} >
          Botoncito
      </button>
      </div>;
}

export default EscogerCotizacion;
