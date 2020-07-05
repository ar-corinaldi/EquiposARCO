import React, { useState } from "react";
import PrecioForm from "./PrecioForm";
import Modal from "../../Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./EquipoCreate.css";

function EquipoPrecioForm(props) {
  const [show, setShow] = useState(false);
  const { precios, setPrecios } = props;
  const handleAgregar = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleRemove = (e, currentIndex) => {
    e.preventDefault();
    setPrecios((prev) => prev.filter((prev, index) => currentIndex !== index));
  };
  return (
    <Container>
      <Row>
        <Col>Precios Equipo: {precios.length}</Col>
      </Row>

      <Modal
        title={"Precios del Equipo"}
        body={() => (
          <PrecioForm
            fields={{
              valorVenta: "",
              valorAlquiler: "",
              categoria: "",
              tiempo: "",
              tiempoMinimo: "",
            }}
            precios={precios}
            setPrecios={setPrecios}
          />
        )}
        show={show}
        setShow={setShow}
        estado={precios}
        header
      />
      {precios.map((precio, index) => (
        <ul className="list-items-form">
          <li>
            Aqui hay un precio
            <button className="m-2" onClick={(e) => handleRemove(e, index)}>
              -
            </button>
          </li>
        </ul>
      ))}
      <Row>
        <Col>
          <button className="m-2" onClick={handleAgregar}>
            Agregar
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoPrecioForm;
