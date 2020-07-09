import React, { useState } from "react";
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
  const tarifa = props.tarifa;
  const index = props.index + 1;
  // const tarifas = props.tarifaComp;
  // const ordenadas = tarifas.sort(compareTarifasByDate);
  // const tarifa = ordenadas[0];
  // const otrasTarifas = [];
  // for (let i = 1; i < ordenadas.length; i++) {
  //   otrasTarifas.push(ordenadas[i]);
  // }
  //console.log("otrasTarifas", otrasTarifas);

  //const [open, setOpen] = useState(false);

  // const toggle = () => {
  //   //console.log(open);
  //   setOpen(!open);
  // };

  return (
    <React.Fragment>
      {/* Se muestra la Tarifa mas Reciente
       */}
      <tbody>
        <tr className="capitalize" key={tarifa._id}>
          <td>
            {index}
            <br />
            {/* <button className="btn-info" onClick={toggle}>
              +
            </button> */}
          </td>
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
            {formatoFechas(tarifa.fechaInicio)}-{formatoFechas(tarifa.fechaFin)}
          </td>
          <td>Falta </td>
        </tr>
      </tbody>
      {/* Se muestran las otras tarifas del equipo
       
      <tbody className={"capitalize collapse" + (open ? " in" : "")}>
        {otrasTarifas &&
          otrasTarifas.map((tarifa2, index2) => (
            <tr key={tarifa2._id}>
              <td>{index + index2 + 1}</td>
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
              <td>Falta </td>
            </tr>
          ))}
      </tbody>*/}
    </React.Fragment>
  );
}

export default EquipoRow;
