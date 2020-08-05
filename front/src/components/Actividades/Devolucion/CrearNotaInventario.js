import React, { useEffect } from "react";

function CrearNotaInventario(props) {
  const [equipoNota, setEquipoNota] = props.equipoNota;
  const orden = props.orden;
  const { fields, handleChange, handleSubmitPOST } = props;
  //console.log(equipo);
  useEffect(() => {
    console.log("cambio");
    console.log("equipoNota", equipoNota);
    fields.equipo = equipoNota._id;
  }, [equipoNota]);

  const handleNotaInventario = () => {};

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
        <button
          type="submit"
          className="buttonTercero"
          onClick={handleNotaInventario}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default CrearNotaInventario;
