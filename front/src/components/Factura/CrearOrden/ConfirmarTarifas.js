import React, { useState, useEffect } from 'react';
import './ConfirmarTarifas.css'
import ConfirmarTarifaDetail from './ConfirmarTarifaDetail';
import Table from "react-bootstrap/Table";

function ConfirmarTarifas(props) {
    //Estados globales
    const [miEstado, setMiEstado] = props.miEstado;
    const [primerEstado, setPrimerEstado] = props.primerEstado;
    const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    let [inventario, setInventario] = useState({}); //Aquí se almacenarán las existencias necesarias de cada equipo individual para que esta ordens sea exitosa

    //Estados propios
    const [tarifasFinales, setTarifasFinales] = useState([]);
    //Suma la cantidad necesaria de cada equipo individual y la agrega en la variable inventario
    function calcularInventarioRequerido() {
        inventario = {};
        tarifasFinales.forEach((tarifa) => {
            const cantidad = tarifa.cantidad;
            if (tarifa.equipo.componentes.length == 0) {
                //Suma la cantidad de esta tarifa a la ya existente en el inventario
                const valorActual = inventario[tarifa.equipo._id] ? inventario[tarifa.equipo._id] : 0;
                inventario[tarifa.equipo._id] = valorActual + cantidad;
            }
            else if (tarifa.equipo.componentes.length > 0) {
                tarifa.equipo.componentes.forEach((equipo) => {
                    const valorActual = inventario[equipo.equipoID] ? inventario[equipo.equipoID] : 0;
                    inventario[equipo.equipoID] = valorActual + cantidad * equipo.cantidad;
                })
            }
        })
        console.log(inventario);

    }
    calcularInventarioRequerido();

    //Llamar esto cada vez que cambien las tarifas finales, debería estar dentro de un useEffect
    //Que salga la fila de las tarifas con vainas faltantes coloreada de rojo
    //Toca mostrar en algún lado la disponibilidad de los equipos en inventario
    function verificarInventario() {
        if(Object.keys(inventario).length == 0 ){

        }
        else{
            let inventarioFaltante = [];
            Object.keys(inventario).forEach( async (equipo) => {
                //verfificar en el back la cantidad de equipo en inventario
                let cantidadRequerida = inventario[equipo];
                const cantidadDisponible = await ( await fetch("/equipos/"+equipo+"/inventaio")).json();
                if( cantidadDisponible < cantidadRequerida){
                    //Errorcito, ojo con eso manito
                    inventarioFaltante.push({equipo: equipo, requerido: cantidadRequerida, disponible: cantidadDisponible})
                    //Señalar las tarifas que tienen equipos faltantes
                }
                else{
                    //todo good, continúe
                }
            })
        }
        
    }

    //Para cuánto alcanza de cada uno? optimizar el precio de alquiler total si cada uno tiene un precio y comparten equipos (problema de la mochila)

    useEffect((props) => {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            setTarifasFinales(cotizacionSeleccionada.tarifasCotizadas);
        }
        else {
            setTarifasFinales([]);
        }
    }, [cotizacionSeleccionada]);


    return (
        <div className={(miEstado === "active" && cotizacionSeleccionada ? "show" : "hide") + " width100"}>
            {/* {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                return <ConfirmarTarifaDetail tarifa={tarifa} cobro={{}} inventario={[inventario, setInventario]} />
            })} */}
            <Table responsive className="mt-4"  >
                <thead>
                    <tr>
                        <th className="sticky-col" >Nombre Equipo</th>
                        <th>Unidad de Cobro</th>
                        <th>Precio x Unidad</th>
                        <th>Cantidad</th>{/*Que sea editable, toca mostrar también cuánto hay en bodega */}
                        <th>Tipo de Cobro</th>
                        <th>Tiempo a cobrar</th>{/*Editable. Cuándo me meta con multiples tarifas toca verificar que no se traslapen*/}
                        {/*También hay que dejar seleccionarlo basado en fecha inicial y fecha final o basado en unidad de tiempo y fecha inicial*/}
                        <th>Valor a cobrar</th>
                        <th>Acción</th>{/*Habilitar edición solo cuando le hagan click al lapicito, toca tener un botón de aceptar, otro de cancelar
                        para los cambios hechos */}
                    </tr>
                </thead>
                {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                    return <ConfirmarTarifaDetail tarifa={tarifa} cobro={{}} inventario={[inventario, setInventario]} />
                })}
            </Table>
            <button type="button" className="buttonEnabled"  >
                Confirmar y Crear orden
            </button>
        </div >
    );
}

export default ConfirmarTarifas;