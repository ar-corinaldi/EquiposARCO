import React from "react";
import TerceroForm from "./TerceroForm";

const formAction = "/terceros";
const fields = {
  nombre: "",
  tipoDocumento: "",
  numeroDocumento: "",
  direccion: "",
  ciudad: "",
  email: "",
  celular: "",
  telefono: "",
  numeroIdentificacionTributario: "",
};

function TerceroCreate(props) {
  return (
    <div id="tercero-registrar-wrapper">
      <TerceroForm fields={fields} formAction={formAction}></TerceroForm>
    </div>
  );
}

export default TerceroCreate;
