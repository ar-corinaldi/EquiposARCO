import React from "react";
import EquipoRow from "./EquipoRow";

/**
 * Compara dos tarifas con base al id de su equipo. Se utiliza para ordenar las tarifas con base en este criterio
 * @param {*} tarifaA
 * @param {*} tarifaB
 */
function compare(tarifaA, tarifaB) {
  //console.log("tarifaA.equipo._id", tarifaA.equipo._id);
  //console.log("tarifaB.equipo._id", tarifaB.equipo._id);
  return tarifaA.equipo._id
    .toString()
    .localeCompare(tarifaB.equipo._id.toString());
}

/**
 * True si dos tarifas tienen el mismo equipo, false de lo contrario.
 * @param {*} tarifaA
 * @param {*} tarifaB
 */
function mismoEquipo(tarifaA, tarifaB) {
  //console.log("tarifaA.equipo._id", tarifaA.equipo._id);
  //onsole.log("tarifaB.equipo._id", tarifaB.equipo._id);
  return tarifaA.equipo._id.toString() === tarifaB.equipo._id.toString();
}

/**
 * Crea un arregalo que contiene arreglos de las tarifas sobre el mismo equipo.
 */
const filtrarPorEquipo = (tarifasOrdenadas) => {
  if (tarifasOrdenadas) {
    const tarifasPorEquipo = [];
    let tAnterior = tarifasOrdenadas[0];
    let tMismoEquipo = [];
    let tarifa;
    for (let i = 0; i < tarifasOrdenadas.length; i++) {
      tarifa = tarifasOrdenadas[i];
      if (mismoEquipo(tarifa, tAnterior)) {
        tMismoEquipo.push(tarifa);
      } else {
        tAnterior = tarifa;
        tarifasPorEquipo.push(tMismoEquipo);
        tMismoEquipo = [tarifa];
      }
      if (i === tarifasOrdenadas.length - 1) {
        tarifasPorEquipo.push(tMismoEquipo);
      }
    }
    return tarifasPorEquipo;
  }
};

function EquiposTable(props) {
  const tarifas = props.tarifas;
  const tarifasOrdenadas = tarifas && tarifas.sort(compare);
  //console.log(tarifasOrdenadas);
  const tarifasPorEquipo = filtrarPorEquipo(tarifasOrdenadas);
  //console.log(tarifasPorEquipo);
  //console.log("tarifasOrdenadas", tarifasOrdenadas);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>Tipo de Cobro</th>
            <th>Periodo Cobro</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarifasPorEquipo &&
            tarifasPorEquipo.map((tarifaComp, index) => (
              <EquipoRow key={index} tarifaComp={tarifaComp} index={index} />
            ))}
          {/* {tarifas &&
            tarifasOrdenadas.map((tarifa, index) => (
              <EquipoRow key={tarifa._id} tarifa={tarifa} index={index} />
            ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default EquiposTable;
