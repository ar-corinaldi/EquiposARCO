import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ContextEquipoList } from "./withEquipoList";

function EquipoRow(props) {
  const { url } = useRouteMatch();
  const handleClickEquipo = useContext(ContextEquipoList);
  return (
    <React.Fragment>
      <tr>
        <td>
          {handleClickEquipo ? (
            <Link to={url} onClick={() => handleClickEquipo(props.equipo)}>
              {props.equipo.nombreEquipo}
            </Link>
          ) : (
            <Link to={`${url}/${props.equipo._id}`}>
              {props.equipo.nombreEquipo}
            </Link>
          )}
        </td>
        <td>{props.equipo.tipoEquipo}</td>
        <td>{props.equipo.codigo}</td>
      </tr>
    </React.Fragment>
  );
}

export default EquipoRow;
