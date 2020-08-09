import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";
import { FaChevronDown, FaChevronUp, FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
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
  const opcion = props.opcion;
  const [open, setOpen] = useState(false);
  const index = props.index + 1;

  if (opcion === 1) {
    // Organizacion de tarifas
    const tarifasEquipo = props.tarifasPorEquipo;
    tarifasEquipo.sort(recientePrimero);
    const tarifaM = tarifasEquipo[0];
    const otrasTarifas = Array.from(tarifasEquipo);
    otrasTarifas.shift();

    const toggle = () => {
      //console.log(open);
      setOpen(!open);
    };

    return (
      <React.Fragment>
        <tr className="capitalize">
          <td>
            {index}
            <br />
            <br />
            {otrasTarifas.length > 0 ? (
              <button className="button-icon" onClick={toggle}>
                {open ? (
                  <FaChevronUp className="icono" />
                ) : (
                  <FaChevronDown className="icono" />
                )}
              </button>
            ) : (
              <></>
            )}
          </td>
          <td>
            <Link to={`/inventario/equipos/${tarifaM.equipo._id}`}>
              <b>{tarifaM && tarifaM.equipo.nombreEquipo}</b>
              <br />
              {tarifaM && tarifaM.equipo.nombreGrupo}
            </Link>
          </td>
          <td>{tarifaM.cantidad}</td>
          <td>{formatoPrecios(tarifaM.valorTarifa)}</td>
          <td>
            {tarifaM.precioReferencia.categoria} /{" "}
            {tarifaM.precioReferencia.tiempo}
          </td>
          <td>
            {formatoFechas(tarifaM.fechaInicio)}-
            {formatoFechas(tarifaM.fechaFin)}
          </td>
        </tr>
        {/* Se muestran las otras tarifas del equipo */}
        {otrasTarifas &&
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
              <td>{formatoPrecios(tarifa2.valorTarifa)}</td>
              <td>
                {tarifa2.precioReferencia.categoria} /{" "}
                {tarifa2.precioReferencia.tiempo}
              </td>
              <td>
                {formatoFechas(tarifa2.fechaInicio)}-
                {formatoFechas(tarifa2.fechaFin)}
              </td>
            </tr>
          ))}
      </React.Fragment>
    );
  } else {
    const equipo = props.equipo;
    return (
      <React.Fragment>
        <tbody className="vert-center">
          <tr className="capitalize">
            <td>{index}</td>
            <td>
              <Link to={`/inventario/equipos/${equipo._id}`}>
                <b>{equipo.nombreEquipo}</b>
                <br />
                {equipo.nombreGrupo}
              </Link>
            </td>
            <td className="text-center">{equipo.cantidadOr}</td>
            <td className="text-center">{equipo.enviado}</td>
            <td className="text-center">{equipo.devuelto}</td>
            <td className="text-center">{equipo.porEnviar}</td>
            <td className="text-center">{equipo.porDevolver}</td>
            <td className="text-center">
              {equipo.cantidadOr === equipo.devuelto ? (
                <FaRegCheckCircle className="green" />
              ) : (
                <RiErrorWarningLine className="red" />
              )}
            </td>

            {/* <td>{formatoPrecios(equipo.equipoTarifa.valorTarifa)}</td>
          <td>
            <span
              className={
                (equipo.equipoTarifa.precioReferencia.categoria.includes(
                  "metro"
                )
                  ? "not-"
                  : "") + "capitalize"
              }
            >
              {formatoCategoriaHTML(
                equipo.equipoTarifa.precioReferencia.categoria,
                false
              )}
            </span>{" "}
            /{" "}
            {formatoTiempo(equipo.equipoTarifa.precioReferencia.tiempo, false)}
          </td>
          <td>
            {formatoFechas(equipo.equipoTarifa.fechaInicio)}-
            {formatoFechas(equipo.equipoTarifa.fechaFin)}
          </td> */}
          </tr>
          {/* Se muestran los equipos compuestos del equipo */}
          {equipo.componentes &&
            equipo.componentes.map((componente, index2) => (
              <tr
                key={componente.equipoID._id}
                className={"capitalize collapse" + (open ? " in" : "")}
              >
                <td>{+index2 + 1}</td>
                <td>
                  <Link to={`/inventario/equipos/${componente.equipoID._id}`}>
                    <b>{componente.equipoID.nombreEquipo}</b>
                    {/* <br />
                {componente.equipoID.nombreGrupo} */}
                  </Link>
                </td>
                <td className="text-center">
                  {componente.equipoID.cantidadOr}
                </td>
                <td className="text-center">{componente.equipoID.enviado}</td>
                <td className="text-center">{componente.equipoID.devuelto}</td>
                <td className="text-center">{componente.equipoID.porEnviar}</td>
                <td className="text-center">
                  {componente.equipoID.porDevolver}
                </td>
                <td className="text-center">
                  {componente.equipoID.cantidadOr ===
                  componente.equipoID.devuelto ? (
                    <FaRegCheckCircle />
                  ) : (
                    <RiErrorWarningLine />
                  )}
                </td>

                {/* <td> - </td>
              <td> - </td>
              <td> - </td> */}
              </tr>
            ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default EquipoRow;
