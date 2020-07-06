import React from "react";
import { Link } from "react-router-dom";

const formatDate = (fecha) => {
  if (fecha) {
    const date = new Date(fecha);
    return `${date.getDate()}/${(
      date.getMonth() + 1
    ).toString()}/${date.getFullYear()}`;
  }
};

function EquipoRow(props) {
  const tarifa = props.tarifa;
  const index = props.index + 1;
  return (
    <tr className="capitalize">
      <td>{index}</td>
      <td>
        <Link to={`/inventario/equipos/${tarifa.equipo._id}`}>
          <b>{tarifa && tarifa.equipo.nombreEquipo}</b>
          <br />
          {tarifa && tarifa.equipo.nombreGrupo}
        </Link>
      </td>
      <td>{tarifa.cantidad}</td>
      <td>${tarifa.valorTarifa}</td>
      <td>
        {tarifa.precioReferencia.categoria} / {tarifa.precioReferencia.tiempo}
      </td>
      <td>
        {formatDate(tarifa.fechaInicio)}-{formatDate(tarifa.fechaFin)}{" "}
      </td>
    </tr>
  );
}

export default EquipoRow;
