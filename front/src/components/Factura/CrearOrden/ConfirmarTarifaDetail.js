import React, { useState, useEffect } from "react";
import "./ConfirmarTarifaDetail.css";
import formatoPrecio from "../../utils/FormatoPrecios";
import CalcularTarifa from "../../utils/CacularTarifas";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
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
  //Estados globales
  const [tarifasFinales, setTarifasFinales] = props.tarifas;
  let miTarifa = tarifasFinales[props.index];
  const [inventario, setInventario] = props.inventario;

  //Estados propios
  const [tarifa, setTarifa] = useState(miTarifa);
  const [selectedDate, handleDateChange] = useState(new Date());

  //variables
  let cobro = CalcularTarifa([tarifa])[tarifa._id];
  const index = props.index;
  // console.log('Tarifas finales 1----------');
    
  // console.log([...tarifasFinales]);

  //Effects

  /**
   * Cuando la tarifa cambia actualiza la referencia de esta en la lista de tarifas finales que son globales a varios componentes
   */
  useEffect(() => {
    tarifasFinales[index] = tarifa;
    setTarifasFinales([...tarifasFinales]);
    console.log('Tarifas finales');
    
    console.log(tarifasFinales);
    
  },[tarifa]);

  return (
    <>
      {/* <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
                  <DateTimePicker
                    value={selectedDate}
                    disablePast
                    onChange={handleDateChange}
                    label="With Today Button"
                    showTodayButton
                    cancelLabel="Cancelar"
                    todayLabel="Hoy"
                  ></DateTimePicker>
                </MuiPickersUtilsProvider>*/}
      <tbody className="cotizacion-table">
        <tr>
          <th className="sticky-col">{tarifa.equipo.nombreEquipo}</th>
          <th>
            {formatoCategoriaHTML(tarifa.precioReferencia.categoria, true)}
          </th>
          <th>{formatoPrecio(tarifa.valorTarifa).replace(" ", "\xa0")}</th>
          <th>
            <InputBase
              defaultValue={tarifa.cantidad}
              // disabled
              classes={{
                input: "inputRoot",
              }}
              onChange={(e) => {
                e.persist();
                let nuevo = tarifa;
                nuevo.cantidad = e.target.value;
                setTarifa(tarifa => {
                  const value = e.target.value;
                  tarifa.cantidad = value? value : 0; 
                  return Object.assign({}, tarifa)});
              }}
            ></InputBase>
          </th>
          <th>{formatoTiempo(tarifa.precioReferencia.tiempo)}</th>
          <th>
            {cobro.tiempoTotal +
              " " +
              formatoTiempo(
                tarifa.precioReferencia.tiempo,
                cobro.tiempoTotal != 1
              )}
          </th>
          <th>{formatoPrecio(cobro.cobroTotal).replace(" ", "\xa0")}</th>
          <th>
            <EditIcon></EditIcon>
            <CloseIcon></CloseIcon>
          </th>
        </tr>
      </tbody>
    </>
  );
}

export default ConfirmarTarifaDetail;
