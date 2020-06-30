import React from "react";

function TerceroRow(props) {
  return (
    <React.Fragment>
      <tr key={props.tercero._id}>
        <td>{props.tercero.nombre}</td>
        <td>{props.tercero.tipoDocumento}</td>
        <td>{props.tercero.numeroDocumento}</td>
      </tr>
    </React.Fragment>
  );
}

export default TerceroRow;
