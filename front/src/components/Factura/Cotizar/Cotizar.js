import React, { useState, useEffect } from 'react';
import './Cotizar.css';
import BuscarEquiposCotizados from './BuscarEquiposCotizados';
import CellTableCotizazcion from './CellTablaCotizacion';
import Table from 'react-bootstrap/Table';

const Cotizar = () => {
    const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
    const [tarifas, setTarifas] = useState({});

    //funciones

    function tableHead() {
        if (equiposSeleccionados.length > 0) {
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
                </thead>)
        }
    }
    //Funciones

    function tableBody() {
        if (equiposSeleccionados.length > 0) {
            let response = equiposSeleccionados.map((equipo, index) => {
                return <CellTableCotizazcion key={index} equipo={equipo} />
            })
            return response;
        }
    }

    //Effects
    useEffect((props) => {
        for (let equipo of equiposSeleccionados) {
            if (!tarifas[equipo.equipoID._id] || !tarifas[equipo.equipoID._id].cantidad) {//Si se agrega un nuevo equipo
                const fechaActual = new Date();
                let newTarifa = {
                    fechaInicio: fechaActual,
                    fechaFin: fechaActual,
                    valorTarifa: 0,
                    valorReposicion: 0,
                    cantidad: 0
                }
                tarifas[equipo.equipoID._id] = newTarifa;
            }
        }
        console.log('=========Tarifas===========================');
        console.log(tarifas);
        console.log('====================================');
        setTarifas(Object.assign({}, tarifas));

    }, [equiposSeleccionados]);

    return (
        <div className="cotizarWrapper">
            <h3>
                Cotizar
            </h3>
            <div className="buscarEquiposWrapper" >
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
                    {equiposSeleccionados.map((equipo, index) => {
                        return (
                            <CellTableCotizazcion
                                key={index} equipo={equipo} tarifas={[tarifas, setTarifas]} index={index}
                            />)
                    })}
                </Table>
            </div>
            {/* {equiposSeleccionados.map((equipo, index) => {
                return <h2 key={index} >{equipo.equipoID._id}</h2>
            })} */}
        </div>
    );
};

export default Cotizar;