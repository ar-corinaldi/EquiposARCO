import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function EquipoRow(props) {
  const { path, url } = useRouteMatch();
  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`${url}/${props.equipo.nombreEquipo}`}>
            {props.equipo && props.equipo.nombreEquipo}
          </Link>
        </td>
        <td>{props.equipo && props.equipo.tipoEquipo}</td>
        <td>{props.equipo && props.equipo.codigo}</td>
      </tr>
    </React.Fragment>
  );
}

export default EquipoRow;
