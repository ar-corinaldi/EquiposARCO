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
function tarifasCompuestaFinal(tarfiaDefA, tarfiaDefB) {
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

/**
 * Comparar tarifas para que las tarifas sobre los equipos compuestos queden al comienzo
 * @param {} a
 * @param {*} b
 */
function tarifasCompuestaPrimero(tarfiaDefA, tarfiaDefB) {
  const tarifaPorEquipoA = tarfiaDefA.tarifasPorEquipo[0];
  const tarifaPorEquipoB = tarfiaDefB.tarifasPorEquipo[0];

  if (
    tarifaPorEquipoA.equipo.componentes &&
    tarifaPorEquipoA.equipo.componentes.length > 0
  )
    return -1;

  if (
    tarifaPorEquipoB.equipo.componentes &&
    tarifaPorEquipoB.equipo.componentes.length > 0
  )
    return 1;
  else return 0;
}

export function calcularDisponiblesRemision(orden) {
  const equipos = [];
  if (!orden) return equipos;
  let equipo;
  console.log("orden", orden);
  // Asegurar que los equipos compuestos queden al final para que no queden equipos repetidos
  orden.tarifasDefinitivas.sort(tarifasCompuestaFinal);
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
        if (equipo._id === equipoRemision.equipoID._id) {
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

export function calcularDisponiblesDevolucion(orden) {
  const equipos = [];
  if (!orden) return equipos;
  let equipo;
  console.log("orden", orden);

  // Revisar los equipos y las cantidades de las remisiones realizadas
  orden.remisiones.forEach((remision) => {
    remision.equiposEnRemision.forEach((equipoRemision) => {
      let yaEsta = false;
      for (let index = 0; index < equipos.length; index++) {
        const equipoYA = equipos[index];
        if (equipoYA._id === equipoRemision.equipoID._id) {
          yaEsta = true;
          equipoYA.porDevolver += equipoRemision.cantidad;
        }
      }
      if (!yaEsta) {
        equipo = equipoRemision.equipoID;
        equipo.porDevolver = equipoRemision.cantidad;
        equipos.push(equipo);
      }
    });
  });
  // Revisar los equipos y las cantidades de las devoluciones realizadas
  orden.devoluciones.forEach((devolucion) => {
    devolucion.equiposEnDevolucion.forEach((equipoDevolucion) => {
      for (let index = 0; index < equipos.length; index++) {
        equipo = equipos[index];
        if (equipo._id === equipoDevolucion.equipoID._id) {
          const newCant = equipo.porDevolver - equipoDevolucion.cantidad;
          // console.log("equipo", equipo);
          // console.log("newCant", newCant);
          if (newCant === 0) {
            equipos.splice(index, 1);
          } else {
            equipo.porDevolver = newCant;
          }
        }
      }
    });
  });
  console.log("equipos", equipos);
  return equipos;
}

export function calcularPorEnviarPorDevolver(orden) {
  const equipos = [];
  if (!orden) return equipos;
  let equipo;
  console.log("orden", orden);
  // Asegurar que los equipos compuestos queden al final para que no queden equipos repetidos
  orden.tarifasDefinitivas.sort(tarifasCompuestaFinal);

  orden.tarifasDefinitivas.forEach((tarifa) => {
    tarifa.tarifasPorEquipo.forEach((tarifaEquipo) => {
      //   console.log("tarifaEquipo", tarifa);
      //   console.log("tarifaValida", tarifaValida(tarifa));
      if (tarifaValida(tarifaEquipo)) {
        equipo = tarifaEquipo.equipo;
        equipo.cantidadOr = tarifaEquipo.cantidad;
        equipo.porEnviar = tarifaEquipo.cantidad;
        equipos.push(equipo);
        equipo.porDevolver = 0;
        equipo.equipoTarifa = tarifaEquipo;
        if (equipo.componentes && equipo.componentes.length > 0) {
          equipo.componentes.forEach((componente) => {
            componente.equipoID.porEnviar =
              tarifaEquipo.cantidad * componente.cantidad;
            componente.equipoID.porDevolver = 0;
            componente.equipoID.cantidadOr = componente.equipoID.porEnviar;
          });
        }
      }
    });
  });

  // Restar las cantidades de las remisiones realizadas. Si se hace remision y devolucion y depués se hace una nueva remision se daña en el mismo equipo
  // Distinguir que remisiones ya se usaron y cuales no

  orden.remisiones.forEach((remision) => {
    remision.equiposEnRemision.forEach((equipoRemision) => {
      equipoRemision.cantidadNoRegistrada = equipoRemision.cantidad;
    });
  });

  equipos.forEach((equipo) => {
    orden.remisiones.forEach((remision) => {
      remision.equiposEnRemision.forEach((equipoRemision) => {
        if (equipoRemision.cantidadNoRegistrada === 0) return;
        if (equipo.componentes && equipo.componentes.length > 0) {
          console.log("compuesto");
          equipo.componentes.forEach((componente) => {
            if (componente.equipoID.porEnviar === 0) return;
            if (componente.equipoID._id === equipoRemision.equipoID._id) {
              if (
                componente.equipoID.porEnviar <
                equipoRemision.cantidadNoRegistrada
              ) {
                equipoRemision.cantidadNoRegistrada =
                  equipoRemision.cantidadNoRegistrada -
                  componente.equipoID.porEnviar;
                componente.equipoID.porEnviar = 0;
              }
              if (
                componente.equipoID.porEnviar >
                equipoRemision.cantidadNoRegistrada
              ) {
                componente.equipoID.porEnviar =
                  componente.equipoID.porEnviar -
                  equipoRemision.cantidadNoRegistrada;
                equipoRemision.cantidadNoRegistrada = 0;
              }
              if (
                componente.equipoID.porEnviar ===
                equipoRemision.cantidadNoRegistrada
              ) {
                componente.equipoID.porEnviar = 0;
                equipoRemision.cantidadNoRegistrada = 0;
              }
            }
          });
        } else {
          console.log("normi");

          if (equipo.porEnviar === 0) return;

          if (equipo._id === equipoRemision.equipoID._id) {
            if (equipo.porEnviar < equipoRemision.cantidadNoRegistrada) {
              equipoRemision.cantidadNoRegistrada =
                equipoRemision.cantidadNoRegistrada - equipo.porEnviar;
              equipo.porEnviar = 0;
            }
            if (equipo.porEnviar > equipoRemision.cantidadNoRegistrada) {
              equipo.porEnviar =
                equipo.porEnviar - equipoRemision.cantidadNoRegistrada;
              equipoRemision.cantidadNoRegistrada = 0;
            }
            if (equipo.porEnviar === equipoRemision.cantidadNoRegistrada) {
              equipo.porEnviar = 0;
              equipoRemision.cantidadNoRegistrada = 0;
            }
          }
        }
      });
    });
  });

  // Se parte de que los equipos por devolver son igual a los equipos enviados
  equipos.forEach((equipo) => {
    equipo.porDevolver = equipo.cantidadOr - equipo.porEnviar;
    if (equipo.componentes && equipo.componentes.length > 0) {
      equipo.componentes.forEach((componente) => {
        componente.equipoID.porDevolver =
          componente.equipoID.cantidadOr - componente.equipoID.porEnviar;
      });
    }
  });

  orden.devoluciones.forEach((remision) => {
    remision.equiposEnDevolucion.forEach((equipoDevolucion) => {
      equipoDevolucion.cantidadNoRegistrada = equipoDevolucion.cantidad;
    });
  });

  // Se restan las remisiones hechas
  equipos.forEach((equipo) => {
    orden.devoluciones.forEach((remision) => {
      remision.equiposEnDevolucion.forEach((equipoDevolucion) => {
        if (equipoDevolucion.cantidadNoRegistrada === 0) return;
        if (equipo.componentes && equipo.componentes.length > 0) {
          equipo.componentes.forEach((componente) => {
            if (componente.equipoID._id === equipoDevolucion.equipoID._id) {
              if (componente.equipoID.porDevolver === 0) return;
              if (
                componente.equipoID.porDevolver <
                equipoDevolucion.cantidadNoRegistrada
              ) {
                equipoDevolucion.cantidadNoRegistrada =
                  equipoDevolucion.cantidadNoRegistrada -
                  componente.equipoID.porDevolver;
                componente.equipoID.porDevolver = 0;
              }
              if (
                componente.equipoID.porDevolver >
                equipoDevolucion.cantidadNoRegistrada
              ) {
                componente.equipoID.porDevolver =
                  componente.equipoID.porDevolver -
                  equipoDevolucion.cantidadNoRegistrada;
                equipoDevolucion.cantidadNoRegistrada = 0;
              }
              if (
                componente.equipoID.porDevolver ===
                equipoDevolucion.cantidadNoRegistrada
              ) {
                componente.equipoID.porDevolver = 0;
                equipoDevolucion.cantidadNoRegistrada = 0;
              }
            }
          });
        } else {
          if (equipo.porDevolver === 0) return;
          if (equipo._id === equipoDevolucion.equipoID._id) {
            if (equipo.porDevolver < equipoDevolucion.cantidadNoRegistrada) {
              equipoDevolucion.cantidadNoRegistrada =
                equipoDevolucion.cantidadNoRegistrada - equipo.porDevolver;
              equipo.porDevolver = 0;
            }
            if (equipo.porDevolver > equipoDevolucion.cantidadNoRegistrada) {
              equipo.porDevolver =
                equipo.porDevolver - equipoDevolucion.cantidadNoRegistrada;
              equipoDevolucion.cantidadNoRegistrada = 0;
            }
            if (equipo.porDevolver === equipoDevolucion.cantidadNoRegistrada) {
              equipo.porDevolver = 0;
              equipoDevolucion.cantidadNoRegistrada = 0;
            }
          }
        }
      });
    });
  });

  equipos.forEach((equipo) => {
    equipo.enviado = equipo.cantidadOr - equipo.porEnviar;
    equipo.devuelto = equipo.enviado - equipo.porDevolver;
    if (equipo.componentes && equipo.componentes.length > 0) {
      equipo.componentes.forEach((componente) => {
        componente.equipoID.enviado =
          componente.equipoID.cantidadOr - componente.equipoID.porEnviar;
        componente.equipoID.devuelto =
          componente.equipoID.enviado - componente.equipoID.porDevolver;
      });
    }
  });

  /**
   * Calcular el porcentaje de los equipos compuestos
   */
  equipos.forEach((equipo) => {
    if (equipo.componentes && equipo.componentes.length > 0) {
      equipo.cantidadComponentes = 0;
      equipo.componentes.forEach((componente) => {
        equipo.cantidadComponentes += componente.cantidad;
      });
      equipo.componentes.forEach((componente) => {
        const porcentaje = componente.cantidad / equipo.cantidadComponentes;
        const porcentajePropio = 1 / componente.cantidad;
        equipo.enviado +=
          porcentaje * componente.equipoID.enviado * porcentajePropio;
        equipo.devuelto +=
          porcentaje * componente.equipoID.devuelto * porcentajePropio;
      });
      equipo.porEnviar = equipo.cantidadOr - equipo.enviado;
      equipo.porDevolver = equipo.enviado - equipo.devuelto;
    }
  });

  console.log("equipos", equipos);
  return equipos;
}
