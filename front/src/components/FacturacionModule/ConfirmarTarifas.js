import React, { useState, useEffect } from 'react';
import './ConfirmarTarifas.css'
import ConfirmarTarifaDetail from './ConfirmarTarifaDetail';

function ConfirmarTarifas(props) {
    //Estados globales
    const [miEstado, setMiEstado] = props.miEstado;
    const [primerEstado, setPrimerEstado] = props.primerEstado;
    const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;

    //Estados propios
    const [tarifasFinales, setTarifasFinales] = useState([]);

    
    useEffect((props) => {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            setTarifasFinales(cotizacionSeleccionada.tarifasCotizadas);
        }
        else{
            setTarifasFinales([]);
        }
    }, [cotizacionSeleccionada]);


    return (
        <div className={(miEstado === "active" ? "show" : "hide")}>
            {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                return <ConfirmarTarifaDetail tarifa = {tarifa} cobro = {{}}/>

            })}
        </div>
    );
}

export default ConfirmarTarifas;