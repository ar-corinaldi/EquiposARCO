import React from "react";
import "./Modal.css";
import withFormHandling from "../../withFormHandling";

function Modal(props) {
  const show = props.show;
  //console.log("show", show);
  const handleClose = props.handleClose;
  const equipo = props.equipo;
  const orden = props.orden;
  const { fields, handleChange, handleSubmitPOST } = props;
  //console.log(equipo);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <span className={showHideClassName}>
      <section className="modal-main">
        <span className="borde">
          <h4 className="center"> Registrar un daño al equipo </h4>
          <form onSubmit={handleSubmitPOST}>
            <span className="mt-3 mb-2">
              <label htmlFor="equipo">Equipo :</label>
              <input
                name="equipo"
                type="text"
                value={equipo.nombreEquipo}
                // onChange={handleCostoTrasnporte}
              />
            </span>
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
            <button type="submit" className="buttonTercero">
              Registrar
            </button>
          </form>
        </span>
      </section>
    </span>
  );
}

export default withFormHandling(Modal);
