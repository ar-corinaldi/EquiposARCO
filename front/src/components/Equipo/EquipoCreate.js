import React, { useState } from "react";
import EquipoForm from "./EquipoForm";
import Col from "react-bootstrap/Col";

function EquipoCreate(props) {
  const [newEquipo, setEquipo] = useState({});
  return (
    <React.Fragment>
      <Col>Hey aqui se deberia hacer la parte de nota de inventario</Col>
      <Col>
        <EquipoForm
          formAction={"/equipos"}
          fields={{
            nombreEquipo: "",
            nombreFamilia: "",
            nombreGrupo: "",
            codigo: "",
          }}
        />
      </Col>
    </React.Fragment>
  );
}

export default EquipoCreate;
