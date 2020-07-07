import "./EscogerCotizacion.css";
import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EscogerBodega from "./EscogerBodega";
import BodegaOrdenDetail from "./BodegaOrdenDetail";
function EscogerCotizacion(params) {
  const miEstado = params.estadoStepOne;
  const setMiEstado = params.setEstadoStepOne;

  const [cotizaciones, setCotizaciones] = useState([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState({});
  const [bodegas, setBodegas] = useState([]);
  const [terceros, setTerceros] = useState([]);

  useEffect(() => {
    async function fetchCotizaciones() {
      const cotizacionesBack = await (await fetch("/cotizaciones/all")).json();
      console.log(cotizacionesBack);
      setCotizaciones(cotizacionesBack);
    }
    fetchCotizaciones();
  }, []);

  useEffect(() => {
    async function fetchBodegas() {
      const bodegasBack = await (await fetch("/bodegas")).json();
      const tercerosBack = await (await fetch("/terceros/bodegas")).json();
      setBodegas(bodegasBack);
      setTerceros(tercerosBack);
      // console.log(bodegas);
    }
    fetchBodegas();
    // console.log(bodegas);
    // console.log(terceros);
  }, []);

  function changeEstado(params) {
    setMiEstado("complete");
  }
  return (
    <div
      className={
        "escoger-cotizacion-wrapper " +
        (miEstado === "active" ? "show" : "hide")
      }
    >
      {/* {miEstado} */}
      <EscogerBodega
        bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
        bodegas={[bodegas, setBodegas]}
        terceros={[terceros, setTerceros]}
      />
      <BodegaOrdenDetail
        bodegaSeleccionada={[bodegaSeleccionada, setBodegaSeleccionada]}
      ></BodegaOrdenDetail>
      <hr></hr>
      <h4>Escoja la cotización base para la orden</h4>

      <Accordion defaultActiveKey="0">
        {cotizaciones.map((item, index) => {
          return (

            <Card key={index} >
              <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                Down
              </Accordion.Toggle>
              <span>{"Cotización con número de contrato: " + item.numeroContrato}</span>
              </Card.Header>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>
                <ul>
                {item.tarifasCotizadas.map((item, index) => {
                  return (
                    <li key={index}>
                      {"Tarifa detail colapsable de tarifa con id: " + item._id}
                    </li>
                  );
                })}
              </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            
            // <li key={index}>
            //   {"Cotización con número de contrato: " + item.numeroContrato}
            //   <ul>
            //     {item.tarifasCotizadas.map((item, index) => {
            //       return (
            //         <li key={index}>
            //           {"Tarifa detail colapsable de tarifa con id: " + item}
            //         </li>
            //       );
            //     })}
            //   </ul>
            // </li>
          );
        })}
      </Accordion>

      <button type="button" onClick={changeEstado}>
        Botoncito
      </button>
    </div>
  );
}

export default EscogerCotizacion;
