import React, { useState, useEffect } from 'react';
import CloseIcon from "@material-ui/icons/Close";

function CellTablaCotizacion(props) {
    //Estados globales
    const equipo = props.equipo;
    console.log('Equipo');
    console.log(equipo);
    let index = props.index;
    console.log(index);
    const [tarifas, setTarifas] = props.tarifas;    
    let [equiposSeleccionados, setEquiposSeleccionados] = props.seleccionados;
    //Estados propios
    let [tarifa, setTarifa] = useState(tarifas[equipo.equipoID._id]);
    const [equipoDetail, setEquipoDetail] = useState({});


    //Buscar precio referencia

    //Fuciones
    function body() {
        console.log('==============miTarifa======================');
        console.log(tarifa);
        console.log('====================================');
        if (tarifa && Object.keys(tarifa).length > 0) {
            console.log('entró');
            return (
                <tr>
                    <th className="capitalize">{equipo.equipoID.nombreEquipo}</th>
                    <th>m2</th>
                    <th>{tarifa.valorTarifa}</th>
                    <th>{tarifa.cantidad}</th>
                    <th>dias</th>
                    <th>0</th>
                    <th>0</th>
                    <th>
                        <CloseIcon className=" iconSelected"
                            onClick={handleRemoveEquipo}
                        />
                    </th>
                </tr>
            )
        }

    }


    const handleRemoveEquipo = (e) => {
        // tarifas[equipo.equipoID._id] = {};
        delete tarifas[equipo.equipoID._id];
        const myIndex = index;
        setTarifas(Object.assign({}, tarifas));
        setEquiposSeleccionados((prev =>
            prev.filter((prev, index) => myIndex !== index)
        ))
    };

    //Effects
    useEffect(() => {
        console.log('==============LA--Tarifa======================');
        console.log(tarifas[equipo.equipoID._id]);
        console.log('====================================');
        setTarifa(tarifas[equipo.equipoID._id]);
    }, [tarifas])

    useEffect(() => {
        async function equipoBack() {
            const equipoBack = await (await fetch("/equipos/" + equipo.equipoID._id)).json();
            setEquipoDetail(equipoBack);
            console.log('===============IIIIntrooooo=====================');
            console.log("");
            console.log('====================================');
        }
        if (Object.keys(equipoDetail).length === 0 && tarifa) {
            equipoBack();
        }

    })

    useEffect(() => {
        console.log('==============Tarifaaas======================');
        console.log(tarifa);
        console.log('====================================');
        tarifas[equipo.equipoID._id] = tarifa;
        setTarifas(Object.assign({}, tarifas));
    }, [tarifa])

    useEffect(() => {
        console.log('==============Equipo detail======================');
        console.log(equipoDetail);
        console.log('====================================');
        if (equipoDetail.precios && equipoDetail.precios[0]) {
            tarifa.valorTarifa = equipoDetail.precios[0].valorAlquiler;
            tarifa.precioReferencia = equipoDetail.precios[0]._id;
            setTarifa(Object.assign({}, tarifa));
            console.log('===============Entrooooo=====================');
            console.log("");
            console.log('====================================');
        }
        console.log('==============Todas las tarifas======================');
        console.log(tarifas);
        console.log('====================================');
    }, [equipoDetail]);

    return (
        <>
            <tbody>
                {body()}
            </tbody>

        </>
    );
};

export default CellTablaCotizacion;