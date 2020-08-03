import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Orden.css";
import { useParams, Link } from "react-router-dom";
import EquiposTable from "./EquiposTable";
import ActividadReciente from "./ActividadReciente";
import formatoFechas from "../utils/FormatoFechas";
import { useHistory } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { calcularPorEnviarPorDevolver } from "../Actividades/CalcularEquipos";
import useFetchAPI from "../../hooks/useFetchAPI";

function OrdenDetail(props) {
  const history = useHistory();

  const { id, idB, idOr } = useParams();

  const [statusOr, setStatus] = useState("");
  const [equipos, setEquipos] = useState([]);

  const terceroAPI = useFetchAPI(`/terceros/${id}`, []);
  const tercero = terceroAPI.resource;

  const bodegaAPI = useFetchAPI(`/bodegas/${idB}`, []);
  const bodega = bodegaAPI.resource;

  const ordenAPI = useFetchAPI(`/ordenes/${idOr}`, []);
  const orden = ordenAPI.resource;
  console.log("orden", orden);

  useEffect(() => {
    const equiposN = calcularPorEnviarPorDevolver(orden);
    setEquipos(equiposN);
    orden && orden.fechaFin ? setStatus("Finalizada") : setStatus("En curso");
  }, [orden]);

  const crearRemision = () => {
    history.push(`${orden._id}/remisiones/create`);
  };

  const crearDevolucion = () => {
    history.push(`${orden._id}/devoluciones/create`);
  };

  const verActividad = () => {
    history.push(`${orden._id}/actividad`);
  };

  if (terceroAPI.loading || bodegaAPI.loading || ordenAPI.loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!tercero) {
    return terceroAPI.notFound("No se encontro tercero con este id");
  }
  if (!bodega) {
    return bodegaAPI.notFound("No se encontro bodega con este id");
  }
  if (!orden) {
    return ordenAPI.notFound("No se encontro orden con este id");
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="orden-wrapper">
            <h3 className="page-title-orden">Orden No. {orden.codigo}</h3>
            <Row>
              <Col>
                <p className="capitalize">
                  <b>Tercero : </b>
                  <Link to={`/terceros/${tercero._id}`}>{tercero.nombre}</Link>
                </p>
                <p className="capitalize">
                  <b>Bodega : </b> {bodega.nombreBodega}
                </p>
                <p className="capitalize">
                  <b>Obra : </b>
                  <Link
                    to={`/terceros/${tercero._id}/bodegas/${bodega._id}/obras/${orden.codigoObra}`}
                  >
                    {orden.codigoObra}
                  </Link>
                </p>
                <p>
                  <b>Fecha Inicial :</b> {formatoFechas(orden.fechaInicio)}
                </p>
              </Col>
              <Col>
                <p>
                  <b>Cotizacion :</b>{" "}
                  <Link
                    to={`/terceros/${id}/cotizaciones/${
                      orden.cotizacion && orden.cotizacion._id
                    }`}
                  >
                    {orden.cotizacion && orden.cotizacion.codigo}{" "}
                  </Link>
                </p>
                <p>
                  <b>Status :</b> {statusOr}{" "}
                </p>
                <p className="capitalize">
                  <br />
                </p>
                <p>
                  <b>Fecha Final :</b>{" "}
                  {orden.fechaFin ? formatoFechas(orden.fechaFin) : "N/A"}
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={9}>
          <div className="mgl-10">
            <Row>
              <Col>
                <button className="btn-reg blue" onClick={crearRemision}>
                  Registrar Remisión
                </button>
              </Col>
              <Col>
                <button className="btn-reg blue" onClick={crearDevolucion}>
                  Registrar Devolución
                </button>
              </Col>
            </Row>
          </div>
          <Row>
            <div className="orden-wrapper" id="orden-equipos-wrapper">
              <h4 className="page-title-orden">Equipos</h4>
              <EquiposTable
                equipos={equipos}
                tarifas={orden.tarifasDefinitivas}
              ></EquiposTable>
            </div>
          </Row>
        </Col>
        <Col>
          <Row>
            <div className="orden-wrapper" id="orden-actividad-wrapper">
              <Row>
                <Col>
                  <h4 className="page-title-orden">Actividad reciente</h4>
                </Col>
                <Col md="auto">
                  <button className="button-icon" onClick={verActividad}>
                    <FaEllipsisV></FaEllipsisV>
                  </button>
                </Col>
              </Row>

              <Row className="scrollable">
                <Col>
                  <ActividadReciente
                    orden={orden}
                    id={id}
                    idB={idB}
                    idOr={idOr}
                  ></ActividadReciente>{" "}
                </Col>
              </Row>
            </div>
          </Row>
          <Row>
            <div className="orden-wrapper" id="orden-actividad-wrapper">
              <h4 className="page-title-orden">Cartera</h4>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default OrdenDetail;
