import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Precio from "./Precio";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function EquipoDetail(props) {
  const [equipo, setEquipo] = useState({});
  const [loading, setLoading] = useState(false);
  let { idEquipo } = useParams();

  useEffect(() => {
    fetchEquipoDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEquipoDetail = async () => {
    setLoading(true);
    const url = `/equipos/${idEquipo}`;
    const res = await fetch(url);
    const newEquipo = await res.json();
    setEquipo(newEquipo);
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            {equipo.nombreEquipo} ({equipo.codigo})
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">{equipo.tipoEquipo}</li>
              <li className="breadcrumb-item">{equipo.nombreFamilia}</li>
              <li className="breadcrumb-item">{equipo.nombreGrupo}</li>
            </ol>
          </nav>
        </Col>
      </Row>
      <Row className="d-flex justify-content-around">
        <h5>
          <span className="badge badge-success">
            Total de Equipo: {equipo.cantidadTotal}
          </span>
        </h5>
        <h5>
          <span className="badge badge-info">
            En Bodega: {equipo.cantidadBodega}
          </span>
        </h5>
        <h5>
          <span className="badge badge-warning">
            Alquilado/Vendido: {equipo.cantidadTotal - equipo.cantidadBodega}
          </span>
        </h5>
      </Row>
      <Row>
        <Col>
          {equipo.precios &&
            equipo.precios.map((precio) => (
              <Precio key={precio._id} precio={precio} />
            ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Peso</td>
                <td>{equipo.peso}</td>
              </tr>
              <tr>
                <td>Ancho</td>
                <td>{equipo.ancho}</td>
              </tr>
              <tr>
                <td>Alto</td>
                <td>{equipo.alto}</td>
              </tr>
              <tr>
                <td>Largo</td>
                <td>{equipo.largo}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoDetail;
