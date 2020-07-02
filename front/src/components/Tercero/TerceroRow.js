import React from "react";
import { Link } from "react-router-dom";

function TerceroRow(props) {
  return (
    <React.Fragment>
      <tr key={props.tercero._id}>
        <td>
          <Link to={"/terceros/" + props.tercero._id}>
            {props.tercero && props.tercero.nombre}
          </Link>
        </td>
        <td>{props.tercero && props.tercero.tipoDocumento}</td>
        <td>{props.tercero && props.tercero.numeroDocumento}</td>
      </tr>
    </React.Fragment>
  );
}

export default TerceroRow;
