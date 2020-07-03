import React, { useState, useEffect } from "react";
import EquipoList from "../EquipoList/EquipoList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export const ModalContext = React.createContext();

function ModalBuscarEquipo(props) {
  const { show, setShow, setComponentes } = props;

  useEffect(() => {
    handleClose();
  }, [props.componentes]);

  const handleClose = () => setShow(false);
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Equipo Componente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContext.Provider>
            <EquipoList setComponentes={setComponentes} />
          </ModalContext.Provider>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default ModalBuscarEquipo;
