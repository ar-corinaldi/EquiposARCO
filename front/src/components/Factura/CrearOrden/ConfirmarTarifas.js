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
    const [camposCorrectos, setCamposCorrectos] = useState(false);

    //Funciones
    
    /**
     * Suma la cantidad necesaria de cada equipo individual y la agrega en la variable inventario. 
     * Recordar que equipos compuestos (como andamios), tienen disponibilidad basada en sus componentes individuales (marcos y crucetas por ej)
     */
    function calcularInventarioRequerido() {
        inventario = {};
        tarifasFinales.forEach((tarifaAgrupada) => {
            const cantidad = tarifaAgrupada.tarifasPorEquipo[0].cantidad;
            inventarioRequeridoPorEquipo( inventario, tarifaAgrupada.tarifasPorEquipo[0].equipo, cantidad);
        })
        console.log(inventario);
        setInventario(inventario);
    }
    // calcularInventarioRequerido();

    /**
     * Calcula de forma recursiva la cantidad requerida de cada componente individual de los que forman un equipo
     * y las almacena en el objeto inventario.
     * @param {Object} inventario. Objeto que almacenará la cantidad requerida por cada equipo individual
     * @param {Object} equipo. Objeto con la información de un equipo
     * @param {Number} cantidad. Cantidad requerida del equipo anterior
     */
    function inventarioRequeridoPorEquipo(inventario, equipo, cantidad) {
        if(!equipo.componentes || equipo.componentes.length === 0){
            const id = equipo.equipoID ? equipo.equipoID : equipo._id; //Si es un componente se usa EquipoID, si no, el _id es precisamente el id del equipo.
            const valorActual = inventario[id] ? inventario[id] : 0;
            inventario[id] = valorActual + new Number(cantidad);
        }
        else if(equipo.componentes.length > 0){
            equipo.componentes.forEach( (componente) => {
                inventarioRequeridoPorEquipo(inventario, componente, cantidad * componente.cantidad);
            })
        }

        
    }

    //TODO
    //Llamar esto cada vez que cambien las tarifas finales, debería estar dentro de un useEffect
    //Que salga la fila de las tarifas con vainas faltantes coloreada de rojo
    //Toca mostrar en algún lado la disponibilidad de los equipos en inventario

    /**
     * Verifica la disponibilidad en bodega de los equipos de la variable inventario que contiene cuantos se necesitan de cada uno
     */
    function verificarDisponibilidadInventario() {
        if(Object.keys(inventario).length == 0 ){

        }
        else{
            let inventarioFaltante = [];
            Object.keys(inventario).forEach( async (equipo) => {
                //verfificar en el back la cantidad de equipo en inventario
                let cantidadRequerida = inventario[equipo];
                const cantidadDisponible = await ( await fetch("/equipos/"+equipo+"/cantidadBodega")).json();
                console.log("CantidadDisponible");
                console.log(cantidadDisponible);
                if( cantidadDisponible < cantidadRequerida){
                    //Errorcito, ojo con eso manito
                    inventarioFaltante.push({equipo: equipo, requerido: cantidadRequerida, disponible: cantidadDisponible})
                    //Señalar las tarifas que tienen equipos faltantes
                }
                else{
                    //todo good, continúe
                }
                //Si tooodo está good, Se activa el botón que deja registrar la orden en el back 
                //y reducir el número de equipos disponibles (subrutina a parte).
                //Mensaje de confirmación y se les redirige a orden detail. Recuerda guardar tarifas agrupadas.
                //Opcional, meter nombre de obra (esto va a ser algo complejo)
                if( inventarioFaltante.length === 0){
                    setCamposCorrectos(true);
                }
                else{
                    setCamposCorrectos(false);
                }
                console.log("inventario Faltante");
                console.log(inventarioFaltante);
            })
        }
        
    }

    /**
     * Se activa cuando se le da click a confirmar y guardar orden. Este botón solo está activo cuando los campos son correctos.
     * Es decir, cuando hay suficiente disponibilidad en inventario como para realizar la orden
     * @param {*} props 
     */
    function guardarOrden(props) {
        
    }

    //Effects

    //TODO
    //Para cuánto alcanza de cada uno? optimizar el precio de alquiler total si cada uno tiene un precio y comparten equipos (problema de la mochila)
    /**
     * Si las tarifas finales de la orden cambian, vuelve a llamar el métodoque verfifica la disponibilidad en bodega
     * de los equipos necesarios para realizar la orden en su totalidad
     */
    useEffect(() => {
        calcularInventarioRequerido();
        verificarDisponibilidadInventario();
    }, [tarifasFinales]);

    useEffect(() => {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            // setTarifasFinales(cotizacionSeleccionada.tarifasCotizadas);
            let tarifasAgrupadas = []
            cotizacionSeleccionada.tarifasCotizadas.forEach((tarifa)=>{
                let grupo = []
                grupo.push(tarifa);
                const object = {tarifasPorEquipo: grupo}
                tarifasAgrupadas.push(object);
            })
            setTarifasFinales(tarifasAgrupadas);
        }
        else {
            setTarifasFinales([]);
        }
    }, [cotizacionSeleccionada]);

    //TODO
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
                        {/*Total */}
                    </tr>
                </thead>
                {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                    return <ConfirmarTarifaDetail 
                    key={index}
                    index = {index} 
                    tarifas={[tarifasFinales, setTarifasFinales]} 
                    cobro={{}} 
                    inventario={[inventario, setInventario]} 
                    camposCorrectos = {setCamposCorrectos}
                    />
                })}
            </Table>
            {/*Agregar una tarifa */}
            <button type="button" className="buttonEnabled"  disabled = {!camposCorrectos}> {/*Activo solo cuando el estado de todo correcto sea true  */}
                Confirmar y Crear orden
            </button>
        </div >
    );
}

export default ConfirmarTarifas;