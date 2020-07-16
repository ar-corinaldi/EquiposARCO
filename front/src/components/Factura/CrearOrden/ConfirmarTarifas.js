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

    useEffect((props) => {
        if (cotizacionSeleccionada && cotizacionSeleccionada.tarifasCotizadas) {
            setTarifasFinales(cotizacionSeleccionada.tarifasCotizadas);
        }
        else {
            setTarifasFinales([]);
        }
    }, [cotizacionSeleccionada]);


    return (
        <div className={(miEstado === "active" ? "show" : "hide") + " width100"}>
            {/* {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                return <ConfirmarTarifaDetail tarifa={tarifa} cobro={{}} inventario={[inventario, setInventario]} />
            })} */}
            <Table responsive className="mt-4"  >
                <thead>
                    <tr>
                        <th>Nombre Equipo</th>
                        <th>Unidad de Cobro</th>
                        <th>Precio x Unidad</th>
                        <th>Cantidad</th>
                        <th>Tipo de Cobro</th>
                        <th>Tiempo a cobrar</th>
                        <th>Valor a cobrar</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                {!tarifasFinales ? "" : tarifasFinales.map((tarifa, index) => {
                    return <ConfirmarTarifaDetail tarifa={tarifa} cobro={{}} inventario={[inventario, setInventario]} />
                })}
            </Table>
        </div>
    );
}

export default ConfirmarTarifas;