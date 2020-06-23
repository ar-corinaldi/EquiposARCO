import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Select from "./Select";

function EquipoFilter(props) {
  const [opciones, setOpciones] = useState([
    "Maquinaria Liviana",
    "Maquinaria Pesada",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col>
          <label className="mr-2">Categoría</label>
          <Select
            opciones={opciones}
            filter={props.filterText}
            setFilter={props.setFilterText}
            submit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoFilter;
