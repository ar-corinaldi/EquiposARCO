import React from "react";
import EquipoCompuestoForm from "./EquipoCompuestoForm";
import EquipoNoCompuestoForm from "./EquipoNoCompuestoForm";
import Container2Components from "../../Container2Components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EquipoCreate(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Container2Components
            nombres={["Equipo No Compuesto", "Equipo Compuesto"]}
            componentes={[EquipoNoCompuestoForm, EquipoCompuestoForm]}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoCreate;
