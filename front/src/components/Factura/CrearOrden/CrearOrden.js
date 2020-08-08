import "./CrearOrden.css";
import React, { useState, useContext, useEffect } from "react";
import EscogerCotizacion from "./EscogerCotizacion";
import ConfirmarTarifas from "./ConfirmarTarifas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import priceLogo from "../../../assets/price.svg";
import priceLogoDark from "../../../assets/price-dark.svg";
import sheetLogo from "../../../assets/sheet.svg";
import sheetLogoDark from "../../../assets/sheetDark.svg";
import GlobalsContext from "../../GlobalsContext";

function CrearOrden(props) {
  const context = useContext(GlobalsContext);

  //Estados globales
  const [firstStepState, setFirstStep] = useState(context.globals.crearOrden.firstStep || "active");
  const [secondStepState, setSecondStep] = useState(context.globals.crearOrden.secondStep || "pending");
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(context.globals.crearOrden.bodega || {});
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(context.globals.crearOrden.cotizacion || {});

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

  useEffect(() => {
    const contextFrstStep = context.globals.crearOrden.firstStep
    const contextScndStep = context.globals.crearOrden.secondStep
    const contextBodega = context.globals.crearOrden.bodega;
    const contextCotizacion = context.globals.crearOrden.cotizacion;
    console.log('====================CONTEXTO ACTUALIZADO================');
    console.log(context.globals);
    console.log('====================================');
    if (contextCotizacion && Object.keys(contextCotizacion).length > 0) {
      setBodegaSeleccionada(contextBodega)
      setCotizacionSeleccionada(contextCotizacion)
      setFirstStep(contextFrstStep)
      setSecondStep(contextScndStep)
    }
  }, [context.globals])

  return (
    <div id="create-order-wrapper">
      <h2 className="margin-bottom">Crear Orden</h2>
      <hr />
      <Row className="stickyRow">
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
