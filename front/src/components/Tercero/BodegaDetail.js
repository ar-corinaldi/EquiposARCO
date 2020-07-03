import React from "react";
import { Link } from "react-router-dom";

function BodegaDetail(props) {
  const bodega = props.bodega;
  const tercero = props.tercero;

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  return (
    <div className="bodega-cliente">
      <p>
        <strong> Nombre : </strong>
        {capitalize(bodega.nombreBodega || "")}
      </p>
      <p>
        <strong> Dirección : </strong>
        {capitalize(
          (bodega.direccionBodega || "") +
            " " +
            (bodega.municipio || "") +
            ", " +
            (bodega.departamento || "") +
            ", " +
            (bodega.pais || "")
        )}
      </p>
      <p>
        <strong> Teléfono : </strong>
        {bodega.telefono}
      </p>
      <p>
        <strong> Órdenes en curso : </strong>
      </p>
      {bodega.ordenesActuales.map((orden) => (
        <p key={orden._id}>
          <Link
            to={
              "/terceros/" +
              tercero._id +
              "/bodegas/" +
              bodega._id +
              "/ordenes/" +
              orden._id
            }
          >
            {orden._id}
          </Link>
        </p>
      ))}
      <p>
        <strong> Órdenes finalizadas : </strong>
      </p>
      {bodega.ordenesPasadas.map((orden) => (
        <p key={orden._id}>
          <Link
            to={
              "/terceros/" +
              tercero._id +
              "/bodegas/" +
              bodega._id +
              "/ordenes/" +
              orden._id
            }
          >
            {orden._id}
          </Link>
        </p>
      ))}
    </div>
  );
}

export default BodegaDetail;
