import React, { useState, useEffect } from "react";
import withFormHandling from "../withFormHandling";
import { useHistory } from "react-router-dom";

const tiposDocumento = ["", "NIT", "cedula", "pasaporte", "cedula extranjeria"];

function TerceroForm(props) {
  const [tercero, setTercero] = useState(undefined);

  useEffect(() => {
    cambiarLink();
  }, [tercero]);

  const history = useHistory();

  const { fields, handleChange, handleSubmitPOST } = props;

  const cambiarLink = () => {
    console.log("tercero", tercero);
    if (tercero) {
      history.push(`${tercero._id}`);
    }
  };

  return (
    <div id="tercero-registrar-card">
      <form
        onSubmit={(e) => handleSubmitPOST(e).then((value) => setTercero(value))}
      >
        <h4 id="tercero-registrar-titulo">Registrar un Tercero</h4>
        <div className="form-group">
          <label htmlFor="nombre"> Nombre : </label>
          <input
            name="nombre"
            type="text"
            required
            value={fields.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreGrupo"> Tipo Documento :</label>
          <select
            name="tipoDocumento"
            value={fields.tipoDocumento}
            onChange={handleChange}
            required
          >
            {tiposDocumento.map((tipoDocumento) => (
              <option key={tipoDocumento} value={tipoDocumento}>
                {tipoDocumento.length > 0
                  ? tipoDocumento[0].toUpperCase() + tipoDocumento.slice(1)
                  : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numeroDocumento"> Numero Documento : </label>
          <input
            name="numeroDocumento"
            type="text"
            value={fields.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion"> Direccion : </label>
          <input
            name="direccion"
            type="text"
            value={fields.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciudad"> Ciudad : </label>
          <input
            name="ciudad"
            type="text"
            value={fields.ciudad}
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
        <div className="form-group">
          <label htmlFor="numeroIdentificacionTributario">
            {" "}
            Numero Identificacion Tributario :{" "}
          </label>
          <input
            name="numeroIdentificacionTributario"
            type="text"
            value={fields.numeroIdentificacionTributario}
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

export default withFormHandling(TerceroForm);
