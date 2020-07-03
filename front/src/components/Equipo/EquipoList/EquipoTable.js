import React from "react";
import EquipoRow from "./EquipoRow";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

function EquipoTable(props) {
  if (props.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!props.loading && props.equipos.length === 0) {
    return <h2>No hay equipos disponibles</h2>;
  }

  return (
    <Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Tipo Equipo</td>
            <td>Codigo</td>
          </tr>
        </thead>
        <tbody>
          {props.equipos.map((equipo) => (
            <EquipoRow
              key={equipo._id}
              equipo={equipo}
              setComponentes={props.setComponentes}
            />
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default EquipoTable;
