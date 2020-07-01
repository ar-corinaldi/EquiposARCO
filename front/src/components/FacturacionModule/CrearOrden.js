import "./CrearOrden.css";
import React, { useState } from "react";
import EscogerCotizacion from "./EscogerCotizacion";
import Row from "react-bootstrap/Row";
import Cl from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import priceLogo from "../../static-files/price.svg";
import priceLogoDark from "../../static-files/price-dark.svg";

function CrearOrden(props) {
  const [firstStepState, setFirstStep] = useState("active");
  const [secondStepState, setSecondStep] = useState("pending");

  function stepOneHandler(params) {
    if (firstStepState === "active") {
      setFirstStep("complete");
    } else if (firstStepState === "complete") {
      setFirstStep("pending");
    } else {
      setFirstStep("active");
    }
  }

  function stepTwoHandler(params) {}

  function stepOneLogo(params) {
    const respuesta = [];
    if (firstStepState === "active" || firstStepState === "complete") {
      respuesta[0] = priceLogo;
    } else {
      respuesta[0] = priceLogoDark;
    }
    return respuesta;
  }

  return (
    <div id="create-order-wrapper">
      <Row>
        <Col align="center" className="col-step">
          <button
            type="button"
            className={"step-" + firstStepState + " step-button"}
            onClick={stepOneHandler}
          >
            <img src={stepOneLogo()[0]} className="step-logo" />
            <p className="step-button-name">First Step</p>
          </button>
        </Col>
        <Col align="center" className="col-step">
          <button
            type="button"
            className={"step-" + secondStepState + " step-button"}
          >
            <p className="step-button-name"> Second Step</p>
          </button>
        </Col>
      </Row>
      <Row>
          <EscogerCotizacion estado = {firstStepState} setEstado={setFirstStep}/>
      </Row>
    </div>
  );
}

export default CrearOrden;
