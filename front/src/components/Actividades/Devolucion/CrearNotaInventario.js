import React from "react";

function CrearNotaInventario(props) {
  return (
    <div>
      <h4 className="center"> Registrar un daño al equipo </h4>
      <form onSubmit={handleSubmitPOST}>
        <p className="capitalize">Equipo : {equipoNota.nombreEquipo}</p>
        <span className="mt-3 mb-2">
          <label htmlFor="cantidad">Cantidad :</label>
          <input
            name="cantidad"
            type="number"
            value={fields.cantidad}
            onChange={handleChange}
          />
        </span>
        <span className="mt-3 mb-2">
          <label htmlFor="descripcion">Descripcion :</label>
          <input
            name="descripcion"
            type="text"
            value={fields.descripcion}
            onChange={handleChange}
          />
        </span>
        <button type="submit" className="buttonTercero" onClick={handleClose}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default CrearNotaInventario;
