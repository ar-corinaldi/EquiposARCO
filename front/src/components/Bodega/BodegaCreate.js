import React from "react";
import BodegaForm from "./BodegaForm";
import "./Bodega.css";
import { useParams } from "react-router-dom";

function BodegaCreate(props) {
  const { id } = useParams();
  const formAction = `/terceros/${id}/bodegas`;

  const fields = {
    nombreBodega: "",
    direccionBodega: "",
    municipio: "",
    departamento: "",
    pais: "",
    codigoPostal: "",
    email: "",
    celular: "",
    telefono: "",
    duenio: id,
  };

  return (
    <div id="bodega-registrar-wrapper">
      <BodegaForm
        fields={fields}
        formAction={formAction}
        idTercero={id}
      ></BodegaForm>
    </div>
  );
}

export default BodegaCreate;
