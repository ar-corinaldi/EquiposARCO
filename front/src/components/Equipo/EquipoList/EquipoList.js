import React, { useState, useEffect } from "react";
import EquipoFilter from "./EquipoFilter";
import EquipoTable from "./EquipoTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../../Pagination";
function Equipo(props) {
  const [equipos, setEquipos] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [equiposPerPage] = useState(3);
  const [countEquipos, setCountEquipos] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEquipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, equiposPerPage]);

  useEffect(() => {
    fetchCountEquipos();
  }, []);

  const fetchCountEquipos = async () => {
    const res = await fetch("/equipos/cantidad");
    const newCount = await res.json();
    setCountEquipos(parseInt(newCount));
  };

  const fetchEquipos = async () => {
    setLoading(true);
    const url = `/equipos/${currentPage}/${equiposPerPage}`;
    const res = await fetch(url);
    const newEquipos = await res.json();
    setEquipos(newEquipos);
    setLoading(false);
  };
  return (
    <Container>
      <Row>
        <EquipoFilter filterText={filterText} setFilterText={setFilterText} />
      </Row>
      <Row>
        <Col>
          <EquipoTable
            equipos={equipos}
            filterText={filterText}
            loading={loading}
            setComponentes={props.setComponentes}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            elementsPerPage={equiposPerPage}
            numberPages={Math.ceil(countEquipos / equiposPerPage)}
            hide={equipos.length <= 0}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Equipo;
