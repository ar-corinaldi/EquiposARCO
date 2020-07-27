import React from "react";
import OrdenRow from "./OrdenRow";
import Table from "react-bootstrap/Table";

function OrdenTable(props) {
  if (props.loading) {
    return props.loading;
  }

  if (!props.ordenes && props.ordenes.length === 0) {
    return <h2>No hay ordenes disponibles</h2>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Codigo</td>
          <td>Tercero</td>
          <td>Bodega</td>
          <td>Obra</td>
          <td>Status</td>
          <td>Fecha Inicial</td>
          <td>Fecha Final</td>
        </tr>
      </thead>
      <tbody>
        {props.ordenes.map((orden) => (
          <OrdenRow key={orden._id} orden={orden} />
        ))}
      </tbody>
    </Table>
  );
}

export default OrdenTable;
