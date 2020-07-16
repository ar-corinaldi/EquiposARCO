import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Tercero.css";
import BodegaDetail from "./BodegaDetail";
import { Link, useHistory } from "react-router-dom";
import formatoFechas from "../utils/FormatoFechas";

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
    console.log("terceroActual", terceroActual);
    //console.log("coti", terceroActual.cotizaciones);

    setTercero(terceroActual);
  };

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

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
                <React.Fragment key={bodega._id}>
                  <div>
                    <BodegaDetail
                      setBodegas={setBodegas}
                      bodega={bodega}
                      tercero={tercero}
                    ></BodegaDetail>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </Col>
        <Col>
          <Row>
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
                {formatoFechas(tercero.fechaCreacion)}
              </p>
            </div>
          </Row>
          <Row>
            <div id="info-wrapper">
              <h4 id="titulos">Cotizaciones</h4>
              {tercero.cotizaciones &&
                tercero.cotizaciones.map((cotizacion) => (
                  <p key={cotizacion._id}>
                    <Link
                      to={
                        "/terceros/" +
                        tercero._id +
                        "/cotizaciones/" +
                        cotizacion._id
                      }
                    >
                      {cotizacion._id}
                    </Link>
                  </p>
                ))}
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <button className="eliminarTer">Eliminar Tercero</button>
      </Row>
    </Container>
  );
}

export default TerceroDetail;
