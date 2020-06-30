import React from "react";
import Table from "react-bootstrap/Table";
import TerceroRow from "./TerceroRow";

function TerceroTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo Documento</th>
          <th>Numero Documento</th>
        </tr>
      </thead>
      <tbody>
        {props.terceros.map((tercero) => (
          <TerceroRow key={tercero._id} tercero={tercero} />
        ))}
      </tbody>
    </Table>
  );
}

export default TerceroTable;
