import React from "react";
import EquipoDetail from "./EquipoDetail";

function EquipoTable(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;

  return (
    <table className="table-width">
      <thead className="thead-light">
        <tr>
          <th>Equipo</th>
          <th>Familia</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {equiposSels &&
          equiposSels.map((equipoRender, index) => (
            <EquipoDetail
              key={index}
              equipoRender={equipoRender}
              equiposSels={[equiposSels, setEquiposSels]}
            ></EquipoDetail>
          ))}
      </tbody>
    </table>
  );
}

export default EquipoTable;
