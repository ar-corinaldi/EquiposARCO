import React, { useState, useEffect } from 'react';
import './ConfirmarTarifas.css'
import ConfirmarTarifaDetail from './ConfirmarTarifaDetail';
import Table from "react-bootstrap/Table";
import Toast from "../../Toast";

function ConfirmarTarifas(props) {
    //Estados globales
    const [miEstado, setMiEstado] = props.miEstado;
    const [primerEstado, setPrimerEstado] = props.primerEstado;
    const [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    let [inventario, setInventario] = useState({}); //Aquí se almacenarán las existencias necesarias de cada equipo individual (no compuestos) para que esta ordens sea exitosa
    let [raicesSinInventario, setRaicesSinInventario] = useState({});//Acá están los equipos de la orden que tienen problemas con existencias en inventario

    //Estados propios
    const [tarifasFinales, setTarifasFinales] = useState([]);
    const [camposCorrectos, setCamposCorrectos] = useState(false);
    let [toastRender, setToastRender] = useState({ tiempo: new Date().getTime(), mensajePrevio: "" });
    const [editando, setEditando] = useState(0);

    //variables

    //Funciones

    /**
     * Suma la cantidad necesaria de cada equipo individual y la agrega en la variable inventario. 
     * Recordar que equipos compuestos (como andamios), tienen disponibilidad basada en sus componentes individuales (marcos y crucetas por ej)
     */
    function calcularInventarioRequerido() {
        inventario = {};
        tarifasFinales.forEach((tarifaAgrupada) => {
            const cantidad = tarifaAgrupada.tarifasPorEquipo[0].cantidad;
            let equipo = tarifaAgrupada.tarifasPorEquipo[0].equipo;
            inventarioRequeridoPorEquipo(inventario, equipo, cantidad, equipo);
        })
        console.log('==============INVENTARIO======================');
        console.log(inventario);
        console.log('====================================');
        setInventario(inventario);
    }
    // calcularInventarioRequerido();

    /**
     * Calcula de forma recursiva la cantidad requerida de cada componente individual de los que forman un equipo
     * y las almacena en el objeto inventario.
     * @param {Object} inventario. Objeto que almacenará la cantidad requerida por cada equipo individual
     * @param {Object} equipo. Objeto con la información de un equipo
     * @param {Number} cantidad. Cantidad requerida del equipo anterior
     * @param {Object} equipoRaiz. Equipo padre de todo el arbol de componentes
     */
    function inventarioRequeridoPorEquipo(inventario, equipo, cantidad, equipoRaiz) {
        if (!equipo.componentes || equipo.componentes.length === 0) {
            const id = equipo.equipoID ? equipo.equipoID : equipo._id; //Si es un componente se usa EquipoID, si no, el _id es precisamente el id del equipo.
            const idRaiz = equipoRaiz.equipoID ? equipoRaiz.equipoID : equipoRaiz._id;

            //Actualizar cantidad requerida de esste equipo
            const cantidadPrevia = inventario[id] && inventario[id].cantidadRequerida ? inventario[id].cantidadRequerida : 0;
            if (inventario[id])
                inventario[id].cantidadRequerida = new Number(cantidadPrevia) + new Number(cantidad);
            else
                inventario[id] = { cantidadRequerida: cantidadPrevia + cantidad }

            agregarRaizAInventario(idRaiz, id);

        }
        else if (equipo.componentes.length > 0) {
            equipo.componentes.forEach((componente) => {
                inventarioRequeridoPorEquipo(inventario, componente, cantidad * componente.cantidad, equipoRaiz);
            })
        }


    }

    /**
     * Agrega una equipo raiz al arreglo de raices de un equipo del inventario
     * @param {*} idRaiz. Id de un equipo raiz
     * @param {*} idEquipo. idEquipo en inventario
     */
    function agregarRaizAInventario(idRaiz, idEquipo) {
        if (inventario[idEquipo] && inventario[idEquipo].raices) {
            inventario[idEquipo].raices.push({ id: idRaiz })
        }
        else if (inventario[idEquipo]) {
            inventario[idEquipo].raices = [{ id: idRaiz }]
        }
    }

    //TODO
    //Llamar esto cada vez que cambien las tarifas finales, debería estar dentro de un useEffect
    //Que salga la fila de las tarifas con vainas faltantes coloreada de rojo
    //Toca mostrar en algún lado la disponibilidad de los equipos en inventario

    /**
     * Verifica la disponibilidad en bodega de los equipos de la variable inventario que contiene cuantos se necesitan de cada uno
     */
    async function verificarDisponibilidadInventario() {
        if (Object.keys(inventario).length == 0) {

        }
        else {
            let inventarioFaltante = [];
            raicesSinInventario = {};
            for (const idEquipo of Object.keys(inventario)) {
                //verfificar en el back la cantidad de equipo en inventario
                let cantidadRequerida = inventario[idEquipo].cantidadRequerida;
                const cantidadDisponible = await (await fetch("/equipos/" + idEquipo + "/cantidadBodega")).json();
                console.log("CantidadDisponible");
                console.log(cantidadDisponible);
                if (cantidadDisponible < cantidadRequerida) {
                    //Errorcito, ojo con eso manito
                    inventarioFaltante.push({ equipo: idEquipo, requerido: cantidadRequerida, disponible: cantidadDisponible })
                    //Señalar las tarifas que tienen equipos faltantes
                    agregarRaicesFaltantes(inventario[idEquipo]);

                }
                else {
                    //todo good, continúe
                }
            }

            //Si tooodo está good, Se activa el botón que deja registrar la orden en el back 
            //y reducir el número de equipos disponibles (subrutina a parte).
            //Mensaje de confirmación y se les redirige a orden detail. Recuerda guardar tarifas agrupadas.
            //Opcional, meter nombre de obra (esto va a ser algo complejo)
            if (inventarioFaltante.length === 0) {
                setCamposCorrectos(true);
            }
            else {
                console.log('falta inventario muchote');
                setCamposCorrectos(false);
                mostrarError(inventarioFaltante);
            }
            // setInventarioFaltante(Object.assign({}, inventarioFaltante));
            console.log("inventario Faltante");
            console.log(inventarioFaltante);
            console.log(raicesSinInventario);
        }

    }

    /**
     * Agrega al objeto de raices faltantes las raices dentro del arreglo de equipoFaltante
     * @param {*} equipoFaltante. Un objeto de arreglo de inventario para el cuál no hay disponibilidad suficiente en inventario
     */
    function agregarRaicesFaltantes(equipoFaltante) {
        let raicesFaltantes = {};
        for (const raiz of equipoFaltante.raices) {
            raicesFaltantes[raiz.id] = true;
        }
        setRaicesSinInventario(Object.assign(raicesSinInventario, raicesFaltantes));
    }

    /**
     * Muestra hasta 4 mensajes de error por cada equipo del cual no hayan las existencias requeridas para
     * hacer la orden
     * @param {Array} inventarioFaltante. Arreglo con información de cuánto falta por equipo.
     */
    function mostrarError(inventarioFaltante) {
        //Solo renderiza el Toast si han pasado más de 150ms desde el último render
        let now = new Date().getTime();
        const diff = now - toastRender.tiempo;
        if (diff > 150 && primerEstado === "complete") {
            if (inventarioFaltante.length > 0) {
                let errores = "";
                let erroresSobrantes = 0;
                console.log('====================================');
                console.log(inventarioFaltante);
                console.log('====================================');
                inventarioFaltante.forEach((equipoFaltante, index) => {
                    if (index < 3) {
                        let error = ("Falta " + (equipoFaltante.requerido - equipoFaltante.disponible) + " existencias de "
                            + equipoFaltante.equipo + " en inventario." + "\n");
                        errores += error;
                    }
                    else {
                        erroresSobrantes += 1;
                    }
                })
                if (erroresSobrantes) {
                    errores += ("Hay otros" + erroresSobrantes + " equipos en esta orden con errores." + "\n")
                }
                if ((errores != toastRender.mensajePrevio) || (errores === toastRender.mensajePrevio && diff > 2000)) {
                    //Renderiza solo si el mensaje es distinto o si es igual y ha pasado más de dos segundos desde el último render
                    console.log("previo: " + toastRender.mensajePrevio);
                    console.log("actual: " + errores);
                    Toast([errores], 5000, 500);
                }
                setToastRender({ tiempo: new Date().getTime(), mensajePrevio: errores });
                console.log("previo ahora: " + toastRender.mensajePrevio);
            }
        }

    }

    /**
     * Se activa cuando se le da click a confirmar y guardar orden. Este botón solo está activo cuando los campos son correctos.
     * Es decir, cuando hay suficiente disponibilidad en inventario como para realizar la orden
     * @param {*} props 
     */
    async function guardarOrden(props) {
        if (!editando) {
            if (bodegaSeleccionada && bodegaSeleccionada.direccionBodega) {
                let orden = {};
                orden.bodega = bodegaSeleccionada;
                if (tarifasFinales && tarifasFinales.length > 0) {
                    orden.tarifasDefinitivas = tarifasFinales;
                    orden.cotizacion = cotizacionSeleccionada._id;
                    console.log('orden crear orden');
                    console.log(orden);
                    await fetch("/bodegas/" + orden.bodega._id + "/ordenes", {
                        method: "POST",
                        body: JSON.stringify(orden),
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            document.location.href = "/terceros/" + response.bodega.duenio
                                + "/bodegas/" + response.bodega._id + "/ordenes/"
                                + response._id;
                        })
                }
                else {
                    Toast(["La orden está vacía"], 6000, 400);
                }
            }
            else {
                Toast(["Profavor, seleccione una bodega destino"], 7000, 500);

            }
        }
        else {
            Toast(["Termine de editar los campos antes de continuar"], 5000, 500);
        }
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
            console.log('==============COTIZACION SELECT======================');
            console.log(cotizacionSeleccionada);
            console.log('====================================');
            let tarifasAgrupadas = []
            cotizacionSeleccionada.tarifasCotizadas.forEach((tarifa) => {
                let grupo = []
                grupo.push(tarifa);
                const object = { tarifasPorEquipo: grupo }
                tarifasAgrupadas.push(object);
            })
            console.log(tarifasAgrupadas);
            console.log('============AGRUPADAS | ========================');
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
            <Table responsive className="mt-4 mb-4" borderless  >
                <thead>
                    <tr className="borderedRow">
                        <th className="sticky-col" >Nombre Equipo</th>
                        <th>Cantidad</th>
                        <th>Unidad de Cobro</th>
                        <th>Precio x Unidad</th>
                        <th>Tipo de Cobro</th>
                        {/* <th>Tiempo a cobrar</th>Editable. Cuándo me meta con multiples tarifas toca verificar que no se traslapen */}
                        {/*También hay que dejar seleccionarlo basado en fecha inicial y fecha final o basado en unidad de tiempo y fecha inicial*/}
                        <th>Periodo de Validez</th>
                        <th>Acción</th>{/*Habilitar edición solo cuando le hagan click al lapicito, toca tener un botón de aceptar, otro de cancelar
                        para los cambios hechos */}
                        {/*Total */}
                    </tr>
                </thead>
                {tarifasFinales && tarifasFinales.map((tarifa, index) => {
                    console.log(`Reaciendo el map. Index: ${index}. Cantidad: ${tarifa.tarifasPorEquipo[0].cantidad}`);
                    return <ConfirmarTarifaDetail
                        key={index}
                        index={index}
                        tarifas={[tarifasFinales, setTarifasFinales]}
                        cobro={{}}
                        inventario={[inventario, setInventario]}
                        camposCorrectos={setCamposCorrectos}
                        editando={setEditando}
                        raicesSinInventario={raicesSinInventario}
                    />
                })}
            </Table>
            {/*Agregar una tarifa */}
            <button type="button" className="buttonEnabled" disabled={!camposCorrectos} onClick={guardarOrden}>
                Confirmar y Crear orden
            </button>
        </div >
    );
}

export default ConfirmarTarifas;