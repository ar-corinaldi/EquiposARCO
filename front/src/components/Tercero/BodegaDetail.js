import React, { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

function BodegaDetail(props) {
  const bodega = props.bodega;
  const tercero = props.tercero;
  const [open, setOpen] = useState(false);
  const [openOrAct, setOpenOrAct] = useState(false);
  const [openOrPas, setOpenOrPas] = useState(false);
  const [openCot, setOpenCot] = useState(false);

  const toggle = () => {
    //console.log(open);
    setOpen(!open);
  };

  const toggleOrAct = () => {
    //console.log(open);
    setOpenOrAct(!openOrAct);
  };

  const toggleOrPas = () => {
    //console.log(open);
    setOpenOrPas(!openOrPas);
  };

  const toggleCot = () => {
    //console.log(open);
    setOpenCot(!openCot);
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
          {open ? (
            <FaChevronUp className="icono" />
          ) : (
            <FaChevronDown className="icono" />
          )}
        </button>
      </Row>
      <Row className={"pd12 collapse" + (open ? " in" : "")}>
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
          <button className="btn bodega-collapse" onClick={toggleOrAct}>
            <strong> Órdenes en curso : </strong>
            {openOrAct ? (
              <FaChevronUp className="icono" />
            ) : (
              <FaChevronDown className="icono" />
            )}
          </button>
        </p>
        <Row className={"pdl-15 collapse" + (openOrAct ? " in" : "")}>
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
        </Row>
        <p>
          <button className="btn bodega-collapse" onClick={toggleOrPas}>
            <strong> Órdenes finalizadas : </strong>{" "}
            {openOrPas ? (
              <FaChevronUp className="icono" />
            ) : (
              <FaChevronDown className="icono" />
            )}
          </button>
        </p>
        <Row className={"pdl-15 collapse" + (openOrPas ? " in" : "")}>
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
        </Row>
        <p>
          <button className="btn bodega-collapse" onClick={toggleCot}>
            <strong> Cotizaciones : </strong>{" "}
            {openCot ? (
              <FaChevronUp className="icono" />
            ) : (
              <FaChevronDown className="icono" />
            )}
          </button>
        </p>
        <Row className={"pdl-15 collapse" + (openCot ? " in" : "")}>
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
        </Row>
        <Row>
          <button onClick={eliminarBodega} className="eliminarBodega">
            Eliminar Bodega
          </button>
        </Row>
      </Row>
    </div>
  );
}

export default BodegaDetail;
