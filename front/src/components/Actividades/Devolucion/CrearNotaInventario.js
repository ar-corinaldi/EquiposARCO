import React, { useEffect } from "react";
import withFormHandling from "../../withFormHandling";

function CrearNotaInventario(props) {
  const [equipoNota, setEquipoNota] = props.equipoNota;
  const orden = props.orden;
  const { fields, handleChange, handleSubmitPOST } = props;
  const handleClose = props.handleClose;
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
        <div className="mt-3 mb-2">
          <label htmlFor="cantidad">Cantidad :</label>
          <input
            name="cantidad"
            type="number"
            value={fields.cantidad}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3 mb-2">
          <label htmlFor="descripcion">Descripcion :</label>
          <input
            name="descripcion"
            type="text"
            value={fields.descripcion}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="buttonTercero" onClick={handleClose}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default withFormHandling(CrearNotaInventario);
