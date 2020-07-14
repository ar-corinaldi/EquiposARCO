import React, { useState, useEffect } from "react";
import "./BodegaOrdenDetail.css";
import holiday from "../../utils/CacularTarifas";
import CloseIcon from "@material-ui/icons/Close";

function BodegaOrdenDetail(props) {
  const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;

  holiday();

  if (!bodegaSeleccionada || !bodegaSeleccionada.nombreBodega) {
    return <></>;
  } else {
    return (
      <div id="BodegaOrdenDetailWrapper">
        <CloseIcon
          className="closeIcon"
          onClick={() => {
            setBodegaSeleccionada({});
          }}
        />
        <div className="bodegaHeader">
          <h2>
            {(bodegaSeleccionada.duenio
              ? bodegaSeleccionada.duenio.nombre + " - "
              : "") + bodegaSeleccionada.nombreBodega}{" "}
          </h2>
        </div>
        <div className="descripcionBodega">
          <p>
            {bodegaSeleccionada.municipio +
              (bodegaSeleccionada.departamento
                ? ", " + bodegaSeleccionada.departamento
                : "") +
              ", " +
              bodegaSeleccionada.pais +
              "."}
          </p>
          <p className="direccionBodega">
            {bodegaSeleccionada.direccionBodega}
          </p>
        </div>
      </div>
    );
  }
}

export default BodegaOrdenDetail;
