import React, { useState } from "react";
import "./ConfirmarTarifaDetail.css";
import formatoPrecio from "../../utils/FormatoPrecios";
import CalcularTarifa from "../../utils/CacularTarifas";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from '@material-ui/icons/Edit';
import {
  formatoCategoriaHTML,
  formatoTiempo,
} from "../../utils/FormatoInfoPrecios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";

function ConfirmarTarifaDetail(props) {
  let miTarifa = props.tarifa;
  const [inventario, setInventario] = props.inventario;
  const [tarifa, setTarifa] = useState(miTarifa);
  const [selectedDate, handleDateChange] = useState(new Date());
  let cobro = CalcularTarifa([tarifa])[tarifa._id];

  return (
    <>
      {/* <div className="confirmarTarifaDetailWrapper ">
        <Row>
          <Col className="align-content-center ">
            <div className="nombre-equipo">
              <h4>{tarifa.equipo.nombreEquipo}</h4>
            </div>
          </Col>
          <Col>
            <Row className="descripcion-tarifa ">
              <Col>
                <p>Cobro por: {tarifa.precioReferencia.tiempo}</p>
                <p>
                  Numero de {tarifa.precioReferencia.tiempo}s :{" "}
                  {cobro.tiempoTotal}
                </p>
              </Col>
              <Col>
                <p> Medido por: {tarifa.precioReferencia.categoria}</p>
                <p>Cantidad: {tarifa.cantidad}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Precio: {formatoPrecio(tarifa.valorTarifa)}</p>
              </Col>
              <Col>
                <p>Total a pagar: {formatoPrecio(cobro.cobroTotal)}</p>
                <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
                  <DateTimePicker
                    value={selectedDate}
                    disablePast
                    onChange={handleDateChange}
                    label="With Today Button"
                    showTodayButton
                    cancelLabel="Cancelar"
                    todayLabel="Hoy"
                  ></DateTimePicker>
                </MuiPickersUtilsProvider>
              </Col>
            </Row>
          </Col>
        </Row>
      </div> */}
      <tbody responsive className="cotizacion-table">
          <tr>
            <th>{tarifa.equipo.nombreEquipo}</th>
            <th>{formatoCategoriaHTML(tarifa.precioReferencia.categoria,true)}</th>
                <th>{formatoPrecio(tarifa.valorTarifa).replace(" ","\xa0")}</th>
                <th>{tarifa.cantidad}</th>
                <th>{formatoTiempo(tarifa.precioReferencia.tiempo)}</th>
                <th>
                  {cobro.tiempoTotal +
                    " " +
                    formatoTiempo(
                      tarifa.precioReferencia.tiempo,
                      cobro.tiempoTotal != 1
                    )}
                </th>
                <th>{formatoPrecio(cobro.cobroTotal).replace(" ","\xa0")}</th>
                <th><EditIcon></EditIcon><CloseIcon></CloseIcon></th>
          </tr>
        </tbody>
    </>
  );
}

export default ConfirmarTarifaDetail;
