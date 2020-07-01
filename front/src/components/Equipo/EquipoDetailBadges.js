import React from "react";

function EquipoDetailBadge(props) {
  return (
    <React.Fragment>
      <h5>
        <span className="badge badge-success">
          Total de Equipo: {props.cantidadTotal}
        </span>
      </h5>
      <h5>
        <span className="badge badge-info">
          En Bodega: {props.cantidadBodega}
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
