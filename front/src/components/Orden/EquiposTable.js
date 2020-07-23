import React from "react";
import EquipoRow from "./EquipoRow";

function EquiposTable(props) {
  const tarifas = props.tarifas;
  const equipos = props.equipos;

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
            <th>Enviado</th>
            <th>Devuelto</th>
            <th>Por enviar</th>
            <th>Por devolver</th>
            <th>Valor</th>
            <th>Tipo de Cobro</th>
            <th>Periodo Cobro</th>
          </tr>
        </thead>
        {equipos &&
          equipos.map((equipo, index) => (
            <EquipoRow key={index} equipo={equipo} index={index} />
          ))}
        {/* <tbody>
          {tarifas &&
            tarifas.map((tarifaAgrupada, index) => (
              <EquipoRow
                key={index}
                tarifasPorEquipo={tarifaAgrupada.tarifasPorEquipo}
                index={index}

              />
            ))}
        </tbody> */}
      </table>
    </div>
  );
}

export default EquiposTable;
