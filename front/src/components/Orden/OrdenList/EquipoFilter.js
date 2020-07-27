import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Select from "../../Select";

function EquipoFilter(props) {
  const opciones = [
    "andamios",
    "elementos formaleta entrepiso",
    "encofrado",
    "formaleta",
    "maquinaria",
    "servicio",
  ];

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setFilterText(input);
    fetch("/ping");
  };

  return (
    <Container>
      <Row>
        <Col>
          <label className="mr-2">Categoría</label>
          <Select
            opciones={opciones}
            submit={handleSubmit}
            input={input}
            setInput={setInput}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoFilter;
