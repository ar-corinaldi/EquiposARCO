import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatoFechas from "../../utils/FormatoFechas";
import formatoPrecios from "../../utils/FormatoPrecios";
import { FaChevronDown, FaChevronUp, FaRegCheckCircle } from "react-icons/fa";

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

function TarifaRow(props) {
  const [open, setOpen] = useState(false);

  const index = props.index + 1;

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
          {formatoFechas(tarifaM.fechaInicio)}-{formatoFechas(tarifaM.fechaFin)}
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
}

export default TarifaRow;
