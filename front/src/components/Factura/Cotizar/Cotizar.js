import React, { useState, useEffect } from 'react';
import './Cotizar.css';
import BuscarEquiposCotizados from './BuscarEquiposCotizados';
import Escoger from '../../Escoger';
import CellTableCotizazcion from './CellTablaCotizacion';
import Table from 'react-bootstrap/Table';
import { calcularTarifaObjeto } from '../../utils/CacularTarifas';
import formatoPrecios from '../../utils/FormatoPrecios';

const Cotizar = () => {
    let [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
    const [tarifas, setTarifas] = useState({});
    const [cobro, setCobro] = useState({});
    const [terceros, setTercereos] = useState([]);
    const [terceroSeleccionado, setTerceroSeleccionado] = useState({});
    const [equipos, setEquipos] = useState([]);

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
            return <p className="mt-0 mb-0 pt-0 pb-0">No ha seleccionado ningún equipo</p >
        }
    }
    //Funciones

    function guardarCotizacion() {
        // if (equiposSeleccionados && tarifas && Object.keys(tarifas) > 0 && Object.keys(terceroSeleccionado) > 0) {
        let cotizacion = {};

        console.log("Guardaaaar cotization-----------------------------------");
        console.log(tarifas);
        console.log(terceroSeleccionado);
        console.log(cobro);
        console.log("-----------------------------------");
        console.log(Object.keys(tarifas));
        console.log(Object.keys(terceroSeleccionado));
        console.log(Object.keys(cobro));

        if(Object.keys(tarifas).length && Object.keys(cobro).length && Object.keys(terceroSeleccionado).length ){
            cotizacion.precioTotal = cobro.cobroCompleto;
            cotizacion.tercero = terceroSeleccionado._id;
            cotizacion.tarifasCotizadas = [];
            console.log('=============COTIZANDO ANDO=======================');
            console.log(cotizacion);
            console.log('====================================');
        }



        // }

    }


    //Effects
    useEffect((props) => {
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
                    if(equipo.nombreEquipo == 'prueba nota inventario'){
                        console.log('=================EQQUIPO JODON===================');
                        console.log(equipo);
                        console.log('====================================');
                      }
                }
            }
            console.log('=========Tarifas===========================');
            console.log(tarifas);
            console.log('====================================');
            setTarifas(Object.assign({}, tarifas));
        }

    }, [equiposSeleccionados]);

    useEffect(() => {
        console.log('=================COBROOOO===================');
        console.log(tarifas);
        console.log(cobro);
        let cobroNuevo = calcularTarifaObjeto(tarifas);
        console.log(cobroNuevo);
        console.log('====================================');
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
                    <tbody>
                        <tr>
                            <th>Total</th>
                            <th></th><th></th><th></th><th></th>
                            <th className ='center'>{cobro && formatoPrecios(cobro.cobroCompleto)}</th>
                            <th></th>
                        </tr>

                    </tbody>
                </Table>
            </div>
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
            <button type="button" className="buttonEnabled" onClick={guardarCotizacion}>
                Confirmar y Crear Cotización
            </button>
        </div>
    );
};

export default Cotizar;