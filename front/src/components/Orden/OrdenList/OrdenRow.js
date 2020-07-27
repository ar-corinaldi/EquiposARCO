import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ContextEquipoList } from "./withEquipoList";

function OrdenRow(props) {
  const { url } = useRouteMatch();

  return (
    <React.Fragment>
      <tr>
        <td>
          {/* <Link to={`${url}/${props.equipo._id}`}> */}
          {props.orden.codigo}
          {/* </Link> */}
        </td>
        <td>Tercero</td>
        <td>{props.orden.bodega}</td>
        <td>{props.orden.codigoObra}</td>
        <td>Status</td>
        <td>{props.orden.fechaInicio}</td>
        <td>{props.orden.fechaFin}</td>
      </tr>
    </React.Fragment>
  );
}

export default OrdenRow;
