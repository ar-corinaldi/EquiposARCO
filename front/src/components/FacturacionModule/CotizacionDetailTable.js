import React from 'react';
import Table from 'react-bootstrap/Table';
import formatoPrecio from '../utils/FormatoPrecios'
import CalcularTarifa from '../utils/CacularTarifas';

function CotizacionDetailTable(props) {
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    console.log(cotizacionSeleccionada);



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
                        
                    </tr>
                </thead>
            )
        }
        else {
            return <></>
        }
    }

    function tableBody() {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            return (
                <tbody>
                    {cotizacionSeleccionada.tarifasCotizadas.map((tarifa, index) =>
                        <tr key={index}>
                            {console.log(tarifa)}
                            <th >{tarifa.equipo.nombreEquipo}</th>
                            <th >{tarifa.precioReferencia.categoria}</th>
                            <th>{formatoPrecio(tarifa.valorTarifa)}</th>
                            <th>{tarifa.cantidad}</th>
                            <th>{tarifa.precioReferencia.tiempo}</th>
                        </tr>
                    )}
                </tbody>
            )
        }
        else {
            return <></>
        }
    }


    return (
        <div>
            <Table responsive className="mt-4" >
                {tableHead()}
                {tableBody()}
            </Table>
        </div>
    );
}

export default CotizacionDetailTable;