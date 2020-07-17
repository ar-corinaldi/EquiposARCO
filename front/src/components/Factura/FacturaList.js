import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Pagination from "../Pagination";
import usePagination from "../../hooks/usePagination";
import formatoFechas from "../utils/FormatoFechas";
import { Link } from "react-router-dom";
function FacturaList(props) {
  const {
    loading,
    resource,
    setResource,
    currentPage,
    setCurrentPage,
    countResources,
    resourcesPerPage,
    setResourcesPerPage,
  } = usePagination("/facturas", "/facturas/cantidad");

  const facturas = resource;
  const facturasPerPage = resourcesPerPage;
  const setFacturasPerPage = setResourcesPerPage;
  const countFacturas = countResources;

  const cambiarDisplay = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    setFacturasPerPage(value);
  };

  if (loading) return loading;

  if (!facturas || facturas.length === 0) {
    return <div>No hay facturas para mostrar</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div id="equipo-wrapper">
            <Row className="mb-4">
              <label>
                Mostrar{" "}
                <select value={facturasPerPage} onChange={cambiarDisplay}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="-1">Todos</option>
                </select>{" "}
                facturas
              </label>
            </Row>
            <Row>
              <Col>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fecha de Emision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura, index) => (
                      <tr key={factura._id}>
                        <td>
                          <Link to={`/facturacion/${factura._id}`}>
                            {index + 1}
                          </Link>
                        </td>
                        <td>{formatoFechas(factura.fechaEmision)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  elementsPerPage={facturasPerPage}
                  numberPages={Math.ceil(countFacturas / facturasPerPage)}
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

export default FacturaList;
