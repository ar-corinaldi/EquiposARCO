import React from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";
import {
  formatoCategoriaHTML,
  formatoTiempo,
} from "../utils/FormatoInfoPrecios";

function EquipoRow(props) {
  const tarifa = props.tarifa;
  const index = props.index + 1;
  const calculoTarifa = props.calculoTarifa;
  console.log("tarifa", tarifa._id);
  console.log("calculoTarifa", calculoTarifa);

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
      <td>
        <span
          className={
            (tarifa.precioReferencia.categoria.includes("metro")
              ? "not-"
              : "") + "capitalize"
          }
        >
          {formatoCategoriaHTML(tarifa.precioReferencia.categoria, false)}
        </span>{" "}
        / {formatoTiempo(tarifa.precioReferencia.tiempo, false)}{" "}
      </td>
      <td>{formatoPrecios(tarifa.valorTarifa)}</td>
      <td className="not-capitalize">
        {calculoTarifa
          ? calculoTarifa.tiempoTotal +
            " " +
            formatoTiempo(tarifa.precioReferencia.tiempo, true)
          : " "}
      </td>
      <td>
        {formatoFechas(tarifa.fechaInicio)}-{formatoFechas(tarifa.fechaFin)}{" "}
      </td>
      <td>{formatoPrecios(calculoTarifa && calculoTarifa.cobroTotal)}</td>
    </tr>
  );
}

export default EquipoRow;
