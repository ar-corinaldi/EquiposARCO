import React, { useState } from 'react';
import './Cotizar.css';
import BuscarEquiposCotizados from './BuscarEquiposCotizados';

const Cotizar = () => {
    const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
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
            {equiposSeleccionados.map((equipo, index) => {
                return <h2 key={index} >{equipo.equipoID._id}</h2>

            })}
        </div>
    );
};

export default Cotizar;