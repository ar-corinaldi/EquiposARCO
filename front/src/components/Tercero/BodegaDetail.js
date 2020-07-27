import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

function BodegaDetail(props) {
  const history = useHistory();

  const bodega = props.bodega;
  const tercero = props.tercero;
  const [obras, setObras] = useState([]);
  const [open, setOpen] = useState(false);
  const [openOrAct, setOpenOrAct] = useState(false);
  const [openOrPas, setOpenOrPas] = useState(false);

  useEffect(() => {
    fetchOrdenes();
  }, [bodega]);

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

  const fetchOrdenes = async () => {
    const res = await fetch(`/bodegas/${bodega._id}/obras/ordenes`);
    const obrasAct = await res.json();
    console.log("obrasAct", obrasAct);
    setObras(obrasAct);
  };

  const crearCotizacion = () => {
    history.push(`/facturacion/cotizar`);
  };

  const crearOrden = () => {
    history.push(`/facturacion/crear_orden`);
  };

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
            <strong> Obras : </strong>
            {openOrAct ? (
              <FaChevronUp className="icono" />
            ) : (
              <FaChevronDown className="icono" />
            )}
          </button>
        </p>
        <Row className={"pdl-15 collapse" + (openOrAct ? " in" : "")}>
          {obras && obras.length > 0 ? (
            obras.map((obra) => (
              <p key={obra._id}>
                <b>
                  <Link
                    to={
                      "/terceros/" +
                      tercero._id +
                      "/bodegas/" +
                      bodega._id +
                      "/obras/" +
                      obra._id
                    }
                  >
                    {obra._id}{" "}
                  </Link>
                </b>
                {" : "}
                {obra.ordenes.map((orden, index) => (
                  <span key={index}>
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
                      {orden.codigo}
                    </Link>
                    {index === obra.ordenes.length - 1 ? "" : ", "}
                  </span>
                ))}
              </p>
            ))
          ) : (
            <p>No hay ordenes en curso</p>
          )}
        </Row>
        {/* <p>
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
          {bodega.ordenesPasadas.length > 0 ? (
            bodega.ordenesPasadas.map((orden) => (
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
                  {orden.codigo}
                </Link>
              </p>
            ))
          ) : (
            <p>No hay ordenes finalizadas</p>
          )}
        </Row> */}
        <Row className="pdl-15">
          <button onClick={crearCotizacion} className="eliminarBodega">
            Crear cotizacion
          </button>
          <button onClick={crearOrden} className="eliminarBodega">
            Crear orden
          </button>
        </Row>
      </Row>
    </div>
  );
}

export default BodegaDetail;
