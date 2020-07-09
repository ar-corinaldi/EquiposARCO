import "./EscogerCotizacion.css";
import React, { useState, useEffect } from "react";
import EscogerBodega from "./EscogerBodega";
import BodegaOrdenDetail from "./BodegaOrdenDetail";
import EscogerCotizacionDetail from "./EscogerCotizacionDetail";
import CotizacionDetailTable from "./CotizacionDetailTable";
function EscogerCotizacion(params) {
  const [miEstado, setMiEstado] = params.miEstado;
  const [segundoEstado, setSegundoEstado] = params.segundoEstado;

  const [bodegaSeleccionada, setBodegaSeleccionada] = useState({});
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState({});
  const [bodegas, setBodegas] = useState([]);
  const [terceros, setTerceros] = useState([]);

  function verificarSeleccion() {
    if (bodegaSeleccionada && cotizacionSeleccionada && bodegaSeleccionada._id && cotizacionSeleccionada._id) {
      setMiEstado("complete");
      setSegundoEstado("active");

    }
  }

  function estadoBotonConfirmacion() {
    if (bodegaSeleccionada && cotizacionSeleccionada && bodegaSeleccionada._id && cotizacionSeleccionada._id) {
      return false;
    }
    else {
      return true;
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
      <CotizacionDetailTable cotizacionSeleccionada={[cotizacionSeleccionada, setCotizacionSeleccionada]}>
      </CotizacionDetailTable>
      <button type="button" onClick={verificarSeleccion} className="buttonEnabled" disabled={estadoBotonConfirmacion()} >
        Confirmar seleccion
      </button>
    </div>
  );
}

export default EscogerCotizacion;
