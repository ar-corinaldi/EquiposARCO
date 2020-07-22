import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";
import { FaPlusCircle } from "react-icons/fa";
import {
  formatoCategoriaHTML,
  formatoTiempo,
} from "../utils/FormatoInfoPrecios";

/* Compara dos tarifas con base a su fecha de fin. Ordena las mas recientes primero
 * @param {*} a
 * @param {*} b
 */
function recientePrimero(a, b) {
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
  const [open, setOpen] = useState(false);

  const toggle = () => {
    //console.log(open);
    setOpen(!open);
  };

  // const tarifasEquipo = props.tarifasPorEquipo;
  // //console.log("tarifasPorEquipo", tarifasEquipo);
  // tarifasEquipo.sort(recientePrimero);
  // const tarifaM = tarifasEquipo[0];
  // const otrasTarifas = Array.from(tarifasEquipo);
  // otrasTarifas.shift();

  const index = props.index + 1;

  const equipo = props.equipo;

  return (
    <React.Fragment>
      <tr className="capitalize">
        <td>
          {index}
          {/* <br />
          <button className="button-icon green" onClick={toggle}>
            <FaPlusCircle></FaPlusCircle>
          </button> */}
        </td>
        <td>
          <Link to={`/inventario/equipos/${equipo._id}`}>
            <b>{equipo.nombreEquipo}</b>
            <br />
            {equipo.nombreGrupo}
          </Link>
        </td>
        <td>{equipo.cantidadOr}</td>
        <td>{equipo.enviado}</td>
        <td>{equipo.devuelto}</td>
        <td>{equipo.porEnviar}</td>
        <td>{equipo.porDevolver}</td>

        <td>{formatoPrecios(equipo.equipoTarifa.valorTarifa)}</td>
        <td>
          <span
            className={
              (equipo.equipoTarifa.precioReferencia.categoria.includes("metro")
                ? "not-"
                : "") + "capitalize"
            }
          >
            {formatoCategoriaHTML(
              equipo.equipoTarifa.precioReferencia.categoria,
              false
            )}
          </span>{" "}
          / {formatoTiempo(equipo.equipoTarifa.precioReferencia.tiempo, false)}
        </td>
        <td>
          {formatoFechas(equipo.equipoTarifa.fechaInicio)}-
          {formatoFechas(equipo.equipoTarifa.fechaFin)}
        </td>
      </tr>
      {/* Se muestran las otras tarifas del equipo */}
      {/* {otrasTarifas &&
        otrasTarifas.map((tarifa2, index2) => (
          <tr
            key={tarifa2._id}
            className={"capitalize collapse" + (open ? " in" : "")}
          >
            <td>{""}</td>
            <td>
              <Link to={`/inventario/equipos/${tarifa2.equipo._id}`}>
                <b>{tarifa2 && tarifa2.equipo.nombreEquipo}</b>
                <br />
                {tarifa2 && tarifa2.equipo.nombreGrupo}
              </Link>
            </td>
            <td>{tarifa2.cantidad}</td>
            <td>{tarifa2.cantidad}</td>
            <td>{tarifa2.cantidad}</td>

            <td>{formatoPrecios(tarifa2.valorTarifa)}</td>
            <td>
              <span
                className={
                  (tarifa2.precioReferencia.categoria.includes("metro")
                    ? "not-"
                    : "") + "capitalize"
                }
              >
                {formatoCategoriaHTML(
                  tarifa2.precioReferencia.categoria,
                  false
                )}
              </span>{" "}
              / {formatoTiempo(tarifa2.precioReferencia.tiempo, false)}{" "}
            </td>
            <td>
              {formatoFechas(tarifa2.fechaInicio)}-
              {formatoFechas(tarifa2.fechaFin)}
            </td>
          </tr> 
        ))}*/}
    </React.Fragment>
  );
}

export default EquipoRow;
