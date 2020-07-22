import React from "react";

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const mesesTrim = ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agt", "Sept", "Oct", "Nov", "Dic"];

/**
 * @param {} fecha a convertir.
 * Recibe un string que pueda ser convertido a Date. Debe ser de la forma: 2020-03-03T05:00:00.000+00:00
 * Entrega un string en formato: dd/mm/aa
 */
export default function formatoFechas(fecha) {
  if (fecha) {
    const date = new Date(fecha);
    return `${date.getDate()}/${(
      date.getMonth() + 1
    ).toString()}/${date.getFullYear()}`;
  }
}

/**
 * @param {} fecha a convertir.
 * Recibe un string que pueda ser convertido a Date. Debe ser de la forma: 2020-03-03T05:00:00.000+00:00
 * Entrega un string en formato: dd/mm/aa
 */
export function formatoHora(fecha) {
  if (fecha) {
    const date = new Date(fecha);
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}

/**
 * @param {Date} fecha.
 * @param {Boolean} trim. 
 * @param {Boolean} years. Si quieren que salga o no el año
 * Si retornar abreviaturas de los meses o el nombre completo. Ej: Enero o En.
 * Recibe String con formato: 2020-03-03T05:00:00.000+00:00 o un Date
 */
export function formatoFechasNombres(fecha, trim = false, years = true) {
  const formato = trim ? mesesTrim : meses;
  if (fecha) {
    const date = new Date(fecha);
    const month = formato[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const response = day + " de " + month + (years? " de " + year : "");
    return response;
  }
}

/**
 * 
 * @param {*} fecha 
 * Recibe un string que pueda ser convertido a Date. Debe ser de la forma: 2020-03-03T05:00:00.000+00:00
 */
export function formatoHora12(fecha) {
  if (fecha) {
    const date = new Date(fecha);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if(hours >= 12){
      return (hours-12) + ":" + minutes + " pm";
    }
    else{
      minutes = minutes? minutes: "00";
      return hours + ":" + minutes + " am"
      
    }
  }
}

