import React, { useState } from 'react';
import './ConfirmarTarifaDetail.css';
import CalcularTarifa from '../utils/CacularTarifas';
import formatoPrecio from '../utils/FormatoPrecios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import "moment/locale/es";

function ConfirmarTarifaDetail(props) {
    let miTarifa = props.tarifa;
    const [inventario, setInventario] = props.inventario;
    const [tarifa, setTarifa] = useState(miTarifa);
    const [selectedDate, handleDateChange] = useState(new Date());
    let cobro = CalcularTarifa([tarifa])[tarifa._id];

    return (
        <div className="confirmarTarifaDetailWrapper " >
            <Row>
                <Col className="align-content-center " >
                    <div className="nombre-equipo" >
                        <h4>{tarifa.equipo.nombreEquipo}</h4>
                    </div>
                </Col>
                <Col>
                    <Row className="descripcion-tarifa " >
                        <Col>
                            <p>Cobro por: {tarifa.precioReferencia.tiempo}</p>
                            <p>Numero de {tarifa.precioReferencia.tiempo}s : {cobro.tiempoTotal}</p>
                        </Col>
                        <Col>
                            <p> Medido por: {tarifa.precioReferencia.categoria}</p>
                            <p>Cantidad: {tarifa.cantidad}</p>
                        </Col>
                        {/* <p c>{formatoPrecio(cobro.cobroTotal)}</p>
                        {tarifa.valorTarifa} */}
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
                                cancelLabel = "Cancelar"
                                todayLabel = "Hoy"
                            >
                            </DateTimePicker>
                            </MuiPickersUtilsProvider>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ConfirmarTarifaDetail;