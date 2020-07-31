import React from "react";
import EquipoDetail from "./EquipoDetail";

function EquipoTable(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const [pesoTotal, setPesoTotal] = props.pesoTotal;
  const [cantidadTotal, setCantidadTotal] = props.cantidadTotal;

  return (
    <table className="table-width">
      <thead className="thead-light">
        <tr>
          <th>Equipo</th>
          <th>Familia</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th className="w50"></th>
        </tr>
      </thead>
      <tbody>
        {equiposSels &&
          equiposSels.map((equipoRender, index) => (
            <EquipoDetail
              key={index}
              equipoRender={equipoRender}
              equiposSels={[equiposSels, setEquiposSels]}
              pesoTotal={[pesoTotal, setPesoTotal]}
              cantidadTotal={[cantidadTotal, setCantidadTotal]}
            ></EquipoDetail>
          ))}
      </tbody>
      <tbody className="borderUp">
        <tr>
          <td>Total:</td>
          <td></td>
          <td>{pesoTotal}</td>
          <td>{cantidadTotal}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EquipoTable;
