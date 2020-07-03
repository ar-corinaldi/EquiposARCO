import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
function EquipoRow(props) {
  const { url } = useRouteMatch();

  return (
    <React.Fragment>
      <tr>
        <td>
          {props.setComponentes ? (
            <Link
              to="/inventario/crearEquipo"
              onClick={() =>
                props.setComponentes((prev) => [
                  ...prev,
                  { cantidad: 0, equipo: props.equipo },
                ])
              }
            >
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
