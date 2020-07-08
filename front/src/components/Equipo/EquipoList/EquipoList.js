import React, { useState, useEffect } from "react";
import EquipoFilter from "./EquipoFilter";
import EquipoTable from "./EquipoTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import Toast from "../../Toast";
import "./EquipoList.css";
function Equipo(props) {
  const [equipos, setEquipos] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [equiposPerPage, setEquiposPerPage] = useState(10);
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
    try {
      setLoading(true);
      const url = `/equipos/${currentPage}/${equiposPerPage}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errors = await res.json();
        setEquipos([]);
        setLoading(false);
        Toast(errors, true, res.status);
      } else {
        const newEquipos = await res.json();
        setEquipos(newEquipos);
        setLoading(false);
      }
    } catch (e) {
      setEquipos([]);
      setLoading(false);
      Toast(["Error del sistema"], true, 500);
    }
  };

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
            <Row>
              <EquipoFilter
                filterText={filterText}
                setFilterText={setFilterText}
              />
            </Row>
            <Row className="mb-4">
              <Link className="buttonEquipo" to={"/inventario/crearEquipo"}>
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
                <EquipoTable
                  equipos={equipos}
                  filterText={filterText}
                  loading={loading}
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
