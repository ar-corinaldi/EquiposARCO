import React, { useState, useEffect } from "react";
import EquipoFilter from "./EquipoFilter";
import EquipoTable from "./EquipoTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../Pagination";
function Equipo(props) {
  const [equipos, setEquipos] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = new useState(1);
  const [equiposPerPage] = new useState(2);

  useEffect(() => {
    console.log("Aqui un fetch a la base de datos");
  }, [currentPage]);

  useEffect(() => {
    fetchEquipos();
  }, []);

  const fetchEquipos = async () => {
    const res = await fetch("/equipos");
    const newEquipos = await res.json();
    setEquipos(newEquipos);
  };

  return (
    <Container>
      <Row>
        <EquipoFilter filterText={filterText} setFilterText={setFilterText} />
      </Row>
      <Row>
        <Col>
          {equipos.length > 0 ? (
            <EquipoTable equipos={equipos} filterText={filterText} />
          ) : (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            elementsPerPage={equiposPerPage}
            numberPages={10}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Equipo;
