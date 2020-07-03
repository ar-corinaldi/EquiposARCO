import React, { useState } from "react";
import EquipoForm from "./EquipoForm";
import withFormHandling from "../withFormHandling";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
function EquipoCreate(props) {
  const [componentes, setComponentes] = useState([]);
  const [error, setError] = useState(null);
  const { handleChange, fields } = props;
  const history = useHistory();
  const handleSubmitPOSTEquipo = async (e) => {
    e.preventDefault();

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

      const options = {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(props.formAction, options);
      const data = await res.json();
      history.push(`equipos/${data._id}`);
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
