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
  //
  orden.tarifasDefinitivas.sort(compareTarifas);

  console.log("tarifas ordenadas:", orden.tarifasDefinitivas);

  orden.tarifasDefinitivas.forEach((tarifa) => {
    tarifa.tarifasPorEquipo.forEach((tarifaEquipo) => {
      console.log("entra");

      //   console.log("tarifaEquipo", tarifa);
      //   console.log("tarifaValida", tarifaValida(tarifa));
      if (tarifaValida(tarifaEquipo)) {
        equipo = tarifaEquipo.equipo;
        if (equipo.componentes && equipo.componentes.length > 0) {
          console.log("equipo compuesto");

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
          console.log("equipo normi");
          equipo.porEnviar = tarifaEquipo.cantidad;
          equipos.push(equipo);
        }
      }
    });
  });
  //   equipos.sort(compareEquipos);
  //   console.log("equipos1", equipos);
  orden.remisiones.forEach((remision) => {
    remision.equiposEnRemision.forEach((equipoRemision) => {
      equipos.forEach((equipo) => {
        if (equipo._id === equipoRemision.equipoID._id) {
          const newCant = equipo.porEnviar - equipoRemision.cantidad;
          equipo.porEnviar = newCant;
        }
      });
    });
  });
  console.log("equipos2", equipos);
  return equipos;
}
