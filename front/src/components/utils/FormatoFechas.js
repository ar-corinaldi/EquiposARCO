/**
 * @param {} fecha a convertir.
 * Recibe un objeto que pueda ser convertido a Date. Debe ser de la forma: 2020-03-03T05:00:00.000+00:00
 * Entrega un string en formato: dd/mm/aa
 */
function formatoFechas(fecha) {
  if (fecha) {
    const date = new Date(fecha);
    return `${date.getDate()}/${(
      date.getMonth() + 1
    ).toString()}/${date.getFullYear()}`;
  }
}

export default formatoFechas;
