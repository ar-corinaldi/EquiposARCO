import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const equipoRender = props.equipoRender;
  const eliminarEquipoSelect = props.eliminarEquipoSelect;
  const [cantidad, setCantidad] = useState(equipoRender.cantidad);

  const handleCantidad = (e) => {
    const target = e.target;
    setCantidad(target.value);
    equipoRender.cantidad = target.value;
  };

  return (
    <React.Fragment>
      <tr className="capitalize">
        <td>
          <b>{equipoRender.equipoID.nombreEquipo}</b>
          <br />
          {equipoRender.equipoID.nombreGrupo}
        </td>
        <td>
          <input
            type="number"
            min="1"
            value={equipoRender.cantidad}
            className="form-control w90"
            placeholder="cant."
            onChange={handleCantidad}
          ></input>
        </td>
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

export default EquipoDetail;
