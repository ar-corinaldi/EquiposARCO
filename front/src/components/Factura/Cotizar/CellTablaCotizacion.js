import React, { useState, useEffect } from 'react';

function CellTablaCotizacion(props) {
    //Estados globales
    const equipo = props.equipo;
    const [tarifas, seTarifas] = props.tarifas;
    //Estados propios
    const [tarifa, setTarifa] = useState(tarifas[equipo.equipoID._id]);


    //Buscar precio referencia

    //Fuciones
    function body() {
        console.log('==============miTarifa======================');
        console.log(tarifa);
        console.log('====================================');
        if (tarifa && tarifa.fechaInicio) {
            console.log('entró');
            return (
                <tr>
                    <th>{equipo.equipoID.nombreEquipo}</th>
                    <th>m2</th>
                    <th>{tarifa.valorTarifa}</th>
                    <th>{tarifa.cantidad}</th>
                    <th>dias</th>
                    <th>0</th>
                    <th>0</th>
                </tr>
            )
        }

    }

    //Effects
    useEffect(() => {
        console.log('==============LA--Tarifa======================');
        console.log(tarifas[equipo.equipoID._id]);
        console.log('====================================');
        setTarifa(tarifas[equipo.equipoID._id]);
    }, [tarifas])

    return (
        <>
            <tbody>
                {body()}
            </tbody>

        </>
    );
};

export default CellTablaCotizacion;