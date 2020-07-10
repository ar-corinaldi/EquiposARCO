import React from 'react';
import Table from 'react-bootstrap/Table';
import formatoPrecio from '../utils/FormatoPrecios'
import CalcularTarifa from '../utils/CacularTarifas';
import {formatoCategoriaHTML, formatoTiempo} from '../utils/FormatoInfoPrecios';
import './CotizacionDetailTable.css';

function CotizacionDetailTable(props) {
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    // console.log(cotizacionSeleccionada);



    function tableHead() {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            return (
                <thead>
                    <tr>
                        <th>Nombre Equipo</th>
                        <th>Unidad de Cobro</th>
                        <th>Precio x Unidad</th>
                        <th>Cantidad</th>
                        <th>Tipo de Cobro</th>
                        <th>Tiempo a cobrar</th>
                        <th>Valor a cobrar</th>

                    </tr>
                </thead>
            )
        }
        else {
            return <></>
        }
    }

    const cobro = (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) ? CalcularTarifa(cotizacionSeleccionada.tarifasCotizadas) : null;

    function tableBody() {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            return (
                <tbody className="cotizacion-table" >
                    {cotizacionSeleccionada.tarifasCotizadas.map((tarifa, index) => {


                        return (<tr key={index}>
                            <th >{tarifa.equipo.nombreEquipo}</th>
                            <th >{formatoCategoriaHTML(tarifa.precioReferencia.categoria, true)}</th>
                            <th>{formatoPrecio(tarifa.valorTarifa)}</th>
                            <th>{tarifa.cantidad}</th>
                            <th>{formatoTiempo(tarifa.precioReferencia.tiempo)}</th>
                            <th>{cobro[tarifa._id].tiempoTotal+ " " + formatoTiempo(tarifa.precioReferencia.tiempo, cobro[tarifa._id].tiempoTotal!=1)}</th>
                            <th>{formatoPrecio(cobro[tarifa._id].cobroTotal)}</th>
                        </tr>
                        )
                    })}
                    <tr>
                        {(<><th>Total</th><th></th><th></th><th></th><th></th><th></th></>)}
                        <th>{formatoPrecio(cobro.cobroCompleto)}</th>
                    </tr>
                </tbody>
            )
        }
        else {
            return <></>
        }
    }


    return (
        <div>
            <h6 className="mt-4" >
                {cotizacionSeleccionada && cotizacionSeleccionada._id ? "Id cotización seleccionada: " + cotizacionSeleccionada._id : ""}
            </h6>
            <Table responsive className="mt-4" >
                {tableHead()}
                {tableBody()}
            </Table>
        </div>
    );
}

export default CotizacionDetailTable;