import React, { useState, useEffect } from "react";
import "./BodegaOrdenDetail.css";
import holiday from '../utils/CacularTarifas'

function BodegaOrdenDetail(props) {
  const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;

  holiday();

  if (!bodegaSeleccionada || !bodegaSeleccionada.nombreBodega) {
    return <></>;
  } else {
    return (
      <div id="BodegaOrdenDetailWrapper">
        <div className="bodegaHeader">
          <h2>{bodegaSeleccionada.nombreBodega} </h2>
        </div>
        <div className="descripcionBodega">
          <p>{bodegaSeleccionada.municipio + ( bodegaSeleccionada.departamento? ", "+ bodegaSeleccionada.departamento : "")
          + ", "+bodegaSeleccionada.pais + "."}</p>
          <p className="direccionBodega" >{bodegaSeleccionada.direccionBodega}</p>
        </div>
      </div>
    );
  }
}

export default BodegaOrdenDetail;
