import React, { useState, useEffect } from "react";
import NotaInventarioTable from "./NotaInventarioTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import Toast from "../Toast";

function NotaInventarioList(props) {
  const [notasInventario, setNotasInventario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notasInventarioPerPage, setNotasInventarioPerPage] = useState(10);
  const [countNotasInventario, setCountNotasInventario] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotaInventario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, notasInventarioPerPage]);

  useEffect(() => {
    fetchCantidad();
  }, []);

  const fetchCantidad = async () => {
    const res = await fetch("/notasInventario/cantidad");
    const newCount = await res.json();
    setCountNotasInventario(parseInt(newCount));
  };

  const fetchNotaInventario = async () => {
    try {
      setLoading(true);
      const url = `/notasInventario/${currentPage}/${notasInventarioPerPage}`;
      const res = await fetch(url);
      const dataInventario = await res.json();
      if (!res.ok) {
        Toast(dataInventario, false, 500);
      } else {
        setNotasInventario(dataInventario);
        setLoading(false);
      }
    } catch (e) {
      setNotasInventario([]);
      setLoading(false);
      Toast(["Error del sistema"], true, 500);
    }
  };

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setNotasInventarioPerPage(value);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="equipo-wrapper">
            <Row className="mb-4">
              <Link
                className="buttonEquipo"
                to={"/inventario/crearNotaInventario"}
              >
                Agregar una nota de inventario
              </Link>
            </Row>
            <Row className="mb-4">
              <label>
                Mostrar{" "}
                <select
                  value={notasInventarioPerPage}
                  onChange={cambiarDisplay}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                notas de inventario
              </label>
            </Row>
            <Row>
              <Col>
                <NotaInventarioTable
                  notasInventario={notasInventario}
                  loading={loading}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  elementsPerPage={notasInventarioPerPage}
                  numberPages={Math.ceil(
                    countNotasInventario / notasInventarioPerPage
                  )}
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

export default NotaInventarioList;
