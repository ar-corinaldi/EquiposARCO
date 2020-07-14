import React, { useState } from "react";
import ComponenteForm from "./ComponenteForm";
import EquipoList from "../EquipoList/EquipoList";
import Modal from "../../Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./EquipoCreate.css";
import withEquipoList from "../EquipoList/withEquipoList";
function EquipoComponenteForm(props) {
  const { setComponentes, componentes } = props;
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleRemove = (e, currentIndex) => {
    e.preventDefault();
    setComponentes((prev) =>
      prev.filter((prev, index) => currentIndex !== index)
    );
  };
  return (
    <Container>
      <Row>
        <Col>Componentes del Equipo: {componentes.length}</Col>
      </Row>

      <Modal
        title={"Componente del Equipo"}
        body={withEquipoList(EquipoList, setComponentes, "componentes", true)}
        show={show}
        setShow={setShow}
        estado={componentes}
        header
      />
      {componentes.map((componente, index) => (
        <ul className="list-items-form">
          <li>
            <ComponenteForm
              setComponentes={setComponentes}
              componente={componente}
            />
            <button className="m-2" onClick={(e) => handleRemove(e, index)}>
              -
            </button>
          </li>
        </ul>
      ))}
      <Row>
        <Col>
          <button className="m-2" onClick={handleShow}>
            Agregar
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoComponenteForm;
