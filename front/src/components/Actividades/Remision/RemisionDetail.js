import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Remision.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquiposRemision from "./EquiposRemision";
import formatoFechas from "../../utils/FormatoFechas";
import { formatoHora } from "../../utils/FormatoFechas";
import formatoPrecios from "../../utils/FormatoPrecios";
import useFetchAPI from "../../../hooks/useFetchAPI";

function RemisionDetail(props) {
  const { id, idB, idOr, idR } = useParams();

  const terceroAPI = useFetchAPI(`/terceros/${id}`, []);
  const tercero = terceroAPI.resource;

  const bodegaAPI = useFetchAPI(`/bodegas/${idB}`, []);
  const bodega = bodegaAPI.resource;

  const ordenAPI = useFetchAPI(`/ordenes/${idOr}`, []);
  const orden = ordenAPI.resource;

  const remisionAPI = useFetchAPI(`/remisiones/${idR}`, []);
  const remision = remisionAPI.resource;

  if (
    terceroAPI.loading ||
    bodegaAPI.loading ||
    ordenAPI.loading ||
    remisionAPI.loading
  ) {
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
  if (!remision) {
    return ordenAPI.notFound("No se encontro remision con este id");
  }
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
              <EquiposRemision remision={remision}></EquiposRemision>
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
