import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;

  if (!equiposSels || !equiposSels.nombreEquipo) {
    return <></>;
  } else {
    return (
      <div id="BodegaOrdenDetailWrapper">
        <CloseIcon
          className="closeIcon"
          onClick={() => {
            setEquiposSels({});
          }}
        />
        <div className="bodegaHeader">
          <p>{equiposSels.nombreEquipo} </p>
        </div>
        <div className="descripcionBodega">
          <p>{equiposSels.nombreGrupo}</p>
        </div>
      </div>
    );
  }
}

export default EquipoDetail;
