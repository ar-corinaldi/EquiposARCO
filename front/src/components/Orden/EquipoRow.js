import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
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
      <tbody className="vert-center">
        <tr className="capitalize">
          <td>
            {index}
            <br />
            {equipo.componentes && equipo.componentes.length > 0 ? (
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
            <Link to={`/inventario/equipos/${equipo._id}`}>
              <b>{equipo.nombreEquipo}</b>
              {/* <br />
            {equipo.nombreGrupo} */}
            </Link>
          </td>
          <td className="text-center">{equipo.cantidadOr}</td>
          <td className="text-center">{equipo.enviado}</td>
          <td className="text-center">{equipo.devuelto}</td>
          <td className="text-center">{equipo.porEnviar}</td>
          <td className="text-center">{equipo.porDevolver}</td>

          <td>{formatoPrecios(equipo.equipoTarifa.valorTarifa)}</td>
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
          </td>
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
              <td className="text-center">{componente.equipoID.cantidadOr}</td>
              <td className="text-center">{componente.equipoID.enviado}</td>
              <td className="text-center">{componente.equipoID.devuelto}</td>
              <td className="text-center">{componente.equipoID.porEnviar}</td>
              <td className="text-center">{componente.equipoID.porDevolver}</td>

              <td> - </td>
              <td> - </td>
              <td> - </td>
            </tr>
          ))}
      </tbody>
    </React.Fragment>
  );
}

export default EquipoRow;
