import React, { useState } from "react";
import ActividadTable from "./ActividadTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../../Pagination";
import { useHistory, useParams } from "react-router-dom";
import "./ActividadList.css";
import usePagination from "../../../hooks/usePagination";

function ActividadList(props) {
  const { id, idB, idOr } = useParams();
  const history = useHistory();

  let urlResource = `/ordenes/${idOr}/actividades`;
  let urlCount = `/ordenes/${idOr}/actividades/cantidad`;

  const {
    loading,
    resource,
    currentPage,
    setCurrentPage,
    countResources,
    resourcesPerPage,
    setResourcesPerPage,
  } = usePagination(urlResource, urlCount);

  const remisiones = resource;
  const remisionesPerPage = resourcesPerPage;
  const setRemisionesPerPage = setResourcesPerPage;
  const countRemisiones = countResources;

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setRemisionesPerPage(value);
  };

  const crearRemision = () => {
    history.push(`remisiones/create`);
  };

  const crearDevolucion = () => {
    history.push(`devoluciones/create`);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="actividad-wrapper">
            <Row className="mb-4">
              <label>
                Mostrar{" "}
                <select value={remisionesPerPage} onChange={cambiarDisplay}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                registros
              </label>
            </Row>
            <Row>
              <Col>
                <ActividadTable actividades={remisiones} loading={loading} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  elementsPerPage={remisionesPerPage}
                  numberPages={Math.ceil(countRemisiones / remisionesPerPage)}
                  hide={loading}
                />
              </Col>
            </Row>
            <Row className="mb-4 center">
              <Col>
                <button className="btn-reg blue" onClick={crearRemision}>
                  Registrar Remisión
                </button>
                {/* <Link
                  className="button-actividad "
                  to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/remisiones/create`}
                >
                  Registrar una remision
                </Link> */}
              </Col>
              <Col>
                <button className="btn-reg blue" onClick={crearDevolucion}>
                  Registrar Devolución
                </button>
                {/* <Link
                  className="button-actividad center"
                  to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/devoluciones/create`}
                >
                  Registrar una devolucion
                </Link> */}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ActividadList;
