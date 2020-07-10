import React from "react";
import RemisionForm from "./RemisionForm";
import "./Remision.css";

//const formAction = "/remision";
const fields = {};

function RemisionCreate(props) {
  return (
    <div className="remision-registrar-wrapper">
      <RemisionForm></RemisionForm>
    </div>
  );
}

export default RemisionCreate;
