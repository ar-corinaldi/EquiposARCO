import React from "react";
import EquipoRow from "./EquipoRow";
import "./EquiposTable.css";

function EquiposTable(props) {
  const tarifas = props.tarifas;
  const equipos = props.equipos;

  // console.log("tarifas", tarifas);
  // console.log("tarifas[0]", tarifas && tarifas[0].tarifasPorEquipo);
  // console.log("tarifas[1]", tarifas && tarifas[1].tarifasPorEquipo);
  return (
    <div className="table-responsive">
      <ul className="nav nav-tabs nav-bordered box">
        <li className="nav-item">
          <a className="nav-link px-3 py-2">
            <i className="mdi mdi-pencil-box-multiple font-18 d-md-none d-block"></i>
            <span className="d-none d-md-block">Tarifas</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link px-3 py-2 active">
            <i className="mdi mdi-image font-18 d-md-none d-block"></i>
            <span className="d-none d-md-block">Estado</span>
          </a>
        </li>
      </ul>
      <br></br>
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
