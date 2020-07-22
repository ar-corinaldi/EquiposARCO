import React from "react";
import ActividadRow from "./ActividadRow";
import Table from "react-bootstrap/Table";

function ActividadTable(props) {
  if (props.loading) {
    return props.loading;
  }

  if (!props.actividades && props.actividades.length === 0) {
    return <h2>No hay ni remisiones ni devoluciones</h2>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Codigo</td>
          <td>Fecha salida</td>
          <td>Fecha llegada</td>
          <td>Cantidad de equipos</td>
          <td>Responsable</td>
        </tr>
      </thead>
      <tbody>
        {props.actividades.map((actividad, index) => (
          <ActividadRow key={index} actividad={actividad} />
        ))}
      </tbody>
    </Table>
  );
}

export default ActividadTable;
