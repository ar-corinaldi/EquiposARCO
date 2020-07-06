import React from "react";
import EquipoRow from "./EquipoRow";

function EquiposTable(props) {
  const tarifas = props.tarifas;
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tarifas &&
            tarifas.map((tarifa, index) => (
              <EquipoRow key={tarifa._id} tarifa={tarifa} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquiposTable;
