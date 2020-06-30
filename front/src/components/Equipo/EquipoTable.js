import React from "react";
import EquipoRow from "./EquipoRow";

function EquipoTable(props) {
  return (
    <div className="table-equipo">
      <table className="table">
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Tipo Equipo</td>
            <td>Codigo</td>
          </tr>
        </thead>
        <tbody>
          {props.equipos.map((equipo) => (
            <EquipoRow key={equipo._id} equipo={equipo} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipoTable;
