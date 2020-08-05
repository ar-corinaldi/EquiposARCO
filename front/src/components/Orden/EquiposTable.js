import React from "react";
import EquipoRow from "./EquipoRow";
import "./EquiposTable.css";
import { useState } from "react";

function EquiposTable(props) {
  const tarifas = props.tarifas;
  const equipos = props.equipos;

  const [opcion, setOpcion] = useState(1);

  const toggle = (value) => {
    setOpcion(value);
  };

  //console.log("tarifas", tarifas);
  // console.log("tarifas[0]", tarifas && tarifas[0].tarifasPorEquipo);
  // console.log("tarifas[1]", tarifas && tarifas[1].tarifasPorEquipo);
  return (
    <div className="table-responsive">
      <ul className="nav nav-tabs nav-bordered box">
        <li className="nav-item">
          <a
            className={
              opcion === 1 ? "nav-link px-3 py-2 active" : "nav-link px-3 py-2"
            }
            onClick={() => toggle(1)}
          >
            <i className="mdi mdi-pencil-box-multiple font-18 d-md-none d-block"></i>
            <span className="d-none d-md-block">Tarifas</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              opcion === 2 ? "nav-link px-3 py-2 active" : "nav-link px-3 py-2"
            }
            onClick={() => toggle(2)}
          >
            <i className="mdi mdi-image font-18 d-md-none d-block"></i>
            <span className="d-none d-md-block">Status</span>
          </a>
        </li>
      </ul>
      <br></br>
      {opcion === 2 ? (
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
              <th>Status</th>
            </tr>
          </thead>
          {equipos &&
            equipos.map((equipo, index) => (
              <EquipoRow key={index} equipo={equipo} index={index} opcion={2} />
            ))}
        </table>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Cantidad</th>
              <th>Valor</th>
              <th>Tipo de Cobro</th>
              <th>Periodo Cobro</th>
            </tr>
          </thead>
          <tbody>
            {tarifas &&
              tarifas.map((tarifaAgrupada, index) => (
                <EquipoRow
                  key={index}
                  tarifasPorEquipo={tarifaAgrupada.tarifasPorEquipo}
                  index={index}
                  opcion={1}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EquiposTable;
