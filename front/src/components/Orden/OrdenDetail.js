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

function OrdenDetail(props) {
  const history = useHistory();

  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [statusOr, setStatus] = useState("");
  const [tercero, setTercero] = useState({});
  const [bodega, setBodega] = useState({});
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  /*
   * Obtener el tercero, la bodega y la orden
   */
  const fetchInfo = async () => {
    let res = await fetch("/terceros/" + id);
    const terceroA = await res.json();
    //console.log("tercero", terceroA);
    setTercero(terceroA);

    // res = await fetch("/bodegas/" + idB);
    // const bodegaA = await res.json();
    // console.log("bodega", bodegaA);
    // setBodega(bodegaA);
    // res = await fetch("/ordenes/" + idOr);
    // const ordenA = await res.json();
    // console.log("orden", ordenA);
    // setOrden(ordenA);

    let bodegaA;
    terceroA.bodegas.forEach((bod) => {
      if (bod._id.toString() === idB) {
        bodegaA = bod;
      }
    });
    //console.log("bodega", bodegaA);
    setBodega(bodegaA);
    let ordenA;
    bodegaA.ordenesActuales.forEach((or) => {
      if (or._id.toString() === idOr) {
        fetchInfoOrden();
        setStatus("En curso");
        return;
      }
    });
    if (!ordenA) {
      bodegaA.ordenesPasadas.forEach((or) => {
        if (or._id.toString() === idOr) {
          fetchInfoOrden();
          setStatus("Terminada");
          return;
        }
      });
    }
    // console.log("orden", ordenA);
    // console.log("status", statusOr);
    // setOrden(ordenA);
  };

  /*
   * Obtener la orden con las tarifas pobladas
   */

  const fetchInfoOrden = async () => {
    //console.log("llegaOrdenes");
    let res = await fetch(`/ordenes/${idOr}`);
    const ordenA = await res.json();
    //console.log("orden", ordenA);
    setOrden(ordenA);
    const equipoA = calcularPorEnviarPorDevolver(ordenA);
    setEquipos(equipoA);
  };

  const crearRemision = () => {
    history.push(`${orden._id}/remisiones/create`);
  };

  const crearDevolucion = () => {
    history.push(`${orden._id}/devoluciones/create`);
  };

  const verActividad = () => {
    history.push(`${orden._id}/actividad`);
  };

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
                  <b>Obra : </b> {orden.codigoObra}
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
                  <b>Fecha Final :</b> {formatoFechas(orden.fechaFin)}
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
