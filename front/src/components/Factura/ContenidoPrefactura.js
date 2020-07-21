import React, { useEffect, useState } from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import { formatoCategoria, formatoTiempo } from "../utils/FormatoInfoPrecios";

function ContenidoPrefactura(props) {
  const { equipo, listaMes, mes, anio, setPrecioTotal } = props;
  const [render, setRender] = useState([]);
  useEffect(() => {
    setRender(equipoPrefactura());
  }, [listaMes, equipo, mes, anio]);

  const equipoPrefactura = () => {
    let prev = 0,
      prevDay = -1;
    let newRender = [];
    let newPrecioTotal = 0;
    for (let i = 0; i < listaMes.length; i++) {
      let current = listaMes[i];
      if (prev !== current) {
        if (prev !== 0) {
          const date = `${prevDay + 1}/${mes}/${anio} - ${
            i + 1
          }/${mes}/${anio}`;

          const facturado = i - (prevDay + 1) + 1;
          const cantidad = prev;
          const total = equipo.precio * facturado * cantidad;
          newPrecioTotal += total;
          newRender.push(
            <tr key={date}>
              <td>{equipo && equipo.nombreEquipo}</td>
              <td>{`${cantidad} ${formatoCategoria(equipo.categoria)}`}</td>
              <td>{date}</td>
              <td>{`${facturado} ${formatoTiempo(
                equipo.tiempo,
                facturado
              )}`}</td>
              <td>{formatoPrecios(equipo.precio)}</td>
              <td>{formatoPrecios(total)}</td>
            </tr>
          );
        }
        prevDay = i;
      }

      prev = current;
    }
    const lastIndex = listaMes.length;
    const cantidad = listaMes[lastIndex - 1];
    const date = `${prevDay + 1}/${mes}/${anio} - ${
      listaMes.length
    }/${mes}/${anio}`;
    const facturado = listaMes.length - (prevDay + 1) + 1;
    if (prev !== 0) {
      const total = equipo.precio * facturado * cantidad;
      newPrecioTotal += total;
      newRender.push(
        <tr key={date}>
          <td>{equipo && equipo.nombreEquipo}</td>
          <td>{`${cantidad} ${formatoCategoria(equipo.categoria)}`}</td>
          <td>{date}</td>
          <td>{`${facturado} ${formatoTiempo(equipo.tiempo, facturado)}`}</td>
          <td>{formatoPrecios(equipo.precio)}</td>
          <td>{formatoPrecios(total)}</td>
        </tr>
      );
    }
    setPrecioTotal((prev) => prev + newPrecioTotal);
    return newRender;
  };

  return <React.Fragment>{render}</React.Fragment>;
}

export default ContenidoPrefactura;
