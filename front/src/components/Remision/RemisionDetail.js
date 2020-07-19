import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Remision.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EquiposRemision from "./EquiposRemision";
import formatoFechas from "../utils/FormatoFechas";
import formatoPrecios from "../utils/FormatoPrecios";

function RemisionDetail(props) {
  const { id, idB, idOr, idR } = useParams();
  const [remision, setRemision] = useState({});

  useEffect(() => {
    fetchRemision();
  }, []);

  const fetchRemision = async () => {
    let res = await fetch(`/remisiones/${idR}`);
    const newRemision = await res.json();
    console.log("newRemision", newRemision);
    setRemision(newRemision);
  };

  return (
    <div className="remision-registrar-wrapper ">
      <div className="remision-registrar-card ">
        <h4 className="titulo">Remisión No. {remision._id}</h4>
        <Row>
          <Col>
            <p>
              Fecha y hora de salida : {formatoFechas(remision.fechaSalida)}
            </p>
          </Col>
          <Col>
            <p>
              Fecha y hora de llegada : {formatoFechas(remision.fechaLlegada)}
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
              <EquiposRemision
                equiposEnRemision={remision.equiposEnRemision}
              ></EquiposRemision>
            </Col>
          </Row>
        </div>
        <div>
          <p>
            Trasporte asumido por{" "}
            {remision.asumidoTercero ? "el tercero" : "Equipos ARCO"}
          </p>
        </div>
        {!remision.asumidoTercero && [
          <div key="1" className="capitalize">
            <p>
              Vehículo :{" "}
              {remision.vehiculoTransportador &&
                remision.vehiculoTransportador.marca +
                  " " +
                  remision.vehiculoTransportador.modelo +
                  " - " +
                  remision.vehiculoTransportador.placa}
            </p>
          </div>,
          <div key="2" className="capitalize">
            <p>
              {" "}
              Conductor : {remision.conductor &&
                remision.conductor.nombres}{" "}
              {remision.conductor && remision.conductor.apellidos} -{" "}
              {remision.conductor && remision.conductor.tipoDocumento}{" "}
              {remision.conductor && remision.conductor.numeroDocumento}{" "}
            </p>
          </div>,
          <div key="3" className="form-group">
            <p> Costo : {formatoPrecios(remision.costoTransporte)}</p>
          </div>,
        ]}
      </div>
    </div>
  );
}

export default RemisionDetail;
