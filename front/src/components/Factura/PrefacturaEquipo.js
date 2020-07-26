import React, { useState, useEffect } from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import { formatoCategoria, formatoTiempo } from "../utils/FormatoInfoPrecios";
import { calcularDiasHabilesEntreFechas } from "../utils/CacularTarifas";

function PrefacturaEquipo(props) {
  const {
    equipo,
    listaMes,
    mes,
    anio,
    fechaInicial,
    setPrecioTotal,
    fechaCorte,
  } = props;

  const [rows, setRows] = new useState([]);

  useEffect(() => {
    setRows(equipoPrefactura());
  }, [fechaInicial, mes, anio, fechaCorte, equipo, listaMes]);

  const equipoPrefactura = () => {
    let prev = 0,
      prevDay = -1;
    let newRender = [];
    let newPrecioTotal = 0;

    if (equipo) {
      let initialDay =
        (fechaInicial.getMonth() + 1 == mes && fechaInicial.getDate() - 1) || 0;
      for (let i = initialDay; i < listaMes.length; i++) {
        let current = listaMes[i];
        if (prev !== current) {
          if (prev !== 0) {
            const date = `${prevDay + 1}/${mes}/${anio} - ${
              i + 1
            }/${mes}/${anio}`;

            let facturado = i + 1 - (prevDay + 1) + 1;
            facturado = Math.max(equipo.tiempoMinimo, facturado);

            if (equipo.tiempo === "dia habil") {
              const fechaA = new Date(2020, mes, prevDay + 1);
              const fechaB = new Date(2020, mes, listaMes.length);
              facturado = calcularDiasHabilesEntreFechas(fechaA, fechaB);
            }
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
      let facturado = listaMes.length - (prevDay + 1) + 1;
      facturado = Math.max(equipo.tiempoMinimo, facturado);
      if (equipo.tiempo === "dia habil") {
        const fechaA = new Date(2020, mes, prevDay + 1);
        const fechaB = new Date(2020, mes, listaMes.length);
        facturado = calcularDiasHabilesEntreFechas(fechaA, fechaB);
      }

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
    }
    setPrecioTotal && setPrecioTotal((prevAcum) => prevAcum + newPrecioTotal);
    return newRender;
  };

  return <React.Fragment>{rows}</React.Fragment>;
}

export default PrefacturaEquipo;
