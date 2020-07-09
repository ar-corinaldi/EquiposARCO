import React from "react";
import formatoPrecios from "../../utils/FormatoPrecios";

function PrecioDetail(props) {
  const { precio } = props;
  return (
    <tr>
      <td>
        {precio.valorVenta === -1
          ? "$ 0.00"
          : formatoPrecios(precio.valorVenta, 2)}
      </td>
      <td>
        {precio.valorAlquiler === -1
          ? "$ 0.00"
          : formatoPrecios(precio.valorAlquiler)}
      </td>
      <td>
        {precio.categoria} / {precio.tiempo}
      </td>
      <td>
        {precio.tiempoMinimo <= 0
          ? "No hay"
          : `${precio.tiempoMinimo} ${precio.tiempo}`}
      </td>
    </tr>
  );
}

export default PrecioDetail;
