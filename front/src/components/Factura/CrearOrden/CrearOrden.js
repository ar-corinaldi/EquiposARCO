import "./CrearOrden.css";
import React, { useState } from "react";
import EscogerCotizacion from "./EscogerCotizacion";
import ConfirmarTarifas from "./ConfirmarTarifas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import priceLogo from "../../../assets/price.svg";
import priceLogoDark from "../../../assets/price-dark.svg";
import sheetLogo from "../../../assets/sheet.svg";
import sheetLogoDark from "../../../assets/sheetDark.svg";
import BodegaOrdenDetail from "./BodegaOrdenDetail";

function CrearOrden(props) {
  //Estados globales
  const [firstStepState, setFirstStep] = useState("active");
  const [secondStepState, setSecondStep] = useState("pending");
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState({});
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState({});

  function stepOneHandler(params) {
    if (firstStepState === "complete" || firstStepState === "pending") {
      setFirstStep("active");
      setSecondStep("pending");
    }
  }

  function stepTwoHandler() {
    if (secondStepState === "pending") {
      setSecondStep("active");
      if (firstStepState !== "complete") {
        setFirstStep("pending");
      }
    }
  }

  function stepOneLogo(params) {
    return firstStepState === "active" || firstStepState === "complete"
      ? sheetLogo
      : sheetLogoDark;
  }

  function stepTwoLogo(params) {
    return secondStepState === "active" || secondStepState === "complete"
      ? priceLogo
      : priceLogoDark;
  }

  return (
    <div id="create-order-wrapper">
      <h2 className="margin-bottom">Crear Orden</h2>
      <hr />
      <Row>
        <Col align="center" className="col-step">
          <button
            type="button"
            className={"step-" + firstStepState + " step-button"}
            onClick={stepOneHandler}
          >
            <img src={stepOneLogo()} className="step-logo" />
            <p className="step-button-name">Seleccionar Cotización</p>
          </button>
        </Col>
        <Col align="center" className="col-step">
          <button
            type="button"
            className={"step-" + secondStepState + " step-button"}
            onClick={stepTwoHandler}
          >
            <img src={stepTwoLogo()} className="step-logo" />
            <p className="step-button-name"> Confirmar tarifas</p>
          </button>
        </Col>
      </Row>
      <Row>
        <EscogerCotizacion
          miEstado={[firstStepState, setFirstStep]}
          segundoEstado={[secondStepState, setSecondStep]}
          bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
          cotizacionSeleccionada={[
            cotizacionSeleccionada,
            setCotizacionSeleccionada,
          ]}
        />
        <ConfirmarTarifas
          miEstado={[secondStepState, setSecondStep]}
          primerEstado={[firstStepState, setFirstStep]}
          bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
          cotizacionSeleccionada={[
            cotizacionSeleccionada,
            setCotizacionSeleccionada,
          ]}
        />
      </Row>
    </div>
  );
}

export default CrearOrden;
