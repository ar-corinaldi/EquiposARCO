import React, { useState, useEffect } from "react";
import "./ConfirmarTarifaDetail.css";
import formatoPrecio from "../../utils/FormatoPrecios";
import CalcularTarifa from "../../utils/CacularTarifas";
import InputBase from "@material-ui/core/InputBase";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import {
  formatoCategoriaHTML,
  formatoTiempo,
} from "../../utils/FormatoInfoPrecios";
import formatoFechas, { formatoHora, formatoHora12, formatoFechasNombres } from "../../utils/FormatoFechas";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import "moment/locale/es";

function ConfirmarTarifaDetail(props) {
  //Estados globales
  const [tarifasFinales, setTarifasFinales] = props.tarifas;
  let miTarifa = tarifasFinales[props.index].tarifasPorEquipo[0];
  const [inventario, setInventario] = props.inventario;
  const setCamposCorrectos = props.camposCorrectos;
  const setEnEdicion = props.editando;
  const raicesSinInventario = props.raicesSinInventario;

  //Estados propios
  const [tarifa, setTarifa] = useState(() => {
    delete miTarifa.fechaFin;
    return miTarifa;
  });
  // const [fechaInicial, setFechaInicial] = useState(moment(tarifa.fechaInicio));
  // let [fechaFinal, setFechaFinal] = useState(moment("01/01/1980", "MM/DD/YYYY"));
  let [checked, setChecked] = useState(false);
  const [editando, setEditando] = useState(false);

  //variables
  let cobro = CalcularTarifa([tarifa])[tarifa._id];
  const index = props.index;
  // console.log('Tarifas finales 1----------');

  // console.log([...tarifasFinales]);

  // console.log('==================Mi tarifa==================');
  // console.log(miTarifa);
  // console.log(tarifa);
  // console.log('=======================Raices=============');
  // console.log(raicesSinInventario);
  // console.log('=======================Mi aices=============');
  // console.log(raicesSinInventario[miTarifa.equipo._id])
  // console.log(raicesSinInventario[miTarifa.equipo._id] == true)


  //Funciones
  function labelDates(date) {
    const fecha = date.toDate();
    const dia = formatoFechasNombres(fecha, false, false);
    const hora = formatoHora12(fecha);
    return dia + ". " + hora;
  }

  function handleChecked(event) {
    checked = event.target.checked;
    setChecked(checked);
    if (checked) {
      let fecha = moment();
      let newTarifa = Object.assign({}, tarifa);
      newTarifa.fechaFin = fecha;
      setTarifa(newTarifa);
    } else {
      let newTarifa = Object.assign({}, tarifa);
      delete newTarifa.fechaFin;
      setTarifa(newTarifa);
    }
  }



  //Effects

  /**
   * Cuando la tarifa cambia actualiza la referencia de esta en la lista de tarifas finales que son globales a varios componentes
   */
  useEffect(() => {
    tarifasFinales[index].tarifasPorEquipo[0] = tarifa;
    setTarifasFinales([...tarifasFinales]);
    // setFechaInicial(tarifa.fechaInicio)
    // setFechaFinal(tarifa.fechaFin)
    console.log('Tarifas finales');

    console.log(tarifasFinales);

  }, [tarifa]);

  useEffect(() => {
    let miTarifa = tarifasFinales[props.index].tarifasPorEquipo[0];
    setTarifa(miTarifa);
  }, [tarifasFinales])

  return (
    <>
      <tbody className={"cotizacion-table" + (editando ? " editando" : "")}>
        <tr className="borderedRow z-index-05">
          <th className={"sticky-col capitalize transitions-02 " 
          + (raicesSinInventario[miTarifa.equipo._id]? " danger-field" : "")}>
            {tarifa.equipo.nombreEquipo}</th>
          <th>
            <InputBase
              type="number"
              defaultValue={tarifa.cantidad}
              value={tarifa.cantidad}
              disabled={!editando}
              classes={{
                input: "inputRoot",
              }}
              onChange={(e) => {
                setCamposCorrectos(false);
                e.persist();
                let nuevo = tarifa;
                nuevo.cantidad = e.target.value;
                setTarifa(tarifa => {
                  const value = e.target.value;
                  tarifa.cantidad = value ? value : 0;
                  return Object.assign({}, tarifa)
                });
              }}
            ></InputBase>
          </th>
          <th>
            {formatoCategoriaHTML(tarifa.precioReferencia.categoria, true)}
          </th>
          <th>{formatoPrecio(tarifa.valorTarifa).replace(" ", "\xa0")}</th>
          <th>{formatoTiempo(tarifa.precioReferencia.tiempo)}</th>
          <th className={(checked ? "pb-0" : "")}>
            <Row>
              <Col>
                <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
                  <DateTimePicker
                    disabled={!editando}
                    value={tarifa.fechaInicio}
                    onChange={date => setTarifa((prev) => {
                      let newTarifa = Object.assign({}, tarifa);
                      newTarifa.fechaInicio = date;
                      return newTarifa;
                    })}
                    label="Desde"
                    showTodayButton
                    cancelLabel="Cancelar"
                    todayLabel="Hoy"
                    minDate={new Date("01/01/2000")}
                    labelFunc={labelDates}
                  ></DateTimePicker>
                </MuiPickersUtilsProvider>
              </Col>
              <Col>
                <Row className={checked ? "show" : "hide"}>
                  <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
                    <DateTimePicker
                      disabled={!editando}
                      value={tarifa.fechaFin}
                      label="Hasta"
                      showTodayButton
                      cancelLabel="Cancelar"
                      todayLabel="Hoy"
                      minDate={tarifa.fechaInicio}
                      labelFunc={labelDates}
                      onChange={date => setTarifa((prev) => {
                        let newTarifa = Object.assign({}, tarifa);
                        newTarifa.fechaFin = date;
                        return newTarifa;
                      })}
                    ></DateTimePicker>
                  </MuiPickersUtilsProvider>
                </Row>
                <Row>
                  <FormControlLabel
                    disabled={!editando}
                    label={("Fecha Límite").toString().replace(" ", "\xa0")}
                    className="px13-nunito"
                    control={
                      <Switch
                        size="small"
                        checked={checked}
                        onChange={handleChecked}
                        color="primary"
                        name="Fecha Límite"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                  >
                  </FormControlLabel>
                </Row>
              </Col>
            </Row>
          </th>
          <th>
            <EditIcon className={(!editando ? "show" : "hide") + " iconSelected"}
              onClick={() => {
                setEditando(true)
                setEnEdicion((prevState) => prevState + 1)
              }}
            ></EditIcon>
            <DoneIcon className={(editando ? "show" : "hide") + " iconSelected"}
              onClick={() => {
                setEditando(false)
                setEnEdicion((prevState) => prevState - 1)
              }}
            ></DoneIcon>
          </th>
        </tr>
      </tbody>
    </>
  );
}

export default ConfirmarTarifaDetail;
