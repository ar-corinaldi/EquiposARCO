import React from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

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
      <td>{formatoPrecios(tarifa.valorTarifa)}</td>
      <td>
        {tarifa.precioReferencia.categoria} / {tarifa.precioReferencia.tiempo}
      </td>
      <td>
        {formatoFechas(tarifa.fechaInicio)}-{formatoFechas(tarifa.fechaFin)}{" "}
      </td>
    </tr>
  );
}

export default EquipoRow;
