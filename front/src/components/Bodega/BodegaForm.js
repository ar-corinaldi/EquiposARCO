import React from "react";
import withFormHandling from "../withFormHandling";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function BodegaForm(props) {
  const [bodega, setBodega] = useState(undefined);
  const { fields, handleChange, handleSubmitPOST, idTercero } = props;
  const history = useHistory();

  useEffect(() => {
    mostrarCliente();
  }, [bodega]);

  const mostrarCliente = () => {
    //console.log("bodega", bodega);
    if (bodega) {
      history.replace(`/terceros/${idTercero}`);
    }
  };

  return (
    <div id="bodega-registrar-card">
      <form
        onSubmit={(e) => handleSubmitPOST(e).then((value) => setBodega(value))}
      >
        <h4 id="tercero-registrar-titulo">Registrar un Bodega</h4>
        <div className="form-group">
          <label htmlFor="nombreBodega"> Nombre : </label>
          <input
            name="nombreBodega"
            type="text"
            value={fields.nombreBodega}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccionBodega"> Direccion : </label>
          <input
            name="direccionBodega"
            type="text"
            value={fields.direccionBodega}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="municipio"> Municipio : </label>
          <input
            name="municipio"
            type="text"
            value={fields.municipio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="departamento"> Departamento : </label>
          <input
            name="departamento"
            type="text"
            value={fields.departamento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pais"> Pais : </label>
          <input
            name="pais"
            type="text"
            value={fields.pais}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoPostal"> Codigo Postal : </label>
          <input
            name="codigoPostal"
            type="text"
            value={fields.codigoPostal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email : </label>
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular"> Celular : </label>
          <input
            name="celular"
            type="tel"
            value={fields.celular}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono"> Telefono : </label>
          <input
            name="telefono"
            type="tel"
            value={fields.telefono}
            onChange={handleChange}
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

export default withFormHandling(BodegaForm);
