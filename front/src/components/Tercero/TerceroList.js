import React, { useState, useEffect } from "react";
import "./Tercero.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TerceroTable from "./TerceroTable";
import Pagination from "../Pagination";
import { useHistory } from "react-router-dom";

function Tercero() {
  const [terceros, setTerceros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tercerosPerPage, setTercerosPerPage] = useState(10);
  const [countTerceros, setCountTerceros] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
    let url = `/terceros/${currentPage}/${tercerosPerPage}`;
    if (tercerosPerPage == -1) {
      url = `/terceros`;
    }
    const res = await fetch(url);
    const newTerceros = await res.json();
    setTerceros(newTerceros);
    setLoading(false);
  };

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setTercerosPerPage(value);
  };

  const crearTercero = () => {
    history.push("/terceros/crear_tercero");
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
          <div id="tercero-wrapper">
            <Row id="espacio">
              <button id="link" onClick={crearTercero}>
                Agregar un tercero
              </button>
            </Row>
            <Row id="espacio">
              <label>
                Mostrar{" "}
                <select value={tercerosPerPage} onChange={cambiarDisplay}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                terceros
              </label>
            </Row>
            <Row id="espacio">
              <TerceroTable terceros={terceros} loading={loading} />
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Tercero;
