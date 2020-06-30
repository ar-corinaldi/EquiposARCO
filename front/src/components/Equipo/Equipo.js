import React, { useState, useEffect } from "react";
import EquipoFilter from "./EquipoFilter";
import EquipoTable from "./EquipoTable";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Equipo(props) {
  const [equipos, setEquipos] = useState([]);
  const [filterText, setFilterText] = useState("");

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
        {equipos.length > 0 ? (
          <EquipoTable equipos={equipos} filterText={filterText} />
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Equipo;
