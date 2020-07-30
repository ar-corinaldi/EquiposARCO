//actividad.codigo.includes("R")
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function calcularPesoTotal(actividad) {
  let pesoTot = 0;
  if (!actividad || isEmpty(actividad)) return pesoTot;
  //console.log(actividad);
  if (actividad.codigo.includes("R")) {
    actividad.equiposEnRemision.forEach((equipo) => {
      pesoTot += equipo.equipoID.peso * equipo.cantidad;
    });
  } else {
    actividad.equiposEnDevolucion.forEach((equipo) => {
      pesoTot += equipo.equipoID.peso * equipo.cantidad;
    });
  }
  return pesoTot;
}

export function calcularCantidadTotal(actividad) {
  let cantTot = 0;
  if (!actividad || isEmpty(actividad)) return cantTot;
  //console.log(actividad);
  if (actividad.codigo.includes("R")) {
    actividad.equiposEnRemision.forEach((equipo) => {
      cantTot += equipo.cantidad;
    });
  } else {
    actividad.equiposEnDevolucion.forEach((equipo) => {
      cantTot += equipo.cantidad;
    });
  }
  return cantTot;
}

export function calcularPrecioTransporte(pesoTot) {
  if (1 <= pesoTot && pesoTot <= 380) {
    return 20000;
  }
  if (381 <= pesoTot && pesoTot <= 760) {
    return 32000;
  }
  if (761 <= pesoTot && pesoTot <= 1520) {
    return 64000;
  }
  if (1521 <= pesoTot && pesoTot <= 2280) {
    return 96000;
  }
  if (2281 <= pesoTot && pesoTot <= 3048) {
    return 128000;
  }
  if (3049 <= pesoTot && pesoTot <= 3800) {
    return 160000;
  } else return 0;
}
