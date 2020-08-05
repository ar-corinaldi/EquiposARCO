import React from "react";
import EquipoDetail from "./EquipoDetail";

function EquipoTable(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const [pesoTotal, setPesoTotal] = props.pesoTotal;
  const [cantidadTotal, setCantidadTotal] = props.cantidadTotal;

  return (
    <div className="table-responsive">
      <table className="table fixed">
        <thead>
          <tr>
            <th className="pt">Equipo</th>
            <th className="pt">Familia</th>
            <th className="pt w10">Peso</th>
            <th className="pt w10">Cantidad</th>
            <th className="pt w10 accion-style">Accion</th>
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
            <td className="pt">Total:</td>
            <td></td>
            <td className="pt">{pesoTotal}</td>
            <td className="pt">{cantidadTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EquipoTable;
