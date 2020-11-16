import React, { useRef } from "react";
import EditField from "../../EditField";
function EquipoDetailBadge({equipo, handleChange,...props}) {
  const cantidadTotal = useRef();
  const cantidadBodega = useRef();
  return (
    <React.Fragment>
      <h5>
        <span className="badge badge-success">
          Total de Equipo: {props.cantidadTotal}
          <EditField value={equipo} name="cantidadTotal" reference={cantidadTotal} handleChange={handleChange}/>
        </span>
      </h5>
      <h5>
        <span className="badge badge-info">
          En Bodega: 
          <EditField value={equipo} name="cantidadBodega" reference={cantidadBodega} handleChange={handleChange}/>
        </span>
      </h5>
      <h5>
        <span className="badge badge-warning">
          Alquilado/Vendido: {props.cantidadUsado}
        </span>
      </h5>
    </React.Fragment>
  );
}

export default EquipoDetailBadge;
