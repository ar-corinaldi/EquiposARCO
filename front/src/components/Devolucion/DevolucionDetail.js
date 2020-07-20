import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Devolucion.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquiposDevolucion from "./EquiposDevolucion";
import formatoFechas from "../utils/FormatoFechas";
import { formatoHora } from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

function DevolucionDetail(props) {
  const { id, idB, idOr, idD } = useParams();
  const [devolucion, setDevolucion] = useState({});

  const [orden, setOrden] = useState({});
  const [bodega, setBodega] = useState({});
  const [tercero, setTercero] = useState({});

  useEffect(() => {
    fetchDevolucion();
    fetchOrden();
    fetchBodega();
    fetchTercero();
  }, []);

  const fetchDevolucion = async () => {
    let res = await fetch(`/devoluciones/${idD}`);
    const newDevolucion = await res.json();
    console.log("newDevolucion", newDevolucion);
    setDevolucion(newDevolucion);
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
    <div className="devolucion-registrar-wrapper ">
      <div className="devolucion-registrar-card ">
        <h4 className="titulo">Remisión No. {devolucion.codigo}</h4>

        <Row>
          <Col>
            <p>
              <b>Fecha y hora de salida : </b>{" "}
              {formatoFechas(devolucion.fechaSalida) +
                " " +
                formatoHora(devolucion.fechaSalida)}
            </p>
          </Col>
          <Col>
            <p>
              <b>Fecha y hora de llegada : </b>
              {formatoFechas(devolucion.fechaLlegada) +
                " " +
                formatoHora(devolucion.fechaLlegada)}
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
              <EquiposDevolucion
                equiposEnDevolucion={devolucion.equiposEnDevolucion}
              ></EquiposDevolucion>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col>
              <p>
                <b>
                  Trasporte asumido por{" "}
                  {devolucion.asumidoTercero ? "el tercero" : "Equipos ARCO"}
                </b>
              </p>
            </Col>
          </Row>
        </div>
        {!devolucion.asumidoTercero && [
          <Row key="1">
            <Col>
              <div className="capitalize">
                <p>
                  <b>Vehículo : </b>
                  {devolucion.vehiculoTransportador &&
                    devolucion.vehiculoTransportador.marca +
                      " " +
                      devolucion.vehiculoTransportador.modelo +
                      " - " +
                      devolucion.vehiculoTransportador.placa}
                </p>
              </div>
            </Col>
            <Col key="2">
              <div className="capitalize">
                <p>
                  <b>Conductor : </b>
                  {devolucion.conductor && devolucion.conductor.nombres}{" "}
                  {devolucion.conductor && devolucion.conductor.apellidos} -{" "}
                  {devolucion.conductor && devolucion.conductor.tipoDocumento}{" "}
                  {devolucion.conductor && devolucion.conductor.numeroDocumento}{" "}
                </p>
              </div>
            </Col>
          </Row>,
          <Row key="3">
            <Col>
              <div className="form-group">
                <p>
                  <b>Costo : </b>
                  {formatoPrecios(devolucion.costoTransporte)}
                </p>
              </div>
            </Col>
          </Row>,
        ]}
      </div>
    </div>
  );
}

export default DevolucionDetail;
