import React, { useState, useContext } from "react";
import OrdenTable from "./OrdenTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import "./OrdenList.css";
import usePagination from "../../../hooks/usePagination";

function OrdenList(props) {
  let urlResource = `/ordenes`;
  let urlCount = "/ordenes/cantidad";

  const {
    loading,
    resource,
    currentPage,
    setCurrentPage,
    countResources,
    resourcesPerPage,
    setResourcesPerPage,
  } = usePagination(urlResource, urlCount);

  const ordenes = resource;
  const ordenesPerPage = resourcesPerPage;
  const setOrdenesPerPage = setResourcesPerPage;
  const countOrdenes = countResources;

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setOrdenesPerPage(value);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="orden-wrapper">
            <Row className="mb-4">
              <Link className="buttonAction" to={"/facturar/crear_orden"}>
                Crear una orden
              </Link>
            </Row>
            <Row className="mb-4">
              <label>
                Mostrar{" "}
                <select value={ordenessPerPage} onChange={cambiarDisplay}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                ordenes
              </label>
            </Row>
            <Row>
              <Col>
                <OrdenTable ordenes={ordenes} loading={loading} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  elementsPerPage={ordenesPerPage}
                  numberPages={Math.ceil(countOrdenes / ordenesPerPage)}
                  hide={loading}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrdenList;
