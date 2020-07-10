import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";

function PropiedadesComponentesContainer(props) {
  const { componentes, nombres } = props;

  return (
    <Card>
      <Card.Body>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#1">
          <Row>
            <Col sm={4}>
              <ListGroup horizontal>
                {nombres &&
                  nombres.map((nombre, index) => (
                    <ListGroup.Item
                      key={`#${nombre}`}
                      action
                      href={`#${index + 1}`}
                    >
                      {nombre}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                {componentes.map((Componente, index) => (
                  <Tab.Pane key={`#${index}`} eventKey={`#${index + 1}`}>
                    <Componente />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
}

export default PropiedadesComponentesContainer;
