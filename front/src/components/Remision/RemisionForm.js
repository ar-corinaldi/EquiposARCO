import React from "react";
import withFormHandling from "../withFormHandling";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function RemisionForm(props) {
  const [remision, setRemision] = useState(undefined);
  const { fields, handleChange, handleSubmitPOST, idT, idB, idOr } = props;
  const history = useHistory();

  useEffect(() => {
    mostrarOrden();
  }, [remision]);

  const mostrarOrden = () => {
    //console.log("bodega", bodega);
    if (remision) {
      history.replace(`/terceros/${idT}/bodegas/${idB}/ordenes/${idOr}`);
    }
  };

  return (
    <div className="remision-registrar-card">
      <form
        onSubmit={(e) =>
          handleSubmitPOST(e).then((value) => setRemision(value))
        }
      >
        <h4 className="titulo">Registrar una remisión</h4>
        <div className="form-group">
          <label htmlFor="nombreBodega"> Dia de salida : </label>
          <input
            name="nombreBodega"
            type="text"
            value={fields.nombreBodega}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccionBodega"> Hora de salida : </label>
          <input
            name="direccionBodega"
            type="text"
            value={fields.direccionBodega}
            onChange={handleChange}
            required
          />
        </div>

        <div id="button-wrapper">
          <button type="submit" className="buttonTercero">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default withFormHandling(RemisionForm);
