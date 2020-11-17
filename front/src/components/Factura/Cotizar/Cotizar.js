import React, { useState, useEffect, useContext } from 'react';
import './Cotizar.css';
import { useHistory } from "react-router-dom";
import BuscarEquiposCotizados from './BuscarEquiposCotizados';
import GlobalsContext from "../../GlobalsContext";
import Escoger from '../../Escoger';
import CellTableCotizazcion from './CellTablaCotizacion';
import CotizarConOrden from './CotizarConOrden';
import Table from 'react-bootstrap/Table';
import { calcularTarifaObjeto } from '../../utils/CacularTarifas';
import formatoPrecios from '../../utils/FormatoPrecios';
import { FormControlLabel, Switch } from '@material-ui/core';

const Cotizar = () => {
    let [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
    const [tarifas, setTarifas] = useState({});
    const [cobro, setCobro] = useState({});
    const [terceros, setTercereos] = useState([]);
    const [terceroSeleccionado, setTerceroSeleccionado] = useState({});
    const [equipos, setEquipos] = useState([]);
    const [conOrden, setConOrden] = useState(false);
    const [bodega, setBodega] = useState(null);

    const history = useHistory();


    //Contexto global trial
    const context = useContext(GlobalsContext);

    //funciones

    function tableHead() {
        if (equiposSeleccionados.length > 0) {
            return (
                <thead>
                    <tr className='center'>
                        <th>Nombre Equipo</th>
                        <th>Base</th>
                        <th>Cantidad Cotizada</th>
                        <th>Precio x Unidad</th>
                        <th>Tiempo cotizado</th>
                        <th>Valor a cobrar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>)
        }
        else {
            return <caption className="mt-0 mb-0 pt-0 pb-0">No ha seleccionado ningún equipo</caption >
        }
    }

    function tableTotal() {
        if (equiposSeleccionados.length > 0) {
            return (
                <tbody>
                    <tr>
                        <th>Total</th>
                        <th></th><th></th><th></th><th></th>
                        <th className='center'>{cobro && formatoPrecios(cobro.cobroCompleto)}</th>
                        <th></th>
                    </tr>
                </tbody>
            )
        }
    }

    //Funciones

    /**
     * Guarda nua cotización en la base de datos
     * @param {Boolean} crearOrden. Decide si al guardar la cotización se redirige a la página de crear orden
     */
    async function guardarCotizacion(crearOrden = false) {

        let cotizacion = {};

        if (Object.keys(tarifas).length && Object.keys(cobro).length && Object.keys(terceroSeleccionado).length) {


            cotizacion.precioTotal = cobro.cobroCompleto;
            cotizacion.tercero = terceroSeleccionado._id;
            cotizacion.tarifasCotizadas = [];
            const headers = { "Content-type": "application/json; charset=UTF-8" };
            for (let tarifa of Object.keys(tarifas)) {
                tarifa = tarifas[tarifa];
                await fetch("/tarifas/", {
                    method: "POST", headers: headers,
                    body: JSON.stringify(tarifa)
                }).then(response => response.json())
                    .then(response => {
                        cotizacion.tarifasCotizadas.push(response._id);
                    })
            }
            cotizacion.fecha = new Date();
            await fetch("/cotizaciones", {
                method: "POST", headers: headers,
                body: JSON.stringify(cotizacion)
            }).then(response => response.json())
                .then(async response => {
                    if (!crearOrden) {
                        document.location.href = "/terceros/" + response.tercero
                            + "/cotizaciones/" + response._id;
                    }
                    else {
                        let cotizacionDetail = await (await fetch(`/cotizaciones/all/${response._id}`)).json()
                        const crearOrdenContext =
                        {
                            crearOrden: {
                                firstStep: "complete",
                                secondStep: "active",
                                bodega: bodega,
                                cotizacion: cotizacionDetail
                            }
                        }
                        context.setter(Object.assign(context.globals, crearOrdenContext))
                        history.push("/facturacion/crear_orden/")
                    }
                })
        }
    }


    //Effects
    useEffect(() => {
        if (equiposSeleccionados) {
            for (let equipo of equiposSeleccionados) {
                if (!tarifas[equipo.equipoID._id] || Object.keys(tarifas[equipo.equipoID._id]).length === 0) {//Si se agrega un nuevo equipo 
                    const fechaActual = new Date();
                    let newTarifa = {
                        fechaInicio: fechaActual,
                        fechaFin: fechaActual,
                        valorTarifa: 0,
                        valorReposicion: 0,
                        cantidad: 0,
                        equipo: equipo.equipoID._id,
                        precioReferencia: {
                            categoria: "unidad",
                            tiempo: "dia habil",
                            tiempoMinimo: 0,
                            valorAlquiler: 0,
                        }
                    }
                    tarifas[equipo.equipoID._id] = newTarifa;
                }
            }
            // console.log('=========Tarifas===========================');
            // console.log(tarifas);
            // console.log('====================================');
            setTarifas(Object.assign({}, tarifas));
        }

    }, [equiposSeleccionados]);

    useEffect(() => {
        // console.log('=================COBROOOO===================');
        // console.log(tarifas);
        // console.log(cobro);
        let cobroNuevo = calcularTarifaObjeto(tarifas);
        // console.log(cobroNuevo);
        // console.log('====================================');
        setCobro(cobroNuevo);
    }, [tarifas]);

    useEffect(() => {
        async function tercerosBack() {
            const terceros = await (await (await fetch("/terceros")).json());
            setTercereos(terceros);
        }
        tercerosBack();
    }, []);

    return (
        <div className="cotizarWrapper">
            <h3>
                Cotizar
            </h3>
            <div className="buscarEquiposWrapper" >
                <div className="width100">
                    <Escoger
                        elementos={terceros}
                        elementoSelected={[terceroSeleccionado, setTerceroSeleccionado]}
                        nombre="tercero"
                        nombrePlural="terceros"
                        campos={["nombre"]}
                        camposBuscar={["nombre", "tipoDocumento", "numeroDocumento", "direccion", "ciudad", "numeroIdentificacionTributario",
                            "telefono", "celular", "email"]}
                    />
                </div>
            </div>
            <div className="buscarEquiposWrapper stickyRow" >
                <BuscarEquiposCotizados
                    className='align-self-center vertical-center'
                    equiposSeleccionados={[equiposSeleccionados, setEquiposSeleccionados]}
                    equipos={[equipos, setEquipos]}
                />
            </div>
            <div className="cotizar-tarifas-wrapper">
                <h4>Cotización</h4>
            </div>
            <div className="tabla-cotizarWrapper">
                <Table responsive>
                    {tableHead()}
                    {equiposSeleccionados && equiposSeleccionados.map((equipo, index) => (
                        <CellTableCotizazcion
                            key={index} equipo={equipo} tarifas={[tarifas, setTarifas]} index={index}
                            seleccionados={[equiposSeleccionados, setEquiposSeleccionados]}
                            cobro={[cobro, setCobro]}
                        />)
                    )}
                    {tableTotal()}
                </Table>
            </div>
            {conOrden &&
                <div>
                    <CotizarConOrden
                        bodega={[bodega, setBodega]}
                        tercero={[terceroSeleccionado, setTerceroSeleccionado]}
                    />
                </div>}
            <button type="button" className="buttonEnabled" onClick={() => guardarCotizacion(conOrden)}
                disabled=
                {(
                    conOrden &&
                    (!bodega || (bodega && Object.keys(bodega).length == 0))
                )}>
                Confirmar y Crear Cotización
            </button>
            <FormControlLabel
                label={("¿Crear con Orden?").toString().replace(" ", "\xa0")}
                className="px13-nunito"
                control={
                    <Switch
                        size="small"
                        className="rotate"
                        checked={conOrden}
                        onChange={() => setConOrden(!conOrden)}
                        color="secondary"
                        name="Fecha Límite"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                }
            >
            </FormControlLabel>
        </div>
    );
};

export default Cotizar;