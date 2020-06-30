import React, { useState, useEffect } from "react";
import "./Tercero.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import TerceroTable from "./TerceroTable";

function Tercero(props) {
  const [terceros, setTerceros] = useState([]);

  useEffect(() => {
    fetchTerceros();
  }, []);

  const fetchTerceros = async () => {
    const res = await fetch("/terceros");
    const newTerceros = await res.json();
    console.log(newTerceros);
    setTerceros(newTerceros);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h4 className="page-title">Terceros</h4>
        </Col>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/">EquiposARCO</Breadcrumb.Item>
            <Breadcrumb.Item href="/terceros">Terceros</Breadcrumb.Item>
            <Breadcrumb.Item href="/terceros/listar_terceros">
              Listar terceros
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body>
            {terceros.length > 0 ? (
              <TerceroTable terceros={terceros} />
            ) : (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Tercero;
