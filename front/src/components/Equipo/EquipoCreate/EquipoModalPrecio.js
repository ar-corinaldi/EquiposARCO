import React, { useEffect } from "react";
import PrecioForm from "./PrecioForm";
import Modal from "react-bootstrap/Modal";

function EquipoModalPrecio(props) {
  const { show, setShow, setComponentes } = props;

  useEffect(() => {
    handleClose();
  }, [props.componentes]);

  const handleClose = () => setShow(false);
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Precio del Equipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PrecioForm setComponentes={setComponentes} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default EquipoModalPrecio;
