import React from "react";
import EquipoRow from "./EquipoRow";

function EquiposTable(props) {
  const tarifas = props.tarifas;
  // console.log("tarifas", tarifas);
  // console.log("tarifas[0]", tarifas && tarifas[0].tarifasPorEquipo);
  // console.log("tarifas[1]", tarifas && tarifas[1].tarifasPorEquipo);
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
          {tarifas &&
            tarifas.map((tarifaAgrupada, index) => (
              <EquipoRow
                key={index}
                tarifasPorEquipo={tarifaAgrupada.tarifasPorEquipo}
                index={index}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquiposTable;
