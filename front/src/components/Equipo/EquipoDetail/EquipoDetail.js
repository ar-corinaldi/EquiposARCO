import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrecioTable from "./PrecioTable";
import EquipoDetailBadges from "./EquipoDetailBadges";
import PropiedadesComponentesContainer from "./PropiedadesComponentesContainer";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function EquipoDetail() {
  const [equipo, setEquipo] = useState({});
  const [loading, setLoading] = useState(false);
  let { idEquipo } = useParams();

  useEffect(() => {
    fetchEquipoDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEquipoDetail = async () => {
    try {
      setLoading(true);
      const url = `/equipos/${idEquipo}`;
      const res = await fetch(url);
      const newEquipo = await res.json();
      setEquipo(newEquipo);
      setLoading(false);
    } catch (e) {
      setLoading(null);
    }
  };
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (loading === null) {
    return <div>No se encontro equipo con este id</div>;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>
            {equipo.nombreEquipo &&
              equipo.nombreEquipo[0].toUpperCase() +
                equipo.nombreEquipo.slice(1)}
            ({equipo.codigo && equipo.codigo.toUpperCase()})
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
        <EquipoDetailBadges
          cantidadTotal={equipo.cantidadTotal}
          cantidadBodega={equipo.cantidadBodega}
          cantidadUsado={equipo.cantidadTotal - equipo.cantidadBodega}
        />
      </Row>
      <Row>
        <Col>
          <PrecioTable precios={equipo.precios || []} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PropiedadesComponentesContainer equipo={equipo} />
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoDetail;
