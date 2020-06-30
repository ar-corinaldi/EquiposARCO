import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link, useRouteMatch } from "react-router-dom";
import "./Tercero.css";

function TerceroDetail({ match }) {
  const params = match.params;

  //const { url } = useRouteMatch();

  const [tercero, setTercero] = useState({});
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    fetchTercero();
    fetchBodegas();
  }, []);

  const fetchTercero = async () => {
    const res = await fetch("/terceros/" + params.id);
    const terceroActual = await res.json();
    //console.log(terceroActual);
    setTercero(terceroActual);
  };

  const fetchBodegas = async () => {
    const res = await fetch("/terceros/" + params.id + "/bodegas");
    const bodegasActuales = await res.json();
    //console.log(bodegasActuales);
    setBodegas(bodegasActuales);
  };

  const fetchOrdenes = async () => {
    //const res = await fetch("/terceros/" + params.id + "/bodegas");
    //const bodegasActuales = await res.json();
    //console.log(bodegasActuales);
    //setBodegas(bodegasActuales);
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

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{capitalize(tercero.nombre || "")}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {(tercero.tipoDocumento || "").toString().toUpperCase()}:{" "}
                {tercero.numeroDocumento}
              </Card.Subtitle>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={7}>
          <Card>
            <Card.Body>
              <Card.Title>Bodegas</Card.Title>
              {bodegas.map((bodega) => (
                <Row key={bodega._id}>
                  <Col className="bodega-cliente">
                    <p>
                      <strong> Nombre : </strong>
                      {bodega.nombreBodega}
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
                    <Row>
                      <Col>
                        <strong> Órdenes en curso : </strong>
                        {bodega.ordenesActuales.map((orden) => (
                          <Row key={orden}>
                            <Col>
                              <p>
                                <Link to={"/terceros/ordenes/" + orden}>
                                  {orden}
                                </Link>
                              </p>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong> Órdenes finalizadas : </strong>
                        {bodega.ordenesPasadas.map((orden) => (
                          <Row key={orden._id}>
                            <Col>
                              <Link to={"/terceros/ordenes/" + orden}>
                                {orden}
                              </Link>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Información</Card.Title>
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
                <strong>Pagina Web : </strong>
                {tercero.paginaWeb}
              </p>
              <p>
                <strong>Fecha de registro : </strong>
                {formatDate(tercero.fechaCreacion)}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TerceroDetail;
