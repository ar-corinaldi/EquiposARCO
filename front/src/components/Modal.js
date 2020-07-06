import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

function ModalBuscarEquipo(props) {
  const { header, estado, body, title, show, setShow } = props;

  useEffect(() => {
    handleClose();
  }, [estado]);

  const handleClose = () => setShow(false);
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        {header ? (
          <Modal.Header closeButton>
            <Modal.Title>{title ? title : "No title added"}</Modal.Title>
          </Modal.Header>
        ) : null}
        <Modal.Body>
          {body ? (
            body()
          ) : (
            <div>No body added, must be a callback () ={"><Component />"}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)}>Cerrar</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default ModalBuscarEquipo;
