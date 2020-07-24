import React from 'react';
import {calcularFechaFinalDiaHabil, calcularDiasHabilesEntreFechas} from './utils/CacularTarifas';

//Componente para probar código, úsenlo si necesitan probar alguna función rápidamente y de forma aislada
const Prueba = () => {

    const fechaInicial = new Date("05/27/2020 4:00");
    const fechaFinal = new Date("05/27/2020 4:00");
    const diasFisrt = calcularDiasHabilesEntreFechas(fechaInicial, fechaFinal);

    const fechaDada = calcularFechaFinalDiaHabil(fechaInicial, diasFisrt);

    const diasSecond = calcularDiasHabilesEntreFechas(fechaInicial, fechaDada);

    console.log('=================init===================');
    console.log(fechaInicial);
    console.log(fechaFinal);
    console.log('==================variables==================');

    console.log('====================================');
    console.log(diasFisrt);
    console.log(fechaDada);
    console.log(diasSecond);
    console.log('====================================');

    // console.log('===================Dates=================');
    // console.log(new Date("05/01/2020 23:59:59:999").getTime());
    // console.log(new Date("05/02/2020").getTime());
    // console.log(new Date("05/02/2020 0:00:00:001").getTime());
    // console.log('====================================');
    console.log('===================Dates=================');
    console.log(new Date("05/01/2020").getTime());
    console.log(new Date("05/21/2020").getTime());
    console.log('====================================');
    return (
        <div>
            
        </div>
    );
};

export default Prueba;