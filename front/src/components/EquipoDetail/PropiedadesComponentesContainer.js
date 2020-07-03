import React, { useState } from "react";
import EquipoComponentes from "./EquipoComponentes";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function PropiedadesComponentesContainer(props) {
  const { equipo } = props;
  const [click, setClick] = useState(true);
  const renderData = () => {
    console.log(click);
    if (click) {
      return equipo.componentes && equipo.componentes.length > 0 ? (
        <EquipoComponentes componentes={equipo.componentes} />
      ) : (
        <h5 className="m-4">No se compone de ningun equipo</h5>
      );
    }
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
  };
  return (
    <Card>
      <Card.Body>
        <ListGroup horizontal>
          <ListGroup.Item action onClick={() => setClick(true)}>
            Componentes
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setClick(false)}>
            Propiedades
          </ListGroup.Item>
        </ListGroup>
        {renderData()}
      </Card.Body>
    </Card>
  );
}

export default PropiedadesComponentesContainer;
