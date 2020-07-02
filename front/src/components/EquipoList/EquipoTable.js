import React from "react";
import EquipoRow from "./EquipoRow";

function EquipoTable(props) {
  if (props.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!props.loading && props.equipos.length === 0) {
    return <h2>No hay equipos disponibles</h2>;
  }

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
