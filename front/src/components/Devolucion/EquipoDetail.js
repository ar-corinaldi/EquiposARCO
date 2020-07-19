import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const equipoRender = props.equipoRender;
  const [cantidad, setCantidad] = useState(equipoRender.cantidad);
  let peso = 0;

  equipoRender.equipoID.propiedades.forEach((propiedad) => {
    if (propiedad.nombre === "peso") {
      peso = propiedad.valor;
    }
  });

  const handleCantidad = (e) => {
    const target = e.target;
    setCantidad(target.value);
    equipoRender.cantidad = target.value;
  };

  const handleRemoveEquipo = (e, equipo) => {
    e.preventDefault();
    //console.log("equiposSels", equiposSels);
    const currentIndex = equiposSels.indexOf(equipo);
    setEquiposSels((prev) =>
      prev.filter((prev, index) => currentIndex !== index)
    );
    //console.log("equiposSels", equiposSels);
  };

  return (
    <React.Fragment>
      <tr className="capitalize">
        <td>
          <b>{equipoRender.equipoID.nombreEquipo}</b>
          <br />
          {equipoRender.equipoID.tipoEquipo}
        </td>
        <td>{equipoRender.equipoID.nombreFamilia}</td>
        <td>{peso}</td>
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
            onClick={(e) => handleRemoveEquipo(e, equipoRender)}
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
