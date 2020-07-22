import React, { useState, useEffect } from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import { formatoCategoria, formatoTiempo } from "../utils/FormatoInfoPrecios";
import { calcularTarifaDiaHabil } from "../utils/CacularTarifas";

function PrefacturaEquipo(props) {
  const {
    equipo,
    listaMes,
    mes,
    anio,
    setPrecioMeses,
    precioMeses,
    fechaEmision,
    setAcumEquipos,
    setPrecioTotal,
  } = props;

  const [rows, setRows] = new useState([]);

  useEffect(() => {
    setRows(equipoPrefactura());
  }, [fechaEmision]);

  const equipoPrefactura = () => {
    let prev = 0,
      prevDay = -1;
    let newRender = [];
    let newPrecioTotal = 0;

    if (equipo) {
      let initialDay =
        (fechaEmision.getMonth() + 1 == mes && fechaEmision.getDate() - 1) || 0;
      for (let i = initialDay; i < listaMes.length; i++) {
        let current = listaMes[i];
        if (prev !== current) {
          if (prev !== 0) {
            const date = `${prevDay + 1}/${mes}/${anio} - ${
              i + 1
            }/${mes}/${anio}`;

            let facturado = i + 1 - (prevDay + 1) + 1;
            facturado = Math.max(equipo.tiempoMinimo, facturado);
            console.log("categoria", equipo.categoria);
            if (equipo.categoria === "dia habil") {
              const fechaA = new Date(2020, mes, prevDay + 1);
              const fechaB = new Date(2020, mes, listaMes.length);
              let { diasTotales, festivosEnMedio } = calcularTarifaDiaHabil(
                null,
                facturado,
                fechaA,
                fechaB
              );
              facturado = diasTotales - festivosEnMedio;
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
      if (equipo.categoria === "dia habil") {
        const fechaA = new Date(2020, mes, prevDay + 1);
        const fechaB = new Date(2020, mes, listaMes.length);
        let { diasTotales, festivosEnMedio } = calcularTarifaDiaHabil(
          null,
          facturado,
          fechaA,
          fechaB
        );
        facturado = diasTotales - festivosEnMedio;
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
    setPrecioTotal((prevAcum) => prevAcum + newPrecioTotal);
    console.log("precio total set");
    return newRender;
  };

  return <React.Fragment>{rows}</React.Fragment>;
}

export default PrefacturaEquipo;
