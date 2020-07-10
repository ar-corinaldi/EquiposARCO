import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrecioTable from "./PrecioTable";
import EquipoDetailBadges from "./EquipoDetailBadges";
import Container2Components from "../../Container2Components";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import formatoPrecios from "../../utils/FormatoPrecios";
import PropiedadesDetail from "./PropiedadDetail";
import ComponenteDetail from "./ComponenteDetail";

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
      <Row className="d-flex justify-content-around">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <h6>
                Costo Equipo: {formatoPrecios(equipo.costoEquipo) || "$0.00"}
              </h6>
            </li>
            <li className="breadcrumb-item">
              <h6>
                Precio Reposicion:{" "}
                {formatoPrecios(equipo.precioReposicion) || "$0.00"}
              </h6>
            </li>
          </ol>
        </nav>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <h6>{equipo.tipoEquipo}</h6>
            </li>
            <li className="breadcrumb-item">
              <h6>{equipo.nombreFamilia}</h6>
            </li>
            <li className="breadcrumb-item">
              <h6>{equipo.nombreGrupo}</h6>
            </li>
          </ol>
        </nav>
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
          <Container2Components
            componentes={[
              () => <ComponenteDetail componentes={equipo.componentes} />,
              () => <PropiedadesDetail equipo={equipo} />,
            ]}
            nombres={["Componentes", "Propiedades"]}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoDetail;
