import React, { useState, useEffect } from 'react';
import CloseIcon from "@material-ui/icons/Close";
import formatoPrecio from "../../utils/FormatoPrecios";
import { formatoCategoriaHTML, formatoTiempo } from "../../utils/FormatoInfoPrecios";
import { calcularFechaFinalDiaHabil, calcularFechaFinal } from '../../utils/CacularTarifas';
import InputBase from "@material-ui/core/InputBase";
import formatoPrecios from '../../utils/FormatoPrecios';
import Cleave from 'cleave.js/react';

function CellTablaCotizacion(props) {
    //Estados globales
    const equipo = props.equipo;
    console.log('Equipo');
    console.log(equipo);
    const index = props.index;
    console.log(index);
    const [tarifas, setTarifas] = props.tarifas;
    let [equiposSeleccionados, setEquiposSeleccionados] = props.seleccionados;
    const [cobro, setCobro] = props.cobro;


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
                <tr className='center'>
                    <th className="capitalize">{equipo.equipoID.nombreEquipo}</th>
                    <th>
                        {/* <InputBase
                            defaultValue={tarifa.cantidad}
                            inputComponent={InputPrecio}
                            classes={{
                                input: "inputRoot",
                            }}
                            onChange={handleChangeCantidad}
                        ></InputBase> */}
                        <Cleave
                            options={{
                                numeral: true,
                                //  prefix: '$', 
                                //  rawValueTrimPrefix: true
                            }}
                            onChange={handleChangeCantidad}
                            value={tarifa.cantidad}

                        >
                        </Cleave>
                    </th>
                    <th className="capitalize text-center">
                        {tarifa.precioReferencia &&
                            formatoCategoriaHTML(tarifa.precioReferencia.categoria, true)}
                    </th>
                    <th>
                        <Cleave
                            value={tarifa.valorTarifa}
                            options={{numeral: true, prefix: '$', rawValueTrimPrefix: true}}
                            onChange={handleChangePrecio}
                        ></Cleave>
                        {/* {formatoPrecio(tarifa.valorTarifa).replace(" ", "\xa0")} */}
                    </th>
                    <th>{tarifa.precioReferencia &&
                        formatoTiempo(tarifa.precioReferencia.tiempo, true)}
                    </th>
                    <th>
                        {/* <InputBase
                            defaultValue={0}
                            classes={{
                                input: "inputRoot",
                            }}
                            onChange={handleChangeTiempoCotizado}
                        ></InputBase> */}
                        <Cleave
                            options={{ numeral: true }}
                            onChange={handleChangeTiempoCotizado}
                            value={0}

                        >
                        </Cleave>
                    </th>
                    <th>{cobro && cobro[tarifa.equipo] && formatoPrecios(cobro[tarifa.equipo].cobroTotal).replace(" ","\xa0")}</th>
                    <th>
                        <CloseIcon className=" iconSelected"
                            onClick={handleRemoveEquipo}
                        />
                    </th>
                </tr>
            )
        }
    }

    function handleChangePrecio(e) {
        const value = e.target.rawValue;
        setTarifa(tarifa => {
            tarifa.valorTarifa = value ? value : 0;
            return Object.assign({}, tarifa)
        });
    }

    function handleChangeCantidad(e) {
        // e.persist();
        console.log('==============EVENTOOO======================');
        console.log(e);
        const value = e.target.rawValue;
        console.log(value);
        console.log(e.target.value);
        console.log('====================================');
        setTarifa(tarifa => {
            tarifa.cantidad = value ? value : 0;
            return Object.assign({}, tarifa)
        });
    }

    function handleChangeTiempoCotizado(e) {
        e.persist();
        console.log("anda entrando");
        console.log(e.target.rawValue);
        if (tarifa && tarifa.precioReferencia && tarifa.fechaInicio) {//Los que no tienen precio ref pailas?
            let newCantidad = e.target.rawValue;
            const medidaTiempo = tarifa.precioReferencia.tiempo;
            let newFecha = null;
            if (medidaTiempo !== "dia habil") {
                newFecha = calcularFechaFinal(tarifa.fechaInicio, medidaTiempo, newCantidad);
            }
            else {
                newFecha = calcularFechaFinalDiaHabil(tarifa.fechaInicio, newCantidad);
            }
            console.log('===============Fechaaaaas =====================' + medidaTiempo);
            console.log(tarifa.fechaInicio);
            console.log(newFecha);
            console.log('====================================');
            tarifa.fechaFin = newFecha;
            setTarifa(Object.assign({}, tarifa));
        }
    }

    function InputPrecio(props) {
        console.log('================INPUTTTT====================');
        console.log(props);
        console.log('====================================');
        return formatoPrecios(props.value || 0);
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
            tarifa.precioReferencia = equipoDetail.precios[0];
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