import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Devolucion.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquiposDevolucion from "./EquiposDevolucion";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

function DevolucionDetail(props) {
  const { id, idB, idOr, idD } = useParams();
  const [devolucion, setDevolucion] = useState({});

  useEffect(() => {
    fetchDevolucion();
  }, []);

  const fetchDevolucion = async () => {
    let res = await fetch(`/devoluciones/${idD}`);
    const newDevolucion = await res.json();
    console.log("newDevolucion", newDevolucion);
    setDevolucion(newDevolucion);
  };

  return (
    <div className="devolucion-registrar-wrapper ">
      <div className="devolucion-registrar-card ">
        <h4 className="titulo">Remisión No. {devolucion._id}</h4>
        <Row>
          <Col>
            <p>
              Fecha y hora de salida : {formatoFechas(devolucion.fechaSalida)}
            </p>
          </Col>
          <Col>
            <p>
              Fecha y hora de llegada : {formatoFechas(devolucion.fechaLlegada)}
            </p>
          </Col>
        </Row>
        <div>
          <Row>
            <Col md="auto" className="vertical-center">
              <p>Equipos a trasportar : </p>
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
          <p>
            Trasporte asumido por{" "}
            {devolucion.asumidoTercero ? "el tercero" : "Equipos ARCO"}
          </p>
        </div>
        {!devolucion.asumidoTercero && [
          <div key="1" className="capitalize">
            <p>
              Vehículo :{" "}
              {devolucion.vehiculoTransportador &&
                devolucion.vehiculoTransportador.marca +
                  " " +
                  devolucion.vehiculoTransportador.modelo +
                  " - " +
                  devolucion.vehiculoTransportador.placa}
            </p>
          </div>,
          <div key="2" className="capitalize">
            <p>
              {" "}
              Conductor : {devolucion.conductor &&
                devolucion.conductor.nombres}{" "}
              {devolucion.conductor && devolucion.conductor.apellidos} -{" "}
              {devolucion.conductor && devolucion.conductor.tipoDocumento}{" "}
              {devolucion.conductor && devolucion.conductor.numeroDocumento}{" "}
            </p>
          </div>,
          <div key="3" className="form-group">
            <p> Costo : {formatoPrecios(devolucion.costoTransporte)}</p>
          </div>,
        ]}
      </div>
    </div>
  );
}

export default DevolucionDetail;
