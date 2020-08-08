import React, { useEffect, useState } from 'react';
import EscogerBodega from "../CrearOrden/EscogerBodega";
import BodegaOrdenDetail from "../CrearOrden/BodegaOrdenDetail";

const CotizarConOrden = (props) => {
    const [bodega, setBodega] = props.bodega;
    const [terceroSeleccionado, setTerceroSeleccionado] = props.tercero;
    const [bodegasBack, setBodegasBack] = useState([]);


    useEffect(() => {
        async function fetchBodegas() {
            const bodegasFetched = await (await fetch("/bodegas/all")).json();
            setBodegasBack(bodegasFetched);

        }
        if (terceroSeleccionado && Object.keys(terceroSeleccionado).length > 0) {
            fetchBodegas();
        }
    }, [terceroSeleccionado])

    return (
        <div 
        className="buscarEquiposWrapper display-block"
        >
            <div className="width100">
                <EscogerBodega
                    bodegaSeleccionada={[bodega, setBodega]}
                    bodegas={[bodegasBack, setBodegasBack]}
                />
            </div>
            <div className="bg-white fit-content">
                <BodegaOrdenDetail bodegaSeleccionada={[bodega, setBodega]} />
            </div>
        </div>
    );
};

export default CotizarConOrden;