import React from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

function PropiedadesDetail(props) {
  const { equipo } = props;
  console.log(equipo);
  return (
    <Col>
      <Table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Peso</td>
            <td>{equipo.peso}</td>
          </tr>
          <tr>
            <td>Ancho</td>
            <td>{equipo.ancho}</td>
          </tr>
          <tr>
            <td>Alto</td>
            <td>{equipo.alto}</td>
          </tr>
          <tr>
            <td>Largo</td>
            <td>{equipo.largo}</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
}

export default PropiedadesDetail;
