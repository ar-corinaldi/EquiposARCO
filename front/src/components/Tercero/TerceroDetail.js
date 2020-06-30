import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
// import TerceroTable from "./TerceroTable";

function TerceroDetail({ match }) {
  const params = match.params;

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

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

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
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Información</Card.Title>
              <Card.Text>
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
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Card.Title>Bodegas</Card.Title>
              <Card.Text>
                {bodegas.map((bodega) => (
                  <Row key={bodega._id} />
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TerceroDetail;
