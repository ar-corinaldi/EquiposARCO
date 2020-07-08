import React from 'react';
import Table from 'react-bootstrap/Table';

function CotizacionDetailTable(props) {
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    console.log(cotizacionSeleccionada);



    function tableHead() {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            return (
                <thead>
                    <tr>
                        <th>Nombre Equipo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
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
                            <th>{tarifa.equipo.nombreEquipo}</th>
                            <th>{tarifa.valorTarifa}</th>
                            <th>{tarifa.cantidad}</th>
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
            <Table responsive>
                {tableHead()}
                {tableBody()}
            </Table>
        </div>
    );
}

export default CotizacionDetailTable;