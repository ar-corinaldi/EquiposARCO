import React, { useState, useEffect } from "react";
import "./Tercero.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import TerceroTable from "./TerceroTable";
import Pagination from "../Pagination";

function Tercero() {
  const [terceros, setTerceros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tercerosPerPage] = useState(3);
  const [countTerceros, setCountTerceros] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTerceros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, tercerosPerPage]);

  useEffect(() => {
    fetchCountTerceros();
  }, []);

  const fetchCountTerceros = async () => {
    const res = await fetch("/terceros/cantidad");
    const newCount = await res.json();
    setCountTerceros(parseInt(newCount));
  };

  const fetchTerceros = async () => {
    setLoading(true);
    const url = `/terceros/${currentPage}/${tercerosPerPage}`;
    const res = await fetch(url);
    const newTerceros = await res.json();
    setTerceros(newTerceros);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card body>
            <TerceroTable terceros={terceros} loading={loading} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            elementsPerPage={tercerosPerPage}
            numberPages={Math.ceil(countTerceros / tercerosPerPage)}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Tercero;
