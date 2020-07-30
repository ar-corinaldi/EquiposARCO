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
