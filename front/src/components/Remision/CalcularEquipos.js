/**
 * Validar la tarifa valida para el dia actual
 * @param {*} tarifa
 */
const tarifaValida = (tarifa) => {
  const from = new Date(tarifa.fechaInicio);
  const check = Date.now();
  if (tarifa.fechaFin) {
    const to = new Date(tarifa.fechaFin);
    return check > from && check < to;
  } else {
    return check > from;
  }
};

/**
 * Comparar tarifas para que las tarifas sobre los equipos compuestos queden al final
 * @param {} a
 * @param {*} b
 */
function compareTarifas(tarfiaDefA, tarfiaDefB) {
  const tarifaPorEquipoA = tarfiaDefA.tarifasPorEquipo[0];
  const tarifaPorEquipoB = tarfiaDefB.tarifasPorEquipo[0];

  if (
    tarifaPorEquipoA.equipo.componentes &&
    tarifaPorEquipoA.equipo.componentes.length > 0
  )
    return 1;

  if (
    tarifaPorEquipoB.equipo.componentes &&
    tarifaPorEquipoB.equipo.componentes.length > 0
  )
    return -1;
  else return 0;
}

export function calcularDisponiblesRemision(orden) {
  const equipos = [];
  if (!orden) return equipos;
  let equipo;
  console.log("orden", orden);
  // Asegurar que los equipos compuestos queden al final para que no queden equipos repetidos
  orden.tarifasDefinitivas.sort(compareTarifas);
  // Revisar las cantidades originales de acuerdo con la tarifa valida
  orden.tarifasDefinitivas.forEach((tarifa) => {
    tarifa.tarifasPorEquipo.forEach((tarifaEquipo) => {
      //   console.log("tarifaEquipo", tarifa);
      //   console.log("tarifaValida", tarifaValida(tarifa));
      if (tarifaValida(tarifaEquipo)) {
        equipo = tarifaEquipo.equipo;
        if (equipo.componentes && equipo.componentes.length > 0) {
          equipo.componentes.forEach((componente) => {
            let yaEsta = false;
            equipos.forEach((equipoYa) => {
              if (equipoYa._id === componente.equipoID._id) {
                equipoYa.porEnviar +=
                  tarifaEquipo.cantidad * componente.cantidad;
                yaEsta = true;
                return;
              }
            });
            if (!yaEsta) {
              componente.equipoID.porEnviar =
                tarifaEquipo.cantidad * componente.cantidad;
              equipos.push(componente.equipoID);
            }
          });
        } else {
          equipo.porEnviar = tarifaEquipo.cantidad;
          equipos.push(equipo);
        }
      }
    });
  });
  // Restar las cantidades de las remisiones realizadas. Si se hace remision y devolucion y depués se hace una nueva remision se daña en el mismo equipo
  orden.remisiones.forEach((remision) => {
    remision.equiposEnRemision.forEach((equipoRemision) => {
      for (let index = 0; index < equipos.length; index++) {
        const equipo = equipos[index];
        console.log("entra");
        if (equipo._id === equipoRemision.equipoID) {
          const newCant = equipo.porEnviar - equipoRemision.cantidad;
          if (newCant === 0) {
            equipos.splice(index, 1);
          } else {
            equipo.porEnviar = newCant;
          }
        }
      }
    });
  });
  console.log("equipos", equipos);
  return equipos;
}
