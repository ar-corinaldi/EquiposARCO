import React from "react";
import { Link } from "react-router-dom";

function EquipoRow(props) {
  const tarifa = props.tarifa;
  return (
    <tr className="capitalize">
      <td>1</td>
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
        {tarifa.precioReferencia.categoria}/{tarifa.precioReferencia.tiempo}
      </td>
      <td>Falta </td>
    </tr>
  );
}

export default EquipoRow;
