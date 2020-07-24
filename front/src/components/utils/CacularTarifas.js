const Holidays = require("date-holidays");
const hd = new Holidays("CO");

const categorias = ["unidad", "metro", "metro2", "metro3", "venta"];

const tiempo = ["hora", "dia cal", "dia habil", "semana", "mes", "anio"];

const holidays = hd.getHolidays(new Date().getFullYear()); //Arreglo con fecha y descripción de los festivos de Colombia en el año actual

const conversion = {
  hora: 1000 * 3600,
  "dia cal": 1000 * 3600 * 24,
  semana: 1000 * 3600 * 24 * 7,
  mes: 1000 * 3600 * 24 * 30,
  anio: 1000 * 3600 * 24 * 365,
}; //Tasa de conversión de milisengundos a cada unidad de medida

//
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------> FUNCIONES
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//



/**
 * Función que calcula el total a cobrar por las tarifas asociadas a una cotizacion.
 * Devuelve un objeto con el valor total por cada tarifa de cada equipo y el valor total de toda la cotización. Cada ID de cada tarifa
 * es un campo en la respuesta, donde los valores de ese campo son el total a cobrar por esa tarifa, el tiempo total y los festivos encontrados
 * en caso de que la tarifa sea por día hábil.
 * Este último es la suma de los primeros.
 * @param {[]} tarifas . Es un arreglo con tarifas asociadas a Cotizaciones. Es decir, TODAS deben tener fecha final y precio referencia
 * Además el campo de precio de Referencia TIENE que estar populado, ya que este se usa para ver el tiempo mínimo y la unidad de medida
 */
export default function calcularTarifaCotizacion(tarifas) {
  let respuesta = {};
  let cobroCompleto = 0;
  if (!tarifas) {
    return respuesta;
    // console.log("dates");
    // console.log(hd.getHolidays("2020"));
    // const hd1 = holidays[0];
    // console.log(hd1.date);
    // console.log(new Date("2020-07-04T05:00:00.000+00:00").getDay());
    // console.log(0 % 6);
  } else {
    tarifas.map((tarifa) => {
      let informaciónCobroTarifa = {};
      if (!tarifa.precioReferencia || !tarifa.precioReferencia.tiempo) {
        return null;
      } else {
        const tiempoMinimo = tarifa.precioReferencia.tiempoMinimo;
        const medidaTiempo = tarifa.precioReferencia.tiempo;
        if (medidaTiempo != "dia habil") {
          const calculo = calcularTarifa(tarifa, medidaTiempo, tiempoMinimo);
          informaciónCobroTarifa.cobroTotal = calculo.precioTotal;
          informaciónCobroTarifa.tiempoTotal = calculo.tiempoTotal;
          cobroCompleto += calculo.precioTotal;
        } else {
          const calculo = calcularTarifaDiaHabil(tarifa, tiempoMinimo);
          informaciónCobroTarifa.cobroTotal = calculo.precioTotal;
          informaciónCobroTarifa.tiempoTotal = calculo.diasTotales;
          informaciónCobroTarifa.festivos = calculo.festivosEnMedio;
          cobroCompleto += calculo.precioTotal;
        }
      }
      respuesta[tarifa._id] = informaciónCobroTarifa;
    });
    respuesta.cobroCompleto = cobroCompleto;
    return respuesta;
  }
}




/**
 * Función que calcula el total a cobrar por las tarifas asociadas a una cotizacion.
 * Devuelve un objeto con el valor total por cada tarifa de cada equipo y el valor total de toda la cotización. Cada ID del equipo de cada tarifa
 * es un campo en la respuesta, donde los valores de ese campo son el total a cobrar por esa tarifa, el tiempo total y los festivos encontrados
 * en caso de que la tarifa sea por día hábil.
 * Este último es la suma de los primeros.
 * @param {Object} tarifa. Este es un OBJETO donde en cada propiedad tiene una tarifa. Ej: {propiedad1: tarifa1, ... propiedadN: tarifaN};
 * Solo debe haber UNA tarifa por cada equipo, está pensado para usarse en cotizaciones donde este es el caso
 */
export function calcularTarifaObjeto(tarifas) {
  let respuesta = {};
  let cobroCompleto = 0;
  if (!tarifas) {
    return respuesta;
  }
  else {
    Object.keys(tarifas).map((key) => {
      let tarifa = tarifas[key];
      let informaciónCobroTarifa = {};
      if (!tarifa.precioReferencia || !tarifa.precioReferencia.tiempo) {
        return null;
      } else {
        const tiempoMinimo = tarifa.precioReferencia.tiempoMinimo;
        const medidaTiempo = tarifa.precioReferencia.tiempo;
        if (medidaTiempo != "dia habil") {
          const calculo = calcularTarifa(tarifa, medidaTiempo, tiempoMinimo);
          informaciónCobroTarifa.cobroTotal = calculo.precioTotal;
          informaciónCobroTarifa.tiempoTotal = calculo.tiempoTotal;
          cobroCompleto += calculo.precioTotal;
        } else {
          const calculo = calcularTarifaDiaHabil(tarifa, tiempoMinimo);
          informaciónCobroTarifa.cobroTotal = calculo.precioTotal;
          informaciónCobroTarifa.tiempoTotal = calculo.diasTotales;
          informaciónCobroTarifa.festivos = calculo.festivosEnMedio;
          cobroCompleto += calculo.precioTotal;
        }
      }
      respuesta[(tarifa.equipo._id || tarifa.equipo)] = informaciónCobroTarifa;
    });
    respuesta.cobroCompleto = cobroCompleto;
    return respuesta;
  }
}




/**
 * @param {Object} tarifa. Único campo requerido, si los otros faltan, los campos de tarifa serán los usados por defecto
 * @param {Number} tiempoMinimo. Tiempo mínimo para calcular el valor da cobrar, por defecto es 0.
 * @param {Date} fechaInicio. Fecha de inicio del periodo de tiempo a calcular, si no se le pasa se usa la de tarifa.
 * @param {Date} fechaFin. Fecha fin del periodo de tiempo a calcular, si no se le pasa se usa la de tarifa.
 * @param {Number}} cantidad. Cantidad de equipos para los cuales sacar el cobro total, si no se pasa se usa la de tarifa.
 */
export function calcularTarifaDiaHabil(
  tarifa,
  tiempoMinimo = 0,
  fechaInicio,
  fechaFin,
  cantidad
) {
  const fechaInicial = fechaInicio || (tarifa && new Date(tarifa.fechaInicio));
  const fechaFinal = fechaFin || (tarifa && new Date(tarifa.fechaFin));
  const cantidadUsada = cantidad || (tarifa && tarifa.cantidad);
  if (!fechaFinal || !fechaInicial || (cantidadUsada !== 0 && !cantidadUsada)) {
    return null;
  } else {
    const timeDifference = fechaFinal.getTime() - fechaInicial.getTime();
    const diff = timeDifference / (1000 * 3600 * 24)
    let dias = Math.ceil(diff);

    //Si la diferencia de tiempo es un multiplo exacto de un día, se agrega uno más. A menos que la diferencia sea Cero.
    if(dias !== 0 && dias !== 1  && (Math.ceil(diff) === Math.floor(diff)) ){
      dias += 1; 
    }
    const semanas = Math.floor(dias / 7);
    //Quita dos días por cada semana (Sábado y Domingo)
    dias -= semanas * 2;

    //Manejo de casos especiales
    const diaInicial = fechaInicial.getDay();
    const diaFinal = fechaFinal.getDay();

    //Quita días que faltaron
    if (diaInicial - diaFinal > 1) {
      dias -= 2;
    }
    //Remueve día inicial si los días empezaron en Domingo pero terminaron antes de Sábado
    if (diaInicial == 0 && diaFinal != 6) {
      dias--;
    }
    //Remueve día final si los días terminan un Sábado pero empiezan después del Domingo
    if (diaFinal == 6 && diaInicial != 0) {
      dias--;
    }

    let festivosEnMedio = [];
    holidays.forEach((dia) => {
      const festivo = new Date(dia.date);
      if (festivo >= fechaInicial && festivo <= fechaFinal && dias !== 0) {
        //Si el festivo no es ni Sábado (6) ni Domingo (0)
        if (festivo.getDay() % 6 != 0) {
          dias--;
          festivosEnMedio.push(dia);
        }
      }
    });
    const diasTotales = Math.max(dias, tiempoMinimo);
    const precioTotal = diasTotales * tarifa.valorTarifa * cantidadUsada;
    return {
      precioTotal: precioTotal,
      diasTotales: diasTotales,
      festivosEnMedio: festivosEnMedio,
    };
  }
}




/**
 *
 * @param {Object} tarifa. Campo requerido, a excepción de medidaTiempo, si los otros faltan, los campos de tarifa serán los usados por defecto.
 * @param {String} medidaTiempo. Campo requerido, Un string entre: "hora", "dia cal", "dia habil", "semana", "mes", "anio.
 * @param {Number} tiempoMinimo. Tiempo mínimo para calcular el valor da cobrar, por defecto es 0.
 * @param {Date} fechaInicio. Fecha de inicio del periodo de tiempo a calcular, si no se le pasa se usa la de tarifa.
 * @param {Date} fechaFin. Fecha fin del periodo de tiempo a calcular, si no se le pasa se usa la de tarifa.
 * @param {Number} cantidad. Cantidad de equipos para los cuales sacar el cobro total, si no se pasa se usa la de tarifa.
 */
export function calcularTarifa(
  tarifa,
  medidaTiempo,
  tiempoMinimo = 0,
  fechaInicio,
  fechaFin,
  cantidad
) {
  const fechaInicial = fechaInicio || new Date(tarifa.fechaInicio);
  const fechaFinal = fechaFin || new Date(tarifa.fechaFin);
  const cantidadUsada = cantidad || tarifa.cantidad;
  if (
    !fechaFinal ||
    !fechaInicial ||
    !conversion[medidaTiempo] ||
    (cantidadUsada !== 0 && !cantidadUsada)
  ) {
    return { precioTotal: null, tiempoTotal: null};
  } else {
    const timeDifference = fechaFinal.getTime() - fechaInicial.getTime();
    const tiempoConvertido = Math.ceil(
      timeDifference / conversion[medidaTiempo]
    );
    const tiempoTotal = Math.max(tiempoConvertido, tiempoMinimo);
    const precioTotal = tiempoTotal * tarifa.valorTarifa * cantidadUsada;
    return { precioTotal: precioTotal, tiempoTotal: tiempoTotal };
  }
}



/**
 * Calcula la fecha final necesaria para que entre las dos fechas haya una cantidad de tiempo específica, medida con la unidad
 * que entra por parámetro
 * @param {Date} fechaInicio.
 * @param {String} medidaTiempo. Una entre  "hora", "dia cal", "semana", "mes", "anio". 
 * @param {Number} cantidad 
 * Usar el método calcularFechaFinalDiaHabil si la unidad de medida es en dia habil
 */
export function calcularFechaFinal(fechaInicio, medidaTiempo, cantidad) {
  if (!fechaInicio || !medidaTiempo || (cantidad !== 0 && !cantidad) || !conversion[medidaTiempo]) {
    return null;
  }
  else {
    const factorConversion = conversion[medidaTiempo];
    const diff = cantidad * factorConversion;
    const newDate = new Date(fechaInicio.getTime() + diff);
    console.log('================FECHA PUTEADA====================');
    console.log(newDate);
    console.log(factorConversion);
    console.log(diff);
    console.log('====================================');
    return newDate;

  }
}



/**
 * Calcula el número de días hábiles entre dos fechas
 * @param {Date} fechaInicial.
 * @param {Date} fechaFinal.
 */
export function calcularDiasHabilesEntreFechas(fechaInicial, fechaFinal) {
  if (!fechaInicial || !fechaFinal) {
    return null;
  }
  else if(fechaFinal < fechaInicial){
    return null
  }
  else {
    const timeDifference = fechaFinal.getTime() - fechaInicial.getTime();
    const diff = timeDifference / (1000 * 3600 * 24)
    let dias = Math.ceil(diff);
    if(dias !== 0 && dias !== 1 && (Math.ceil(diff) === Math.floor(diff)) ){
      dias += 1;
    }
    const semanas = Math.floor(dias / 7);
    //Quita dos días por cada semana (Sábado y Domingo)
    dias -= semanas * 2;

    //Manejo de casos especiales
    const diaInicial = fechaInicial.getDay();
    const diaFinal = fechaFinal.getDay();

    //Quita días que faltaron
    if (diaInicial - diaFinal > 1) {
      dias -= 2;
    }
    //Remueve día inicial si los días empezaron en Domingo pero terminaron antes de Sábado
    if (diaInicial == 0 && diaFinal != 6) {
      dias--;
    }
    //Remueve día final si los días terminan un Sábado pero empiezan después del Domingo
    if (diaFinal == 6 && diaInicial != 0) {
      dias--;
    }
    holidays.forEach((dia) => {
      const festivo = new Date(dia.date);
      if (festivo >= fechaInicial && festivo <= fechaFinal && dias !== 0) {
        //Si el festivo no es ni Sábado (6) ni Domingo (0)
        if (festivo.getDay() % 6 != 0) {
          dias--;
        }
      }
    });
    return dias;

  }

}



/**
 * Calcula la fecha final requerida para que haya cierta cantidad de días hábiles entre fechaFinal y fechaInicial
 * @param {Date} fechaInicio.
 * @param {Number} cantidad.
 */
export function calcularFechaFinalDiaHabil(fechaInicio, cantidad) {
  if (!fechaInicio || (cantidad !== 0 && !cantidad)) {
    return null;
  }
  else {
    const factorConversion = (1000 * 3600 * 24); //Nro milisegundos en un día
    let fechaMili = fechaInicio.getTime() + cantidad * factorConversion;
    let fechaFin = new Date(fechaMili);
    let diff = cantidad;
    //Por prueba y error va agregando un número de días igual a la diferencia que le quede para 
    //llegar a la cantidad parámetro. Esto funciona porque el número de días hábiles entre dos fechas es <=  número de días.
    while(diff > 0){
      diff = cantidad - calcularDiasHabilesEntreFechas(fechaInicio, fechaFin);
      fechaMili = fechaFin.getTime() + (diff*factorConversion);
      fechaFin = new Date(fechaMili);
    }
    return fechaFin;
  }

}
