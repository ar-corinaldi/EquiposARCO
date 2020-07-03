const Holidays = require('date-holidays');
const hd = new Holidays('CO')


/**
 * Función que calcula el total a cobrar por las tarifas asociadas a una cotizacion. 
 * Devuelve un objeto con el valor total por cada tarifa de cada equipo y el valor total de toda la cotización.
 * Este último es la suma de los primeros.
 * @param {[]} tarifas . Es un arreglo con tarifas asociadas a Cotizaciones. Es decir, TODAS deben tener fecha final
 */
export default function calcularTarifaCotizacion(tarifas) {
    let respuesta = {};

    if(!tarifas){
        console.log("dates");
        
        console.log(hd.getHolidays('2020'));
        
    }
    else{
        tarifas.map((tarifa) => {
        
        })

    }
}

function calcularTarifaHora(tarifa) {
    
}

function calcularTarifaDiaHabil(tarifa){

}

function calcularTarifaDia(tarifa) {
    
}

function calcularTarifaMes(params) {
    
}
