import React, { useState, useContext } from "react";
import EquipoTable from "./EquipoTable";
import { ContextEquipoList } from "./withEquipoList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import "./EquipoList.css";
import usePagination from "../../../hooks/usePagination";

function Equipo(props) {
  const { noCompuesto } = useContext(ContextEquipoList);
  let urlResource = `/equipos`;
  let urlCount = "/equipos/cantidad";
  if (noCompuesto) {
    urlResource = `/equipos/darNoCompuestos`;
    urlCount = "/equipos/cantidadNoCompuesta";
  }
  const {
    loading,
    resource,
    currentPage,
    setCurrentPage,
    countResources,
    resourcesPerPage,
    setResourcesPerPage,
  } = usePagination(urlResource, urlCount);

  const equipos = resource;
  const equiposPerPage = resourcesPerPage;
  const setEquiposPerPage = setResourcesPerPage;
  const countEquipos = countResources;

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setEquiposPerPage(value);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="equipo-wrapper">
            <Row className="mb-4">
              <Link className="buttonAction" to={"/inventario/crearEquipo"}>
                Agregar un equipo
              </Link>
            </Row>
            <Row className="mb-4">
              <label>
                Mostrar{" "}
                <select value={equiposPerPage} onChange={cambiarDisplay}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                equipos
              </label>
            </Row>
            <Row>
              <Col>
                <EquipoTable equipos={equipos} loading={loading} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  elementsPerPage={equiposPerPage}
                  numberPages={Math.ceil(countEquipos / equiposPerPage)}
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

export default Equipo;
