import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const equipoRender = props.equipoRender;
  const eliminarEquipoSelect = props.eliminarEquipoSelect;

  if (!equipoRender || !equipoRender.nombreEquipo) {
    return <></>;
  } else {
    return (
      <React.Fragment>
        <tr className="capitalize">
          <td>
            <b>{equipoRender.nombreEquipo}</b>
            <br />
            {equipoRender.nombreGrupo}
          </td>
          <td>Cantidad</td>
          <td>
            <CloseIcon
              className="closeIcon"
              onClick={() => {
                eliminarEquipoSelect(equipoRender);
              }}
            />
          </td>
        </tr>
      </React.Fragment>
      //   <div id="BodegaOrdenDetailWrapper">
      //     <CloseIcon
      //       className="closeIcon"
      //       onClick={() => {
      //         eliminarEquipoSelect(equipoRender);
      //       }}
      //     />
      //     <div className="bodegaHeader">
      //       <p>{equipoRender.nombreEquipo} </p>
      //     </div>
      //     <div className="descripcionBodega">
      //       <p>{equipoRender.nombreGrupo}</p>
      //     </div>
      //   </div>
    );
  }
}

export default EquipoDetail;
