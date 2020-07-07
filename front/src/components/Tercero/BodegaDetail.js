import React, { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function BodegaDetail(props) {
  const bodega = props.bodega;
  const tercero = props.tercero;
  const [open, setOpen] = useState(false);

  const toggle = () => {
    console.log(open);
    setOpen(!open);
  };

  const eliminarBodega = async () => {
    //console.log("tercero", tercero);
    //console.log("bodega", bodega);
    //console.log("url", `/terceros/${tercero._id}/bodegas/${bodega._id}`);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `/terceros/${tercero._id}/bodegas/${bodega._id}`,
      options
    );
    const elim = await res.json();
    const bodegasN = elim.tercero.bodegas;
    props.setBodegas(bodegasN);
  };

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  return (
    <div className="bodega-cliente">
      <Row>
        <button className="btn nombreBodega" onClick={toggle}>
          {bodega.nombreBodega}
        </button>
      </Row>
      <Row className={"collapse" + (open ? " in" : "")}>
        <p>
          <strong> Nombre : </strong>
          {capitalize(bodega.nombreBodega || "")}
        </p>
        <p>
          <strong> Dirección : </strong>
          {capitalize(
            (bodega.direccionBodega || "") +
              " " +
              (bodega.municipio || "") +
              ", " +
              (bodega.departamento || "") +
              ", " +
              (bodega.pais || "")
          )}
        </p>
        <p>
          <strong> Teléfono : </strong>
          {bodega.telefono}
        </p>
        <p>
          <strong> Órdenes en curso : </strong>
        </p>
        {bodega.ordenesActuales.map((orden) => (
          <p key={orden._id}>
            <Link
              to={
                "/terceros/" +
                tercero._id +
                "/bodegas/" +
                bodega._id +
                "/ordenes/" +
                orden._id
              }
            >
              {orden._id}
            </Link>
          </p>
        ))}
        <p>
          <strong> Órdenes finalizadas : </strong>
        </p>
        {bodega.ordenesPasadas.map((orden) => (
          <p key={orden._id}>
            <Link
              to={
                "/terceros/" +
                tercero._id +
                "/bodegas/" +
                bodega._id +
                "/ordenes/" +
                orden._id
              }
            >
              {orden._id}
            </Link>
          </p>
        ))}
        <p>
          <strong> Cotizaciones : </strong>
        </p>
        {bodega.cotizaciones.map((coti) => (
          <p key={coti._id}>
            <Link
              to={
                "/terceros/" +
                tercero._id +
                "/bodegas/" +
                bodega._id +
                "/cotizaciones/" +
                coti._id
              }
            >
              {coti._id}
            </Link>
          </p>
        ))}
        <button onClick={eliminarBodega} className="eliminarBodega">
          Eliminar Bodega
        </button>
      </Row>
    </div>
  );
}

export default BodegaDetail;
