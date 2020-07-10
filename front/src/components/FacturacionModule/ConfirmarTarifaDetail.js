import React, { useState } from 'react';
import './ConfirmarTarifaDetail.css';
import CalcularTarifa from '../utils/CacularTarifas';
import formatoPrecio from '../utils/FormatoPrecios'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ConfirmarTarifaDetail(props) {
    let miTarifa = props.tarifa;
    const [tarifa, setTarifa] = useState(miTarifa);
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ConfirmarTarifaDetail;