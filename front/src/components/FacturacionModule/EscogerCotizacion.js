import "./EscogerCotizacion.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import EscogerBodega from "./EscogerBodega";
import BodegaOrdenDetail from "./BodegaOrdenDetail";
import EscogerCotizacionDetail from "./EscogerCotizacionDetail";
import CotizacionDetailTable from "./CotizacionDetailTable";
function EscogerCotizacion(params) {
  const miEstado = params.estadoStepOne;
  const setMiEstado = params.setEstadoStepOne;

  const [bodegaSeleccionada, setBodegaSeleccionada] = useState({});
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState({});
  const [bodegas, setBodegas] = useState([]);
  const [terceros, setTerceros] = useState([]);

  function verificarSeleccion() {
    if(bodegaSeleccionada._id && cotizacionSeleccionada._id){
      setMiEstado("complete");  
    }
  }


  useEffect(() => {
    async function fetchBodegas() {
      const bodegasBack = await (await fetch("/bodegas")).json();
      const tercerosBack = await (await fetch("/terceros/bodegas")).json();
      setBodegas(bodegasBack);
      setTerceros(tercerosBack);
      // console.log(bodegas);
    }
    fetchBodegas();
    // console.log(bodegas);
    // console.log(terceros);
  }, []);
  return (
    <div
      className={
        "escoger-cotizacion-wrapper " +
        (miEstado === "active" ? "show" : "hide")
      }
    >
      {/* {miEstado} */}
      <EscogerBodega
        bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
        bodegas={[bodegas, setBodegas]}
        terceros={[terceros, setTerceros]}
      />
      <BodegaOrdenDetail
        bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
      ></BodegaOrdenDetail>
      <hr></hr>
      <EscogerCotizacionDetail
        bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
        cotizacionSeleccionada={[cotizacionSeleccionada, setCotizacionSeleccionada]}
      />
      <h5>{"Id cotización seleccionada: " + cotizacionSeleccionada._id}</h5>
      <CotizacionDetailTable cotizacionSeleccionada={[cotizacionSeleccionada, setCotizacionSeleccionada]}>
      </CotizacionDetailTable>
      <Button type="button" onClick={verificarSeleccion}>
        Confirmar seleccion
      </Button>
    </div>
  );
}

export default EscogerCotizacion;
