import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import PrecioDetail from "./PrecioDetail";

function PrecioTable({equipo, setEquipo,...props}) {
  const [hideFields] = useState(["__v", "_id"]);
  if (!props.precios || props.precios.length === 0) {
    return null;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Valor Venta</th>
          <th>Valor Alquiler</th>
          <th>Tipo Cobro</th>
          <th>Tiempo Minimo</th>
        </tr>
      </thead>
      <tbody>
        {props.precios.map((precio) => (
          <PrecioDetail
            equipo={equipo}
            setEquipo={setEquipo}
            key={precio._id}
            precio={precio}
            hideFields={hideFields}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default PrecioTable;
