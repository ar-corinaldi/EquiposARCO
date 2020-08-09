import React, { useEffect } from "react";
import Escoger from "../../Escoger";
import { useState } from "react";
import useFetchAPI from "../../../hooks/useFetchAPI";
import "./InventarioPorTercero.css";
import Container from "react-bootstrap/Container";
import InfoTercero from "./InfoTercero";

function InventarioPorTercero(props) {
  const [terceroSelected, setTerceroSelected] = useState({});
  const [terceroFull, setTerceroFull] = useState({});
  const tercerosAPI = useFetchAPI(`/terceros/`, []);
  const terceros = tercerosAPI.resource;

  useEffect(() => {
    fetchInfoTercero();
  }, [terceroSelected]);

  const fetchInfoTercero = async () => {
    if (terceroSelected && !isEmpty(terceroSelected)) {
      let res = await fetch(`/terceros/${terceroSelected._id}`);
      const ter = await res.json();
      //console.log("cotizacion", coti);
      setTerceroFull(ter);
    }
  };

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  if (tercerosAPI.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!terceros) {
    return tercerosAPI.notFound("No se encontraron terceros registrados");
  }
  return (
    <Container fluid>
      <div className="escoger-tercero-wrapper">
        <h5>Seleccionar tercero</h5>
        <Escoger
          className="margin-auto"
          nombre={"Tercero"}
          nombre_plural={"terceros"}
          camposBuscar={[
            "numeroDocumento",
            "direccion",
            "ciudad",
            "email",
            "nombre",
          ]}
          campos={["nombre", "numeroDocumento"]}
          elementoSelected={[terceroSelected, setTerceroSelected]}
          elementos={terceros}
        ></Escoger>{" "}
      </div>
      {terceroSelected._id ? (
        <InfoTercero tercero={terceroFull}></InfoTercero>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default InventarioPorTercero;
