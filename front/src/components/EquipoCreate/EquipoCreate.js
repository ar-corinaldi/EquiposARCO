import React, { useState } from "react";
import EquipoForm from "./EquipoForm";
import EquipoComponenteForm from "./EquipoComponenteForm";
import Col from "react-bootstrap/Col";

function EquipoCreate(props) {
  const [componentes, setComponentes] = useState([]);
  return (
    <React.Fragment>
      <Col>
        <EquipoForm
          formAction={"/equipos"}
          fields={{
            nombreEquipo: "",
            nombreFamilia: "",
            nombreGrupo: "",
            codigo: "",
          }}
          componentes={componentes}
          setComponentes={setComponentes}
        />
      </Col>
      <Col md="auto" className="m-4">
        Componentes del Equipo
        <EquipoComponenteForm componentes={componentes} />
        <button
          className="m-2"
          onClick={() =>
            setComponentes((prev) => [...prev, { codigo: "", cantidad: 0 }])
          }
        >
          Agregar
        </button>
        <button
          onClick={() =>
            setComponentes((prev) =>
              prev.filter((val, index) => index !== prev.length - 1)
            )
          }
        >
          Quitar
        </button>
      </Col>
    </React.Fragment>
  );
}

export default EquipoCreate;
