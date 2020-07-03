import React, { useState } from "react";
import EquipoForm from "./EquipoForm";
import withFormHandling from "../withFormHandling";
import Row from "react-bootstrap/Row";

function EquipoCreate(props) {
  const [componentes, setComponentes] = useState([]);
  const [error, setError] = useState(null);
  const { handleChange, fields } = props;
  const handleSubmitPOSTEquipo = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(componentes);
    try {
      fields.componentes = componentes.map((componente) => {
        const newComponente = {};
        newComponente.cantidad = componente.cantidad;
        newComponente.equipoID = componente.equipo._id;
        if (componente.cantidad === 0) {
          setError("La cantidad del componente debe ser mayor a 0");
          throw new Error("La cantidad del componente debe ser mayor a 0");
        }
        return newComponente;
      });
      console.log(fields);
      const res = await fetch(props.formAction, options);
      const data = await res.json();
      console.log(data);
    } catch (e) {}
  };
  return (
    <form onSubmit={handleSubmitPOSTEquipo}>
      <Row>
        <EquipoForm
          formAction={props.formAction}
          fields={fields}
          componentes={componentes}
          setComponentes={setComponentes}
          handleChange={handleChange}
        />
      </Row>
      <button type="submit" onClick={() => setError(null)}>
        Crear
      </button>
      {error}
    </form>
  );
}

export default withFormHandling(EquipoCreate);
