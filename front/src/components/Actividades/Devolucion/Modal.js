import React from "react";
import "./Modal.css";
import withFormHandling from "../../withFormHandling";
import { useEffect } from "react";
import CrearNotaInventario from "./CrearNotaInventario";

function Modal(props) {
  const [show, setShow] = props.show;
  //console.log("show", show);
  const handleClose = props.handleClose;
  const [equipoNota, setEquipoNota] = props.equipoNota;
  const orden = props.orden;
  const { fields, handleChange, handleSubmitPOST } = props;
  //console.log(equipo);
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    console.log("cambio");
    console.log("equipoNota", equipoNota);
    fields.equipo = equipoNota._id;
  }, [equipoNota]);

  return (
    <span className={showHideClassName}>
      <section className="modal-main">
        <CrearNotaInventario></CrearNotaInventario>
      </section>
    </span>
  );
}

export default withFormHandling(Modal);
