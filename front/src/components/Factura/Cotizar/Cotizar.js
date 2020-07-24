import React, { useState, useEffect } from 'react';
import './Cotizar.css';
import BuscarEquiposCotizados from './BuscarEquiposCotizados';
import CellTableCotizazcion from './CellTablaCotizacion';
import Table from 'react-bootstrap/Table';
import { calcularTarifaObjeto } from '../../utils/CacularTarifas';

const Cotizar = () => {
    let [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
    const [tarifas, setTarifas] = useState({});
    const [cobro, setCobro] = useState({});

    //funciones

    function tableHead() {
        if (equiposSeleccionados.length > 0) {
            return (
                <thead>
                    <tr className='center'>
                        <th>Nombre Equipo</th>
                        <th>Cantidad Cotizada</th>
                        <th>Cobro por</th>
                        <th>Precio x Unidad</th>
                        <th>Tiempo en</th>
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

    return (
        <div className="cotizarWrapper">
            <h3>
                Cotizar
            </h3>
            <div className="buscarEquiposWrapper stickyRow" >
                <BuscarEquiposCotizados
                    className='align-self-center vertical-center'
                    equiposSeleccionados={[equiposSeleccionados, setEquiposSeleccionados]}
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
                    {/* {tableBody()} */}
                </Table>
            </div>
        </div>
    );
};

export default Cotizar;