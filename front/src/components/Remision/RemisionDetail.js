import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Remision.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquiposRemision from "./EquiposRemision";
import formatoFechas from "../utils/FormatoFechas";
import { formatoHora } from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

function RemisionDetail(props) {
  const { id, idB, idOr, idR } = useParams();
  const [remision, setRemision] = useState({});
  const [orden, setOrden] = useState({});
  const [bodega, setBodega] = useState({});
  const [tercero, setTercero] = useState({});

  useEffect(() => {
    fetchRemision();
    fetchOrden();
    fetchBodega();
    fetchTercero();
  }, []);

  const fetchRemision = async () => {
    let res = await fetch(`/remisiones/${idR}`);
    const newRemision = await res.json();
    //console.log("newRemision", newRemision);
    setRemision(newRemision);
  };

  const fetchOrden = async () => {
    let res = await fetch(`/ordenes/${idOr}`);
    const newOrden = await res.json();
    //console.log("newOrden", newOrden);
    setOrden(newOrden);
  };

  const fetchBodega = async () => {
    let res = await fetch(`/bodegas/${idB}`);
    const newBodega = await res.json();
    //console.log("newBodega", newBodega);
    setBodega(newBodega);
  };

  const fetchTercero = async () => {
    let res = await fetch(`/terceros/${id}`);
    const newTercero = await res.json();
    //console.log("newTercero", newTercero);
    setTercero(newTercero);
  };

  return (
    <div className="remision-registrar-wrapper ">
      <div className="remision-registrar-card ">
        <h4 className="titulo">Remisión No. {remision.codigo}</h4>

        <Row>
          <Col>
            <p>
              <b>Fecha y hora de salida : </b>{" "}
              {formatoFechas(remision.fechaSalida) +
                " " +
                formatoHora(remision.fechaSalida)}
            </p>
          </Col>
          <Col>
            <p>
              <b>Fecha y hora de llegada : </b>
              {formatoFechas(remision.fechaLlegada) +
                " " +
                formatoHora(remision.fechaLlegada)}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="capitalize">
              <b>Tercero : </b>{" "}
              <Link to={`/terceros/${tercero._id}`}>{tercero.nombre}</Link>
            </p>
          </Col>
          <Col>
            <p className="capitalize">
              <b>Bodega : </b>{" "}
              {bodega.nombreBodega +
                " - " +
                bodega.direccionBodega +
                ", " +
                bodega.municipio}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="capitalize">
              <b>Obra : </b> {orden.codigoObra}
            </p>
          </Col>
          <Col>
            <p>
              <b>Orden : </b>{" "}
              <Link
                to={
                  "/terceros/" +
                  tercero._id +
                  "/bodegas/" +
                  bodega._id +
                  "/ordenes/" +
                  orden._id
                }
              >
                {orden.codigo}
              </Link>
            </p>
          </Col>
        </Row>

        <br />
        <div>
          <Row>
            <Col className="center ">
              <p>
                <b>Equipos enviados</b>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <EquiposRemision
                equiposEnRemision={remision.equiposEnRemision}
              ></EquiposRemision>
            </Col>
          </Row>
        </div>
        <br />
        <div>
          <Row>
            <Col>
              <p>
                <b>
                  Trasporte asumido por{" "}
                  {remision.asumidoTercero ? "el tercero" : "Equipos ARCO"}
                </b>
              </p>
            </Col>
          </Row>
        </div>
        {!remision.asumidoTercero && [
          <Row key="1">
            <Col>
              <div className="capitalize">
                <p>
                  <b>Vehículo : </b>
                  {remision.vehiculoTransportador &&
                    remision.vehiculoTransportador.marca +
                      " " +
                      remision.vehiculoTransportador.modelo +
                      " - " +
                      remision.vehiculoTransportador.placa}
                </p>
              </div>
            </Col>
            <Col key="2">
              <div className="capitalize">
                <p>
                  <b>Conductor : </b>
                  {remision.conductor && remision.conductor.nombres}{" "}
                  {remision.conductor && remision.conductor.apellidos} -{" "}
                  {remision.conductor && remision.conductor.tipoDocumento}{" "}
                  {remision.conductor && remision.conductor.numeroDocumento}{" "}
                </p>
              </div>
            </Col>
          </Row>,
          <Row key="3">
            <Col>
              <div className="form-group">
                <p>
                  <b>Costo : </b>
                  {formatoPrecios(remision.costoTransporte)}
                </p>
              </div>
            </Col>
          </Row>,
        ]}
      </div>
    </div>
  );
}

export default RemisionDetail;
