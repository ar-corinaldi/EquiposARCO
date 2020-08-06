import React from "react";
import "./Modal.css";
import { useEffect } from "react";

function Modal(props) {
  const [show, setShow] = props.show;
  //console.log("show", show);
  const handleClose = props.handleClose;
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <span className={showHideClassName}>
      <section className="modal-main">
        <button onClick={handleClose}>x</button>
        {props.children}
      </section>
    </span>
  );
}

export default Modal;
