import React, { useState } from "react";
import ComponenteForm from "./ComponenteForm";
import EquipoList from "../EquipoList/EquipoList";
import Modal from "../../Modal";
function EquipoComponenteForm(props) {
  const { setComponentes, componentes } = props;
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleRemove = (currentIndex) => {
    props.setComponentes((prev) =>
      prev.filter((prev, index) => currentIndex !== index)
    );
  };
  return (
    <React.Fragment>
      <Modal
        title={"Precios del Equipo"}
        body={() => <EquipoList setComponentes={setComponentes} />}
        show={show}
        setShow={setShow}
        estado={props.componentes}
        header
      />
      {props.componentes.map((componente, index) => (
        <React.Fragment>
          <ComponenteForm
            setComponentes={setComponentes}
            componente={componente}
          />
          <button className="m-2" onClick={() => handleRemove(index)}>
            -
          </button>
        </React.Fragment>
      ))}
      <button className="m-2" onClick={handleShow}>
        Agregar
      </button>
    </React.Fragment>
  );
}

export default EquipoComponenteForm;
