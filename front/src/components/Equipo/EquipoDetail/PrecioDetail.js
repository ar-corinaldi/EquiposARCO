import React from "react";

function PrecioDetail(props) {
  const { precio } = props;
  return (
    <tr>
      <td>{precio.valorVenta === -1 ? 0 : precio.valorVenta}</td>
      <td>{precio.valorAlquiler === -1 ? 0 : precio.valorAlquiler}</td>
      <td>
        {precio.categoria} / {precio.tiempo}
      </td>
      <td>{precio.tiempoMinimo <= 0 ? "No hay" : precio.tiempoMinimo}</td>
    </tr>
  );
}

export default PrecioDetail;
