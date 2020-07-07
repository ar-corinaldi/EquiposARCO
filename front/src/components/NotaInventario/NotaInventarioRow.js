import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function NotaInventarioRow(props) {
  const { url } = useRouteMatch();
  const { notaInventario } = props;
  return (
    <React.Fragment>
      <tr>
        <td>
          <Link to={`${url}/${notaInventario.equipo._id}`}>
            {notaInventario.equipo.nombreEquipo}
          </Link>
        </td>
        <td>{notaInventario.categoria}</td>
        <td>{notaInventario.cantidad}</td>
        <td>{notaInventario.fecha}</td>
        <td>{notaInventario.descripcion}</td>
        {notaInventario.orden ? (
          <td>{notaInventario.orden._id}</td>
        ) : (
          <td>No tiene orden</td>
        )}
      </tr>
    </React.Fragment>
  );
}

export default NotaInventarioRow;
