import React from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

function compareTarifasByDate(a, b) {
  const fechaFinA = new Date(a.fechaFin);

  const fechaFinB = new Date(b.fechaFin);
  if (fechaFinA.getTime() < fechaFinB.getTime()) {
    return 1;
  }
  if (fechaFinA.getTime() > fechaFinB.getTime()) {
    return -1;
  }
  return 0;
}

function EquipoRow(props) {
  // const tarifa = props.tarifa;
  const tarifas = props.tarifaComp;
  const ordenadas = tarifas.sort(compareTarifasByDate);
  const index = props.index + 1;
  const tarifa = ordenadas[0];
  ordenadas.splice(0, 1);
  const otrasTarifas = Array.from(ordenadas);
  console.log("otrasTarifas", otrasTarifas);

  return (
    <React.Fragment>
      {/* Se muestra la Tarifa mas Reciente
       */}
      <tr className="capitalize" key={tarifa._id}>
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
          {formatoFechas(tarifa.fechaInicio)}-{formatoFechas(tarifa.fechaFin)}
        </td>
        <td>Falta </td>
      </tr>
      {/* Se muestran las otras tarifas del equipo
       */}
      {otrasTarifas &&
        otrasTarifas.map((tarifa, index2) => (
          <tr className="capitalize" key={tarifa._id}>
            <td>{index + index2 + 1}</td>
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
              {tarifa.precioReferencia.categoria} /{" "}
              {tarifa.precioReferencia.tiempo}
            </td>
            <td>
              {formatoFechas(tarifa.fechaInicio)}-
              {formatoFechas(tarifa.fechaFin)}
            </td>
            <td>Falta </td>
          </tr>
        ))}
    </React.Fragment>
  );
}

export default EquipoRow;
