import React, { useEffect } from "react";
import Escoger from "../../Escoger";
import { useState } from "react";
import useFetchAPI from "../../../hooks/useFetchAPI";
import "./InventarioPorOrden.css";
import Container from "react-bootstrap/Container";
import InfoOrden from "./InfoOrden";

function InventarioPorOrden(props) {
  const [ordenSelected, setOrdenSelected] = useState({});
  const [ordenFull, setOrdenFull] = useState({});
  const ordenesAPI = useFetchAPI(`/ordenes/`, []);
  const ordenes = ordenesAPI.resource;

  useEffect(() => {
    fetchInfoOrden();
  }, [ordenSelected]);

  const fetchInfoOrden = async () => {
    let res = await fetch(`/ordenes/${ordenSelected._id}`);
    const ord = await res.json();
    //console.log("cotizacion", coti);
    setOrdenFull(ord);
  };
  if (ordenesAPI.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!ordenes) {
    return ordenesAPI.notFound("No se encontro orden con este id");
  }
  return (
    <Container fluid>
      <div className="escoger-orden-wrapper">
        <h5>Seleccionar orden</h5>
        <Escoger
          className="margin-auto"
          nombre={"Orden"}
          nombre_plural={"ordenes"}
          camposBuscar={[
            "codigo",
            "fechaInicio",
            "fechaFin",
            "codigoObra",
            "bodega",
          ]}
          campos={["codigo"]}
          elementoSelected={[ordenSelected, setOrdenSelected]}
          elementos={ordenes}
        ></Escoger>{" "}
      </div>
      {ordenSelected._id ? <InfoOrden orden={ordenFull}></InfoOrden> : <></>}
    </Container>
  );
}

export default InventarioPorOrden;
