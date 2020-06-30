import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
// import TerceroTable from "./TerceroTable";

function TerceroDetail({ match }) {
  const params = match.params;

  const [tercero, setTercero] = useState([]);

  useEffect(() => {
    fetchTercero();
  }, []);

  const fetchTercero = async () => {
    const res = await fetch("/terceros/" + params.id);
    const terceroActual = await res.json();
    console.log(terceroActual);
    setTercero(terceroActual);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{tercero.nombre}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TerceroDetail;
