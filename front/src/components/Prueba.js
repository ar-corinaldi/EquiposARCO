import React from 'react';
import {calcularFechaFinalDiaHabil, calcularDiasHabilesEntreFechas} from './utils/CacularTarifas';

//Componente para probar código, úsenlo si necesitan probar alguna función rápidamente y de forma aislada
const Prueba = () => {

    const fechaInicial = new Date("01/01/2020");
    const fechaFinal = new Date("02/28/2020");
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
    return (
        <div>
            
        </div>
    );
};

export default Prueba;