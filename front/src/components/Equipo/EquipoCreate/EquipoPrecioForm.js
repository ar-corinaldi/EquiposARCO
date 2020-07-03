import React from "react";
import PrecioForm from "./PrecioForm";
import Modal from "../../Modal";
import { useState } from "react";
function EquipoPrecioForm(props) {
  const [show, setShow] = useState(false);
  const handleAgregar = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleRemove = (e, currentIndex) => {
    e.preventDefault();
    props.setPrecios((prev) =>
      prev.filter((prev, index) => currentIndex !== index)
    );
  };
  return (
    <React.Fragment>
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
            precios={props.precios}
            setPrecios={props.setPrecios}
          />
        )}
        show={show}
        setShow={setShow}
        estado={props.precios}
        header
      />
      {props.precios.map((precio, index) => (
        <div>
          Aqui hay un precio{/* <PrecioForm /> */}
          <button className="m-2" onClick={(e) => handleRemove(e, index)}>
            -
          </button>
        </div>
      ))}
      <button onClick={handleAgregar}>Agregar</button>
    </React.Fragment>
  );
}

export default EquipoPrecioForm;
