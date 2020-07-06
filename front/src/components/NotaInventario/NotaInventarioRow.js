import React from "react";

function NotaInventarioRow(props) {
  const { notaInventario } = props;
  return (
    <React.Fragment>
      <tr>
        <td>{notaInventario.equipo}</td>
        <td>{notaInventario.categoria}</td>
        <td>{notaInventario.cantidad}</td>
        <td>{notaInventario.fecha}</td>
        <td>{notaInventario.descripcion}</td>
        {notaInventario.orden ? (
          <td>{notaInventario.orden}</td>
        ) : (
          <td>No tiene orden</td>
        )}
      </tr>
    </React.Fragment>
  );
}

export default NotaInventarioRow;
