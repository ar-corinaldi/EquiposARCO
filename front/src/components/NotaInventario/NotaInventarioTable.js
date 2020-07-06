import React from "react";
import NotaInventarioRow from "./NotaInventarioRow";
import Table from "react-bootstrap/Table";

function NotaInventarioTable(props) {
  if (props.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!props.loading && props.notasInventario.length === 0) {
    return <h2>No hay notas de inventario disponibles</h2>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Equipo</td>
          <td>Categoria</td>
          <td>Cantidad</td>
          <td>Fecha</td>
          <td>Descripcion</td>
          <td>Orden</td>
        </tr>
      </thead>
      <tbody>
        {props.notasInventario.map((notaInventario) => (
          <NotaInventarioRow
            key={notaInventario._id}
            notaInventario={notaInventario}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default NotaInventarioTable;
