import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const equipoRender = props.equipoRender;

  if (!equipoRender || !equipoRender.nombreEquipo) {
    return <></>;
  } else {
    return (
      <div id="BodegaOrdenDetailWrapper">
        <CloseIcon
          className="closeIcon"
          onClick={() => {
            equiposSels.splice(equiposSels.indexOf(equipoRender));
            setEquiposSels(
              equiposSels.splice(equiposSels.indexOf(equipoRender))
            );
          }}
        />
        <div className="bodegaHeader">
          <p>{equipoRender.nombreEquipo} </p>
        </div>
        <div className="descripcionBodega">
          <p>{equipoRender.nombreGrupo}</p>
        </div>
      </div>
    );
  }
}

export default EquipoDetail;
