import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Tercero.css";
import BodegaDetail from "./BodegaDetail";
import { useHistory } from "react-router-dom";

function TerceroDetail({ match }) {
  const params = match.params;
  const history = useHistory();
  const [tercero, setTercero] = useState({});
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    fetchTercero();
  }, [bodegas]);

  const fetchTercero = async () => {
    const res = await fetch("/terceros/" + params.id);
    const terceroActual = await res.json();
    //console.log(terceroActual);
    setTercero(terceroActual);
  };

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  const formatDate = (fecha) => {
    if (fecha) {
      const date = new Date(fecha);
      return `${date.getDate()}/${(
        date.getMonth() + 1
      ).toString()}/${date.getFullYear()}`;
    }
  };

  const crearBodega = () => {
    history.push(`${tercero._id}/bodegas/create`);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="tercero-wrapper">
            <h3 id="titulos">{capitalize(tercero.nombre || "")}</h3>
            <p className="mb-2 text-muted">
              {(tercero.tipoDocumento || "").toString().toUpperCase()}:{" "}
              {tercero.numeroDocumento}
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={7}>
          <div id="bodega-wrapper">
            <Row>
              <Col>
                <h4 id="titulos">Bodegas</h4>
              </Col>
              <Col id="agregarBodega">
                <button onClick={crearBodega} className="buttonTercero">
                  Agregar una bodega
                </button>
              </Col>
            </Row>
            {tercero.bodegas &&
              tercero.bodegas.map((bodega) => (
                <BodegaDetail
                  setBodegas={setBodegas}
                  key={bodega._id}
                  bodega={bodega}
                  tercero={tercero}
                ></BodegaDetail>
              ))}
          </div>
        </Col>
        <Col>
          <div id="info-wrapper">
            <h4 id="titulos">Información</h4>
            <p>
              <strong>Nombre : </strong>
              {capitalize(tercero.nombre || "")}
            </p>
            <p>
              <strong>
                {(tercero.tipoDocumento || "").toString().toUpperCase()} :{" "}
              </strong>
              {tercero.numeroDocumento}
            </p>
            <p>
              <strong>Email : </strong>
              {tercero.email}
            </p>
            <p>
              <strong>Telefono : </strong>
              {tercero.telefono}
            </p>
            <p>
              <strong>Celular : </strong>
              {tercero.celular}
            </p>
            <p>
              <strong>Fecha de registro : </strong>
              {formatDate(tercero.fechaCreacion)}
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <button className="eliminarTer">Eliminar Tercero</button>
      </Row>
    </Container>
  );
}

export default TerceroDetail;
