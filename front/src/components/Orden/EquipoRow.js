import React from "react";

function EquipoRow(props) {
  const tarifa = props.tarifa;
  return (
    <tr className="capitalize">
      <td>1</td>
      <td>
        <b>{tarifa && tarifa.equipo.nombreEquipo}</b>
        <br />
        {tarifa && tarifa.equipo.nombreGrupo}
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
