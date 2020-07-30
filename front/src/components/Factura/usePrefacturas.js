import { useState, useEffect } from "react";
import Toast from "../Toast";
function usePrefacturas(fechaInicial, fechaCorte, ordenes) {
  /**
   * Una prefactura es mensual
   * Una prefactura mapea el _id de un equipo a dos objetos;
   * equipo = equipo de remision
   * listaMes = lista de la cantidad de equipo que hay por dia en la bodega
   * La prefactura va a tener todos los equipos que se les hicieron remision o devolucion en un mes
   * Con la cantidad de equipo por dia en la obra durante el mes.
   */
  const [prefacturas, setPrefacturas] = useState([]);

  let equiposMesPasadosSinDevolver = [];
  let equiposDevueltosAlComienzoMes = [];

  useEffect(() => {
    setPrefacturas([]);
    loadPrefacturas(ordenes);
  }, [fechaCorte, fechaInicial, ordenes]);

  /**
   * Metodo principal para cargar todas las prefacturas mes a mes,
   * No importa que sean de años distintos.
   * @param ordenes: de una factura
   */
  const loadPrefacturas = (ordenes) => {
    let mesInicial = fechaInicial.getMonth();
    let anioInicial = fechaInicial.getFullYear();
    let anioFinal = fechaCorte.getFullYear();
    // Calcula la cantidad de meses para anios distintos
    let mesesDifAnios =
      mesInicial + (anioFinal - anioInicial) * 12 + fechaCorte.getMonth();
    let mesFinal = mesesDifAnios + 1;

    // En caso de que se tengan los mismos anios
    if (anioInicial === anioFinal) mesFinal = fechaCorte.getMonth();
    // anio inicial a poner
    let anio = anioInicial;
    for (let i = mesInicial; i <= mesFinal; i++) {
      let mes = i % 12;
      if (mes === 0 && i > 11) {
        anio += 1;
      }
      let inicioMes = new Date(anio, mes);
      let finMes = new Date(anio, mes + 1, 0, 23);

      if (mes % 12 === fechaCorte.getMonth()) {
        finMes = fechaCorte;
      }

      // Carga todas las remisiones y devoluciones de un mes de todas las ordenes
      const {
        remisionesMes,
        devolucionesMes,
        tarifasMes,
      } = loadRemisionesYDevoluciones(ordenes, inicioMes, finMes);

      const prefacturaMes = loadPrefacturaMes(
        remisionesMes,
        devolucionesMes,
        inicioMes,
        finMes,
        tarifasMes
      );

      setPrefacturas((prevFact) => [...prevFact, prefacturaMes]);
    }
  };

  const loadPrefacturaMes = (remMes, devMes, inicioMes, finMes, tarifasMes) => {
    // Cantida de dias del mes
    let daysOfMonth = finMes.getDate();

    const prefactura = {};

    // Equipos del mes pasado que no han sido devueltos
    addEquiposARemisionesDelMesAnterior(remMes, 1, inicioMes);
    for (let i = 1; i <= daysOfMonth; i++) {
      // Añade la cantidad de un equipo para la obra en el dia actual
      acumEquiposRemisionPorDia(remMes, i, finMes, prefactura, tarifasMes);

      // Quita la cantidad de un equipo en la obra con la respectiva devolucion
      // Al dia siguiente
      acumEquiposDevolucionPorDia(devMes, i, finMes, prefactura, tarifasMes);
    }

    // Añade los equipos que estan en obra pendientes
    // Para que en la siguiente prefactura se añadan a la remision
    const idEquipos = Object.keys(prefactura);
    idEquipos.forEach((idEquipo) => {
      if (idEquipo !== "transportes") {
        let restaDev = equiposDevueltosAlComienzoMes[idEquipo] || 0;

        const equipo = prefactura[idEquipo].equipo;
        const cantidad =
          prefactura[idEquipo].listaMes[daysOfMonth - 1] - restaDev;

        if (cantidad > 0) {
          equiposMesPasadosSinDevolver.push({
            equipo,
            cantidad,
          });
        }
      }
    });

    return {
      prefacturaMes: prefactura,
      mes: finMes.getMonth(),
      anio: finMes.getFullYear(),
    };
  };

  const acumEquiposRemisionPorDia = (
    remisiones,
    day,
    finMes,
    prefacturaMes,
    tarifasMes
  ) => {
    let anio = finMes.getFullYear(),
      mes = finMes.getMonth(),
      daysOfMonth = finMes.getDate();

    const filterRemByDay = filtrarListaPorFecha(
      remisiones,
      "fechaLlegada",
      new Date(anio, mes, day),
      new Date(anio, mes, day, 23)
    );
    for (const remision of filterRemByDay) {
      if (
        remision.asumidoTercero === false ||
        (remision.costoTransporte && remision.costoTransporte > 0)
      ) {
        if (!prefacturaMes.transportes) prefacturaMes.transportes = [];
        prefacturaMes.transportes.push({
          costo: remision.costoTransporte,
          fecha: new Date(remision.fechaLlegada),
        });
      }
      for (const equipo of remision.equiposEnRemision) {
        const { equipoID, cantidad } = equipo;
        const idEquipo = `${equipoID._id}`;
        let cantidadAObra = cantidad;

        if (day === 1 && equiposMesPasadosSinDevolver[idEquipo]) {
          cantidadAObra = equiposMesPasadosSinDevolver[idEquipo];
        }

        if (!prefacturaMes[idEquipo]) {
          prefacturaMes[idEquipo] = {};
          prefacturaMes[idEquipo].listaMes = new Array(daysOfMonth).fill(0);
          prefacturaMes[idEquipo].equipo = equipoID;
        } else {
          const lastElement =
            day !== 0 ? prefacturaMes[idEquipo].listaMes[day - 1] : 0;
          cantidadAObra = lastElement + cantidad;
        }
        const equipoTarifas = tarifasMes[equipoID._id];

        //length equipoTarifa, en caso de que sea nullo, sera false y no entra al if
        let { precio, categoria, tiempo, tiempoMinimo } = calcularPrecioEquipo(
          equipoTarifas,
          remision,
          equipoID
        );
        prefacturaMes[idEquipo].equipo.precio = precio;
        prefacturaMes[idEquipo].equipo.categoria = categoria;
        prefacturaMes[idEquipo].equipo.tiempo = tiempo;
        prefacturaMes[idEquipo].equipo.tiempoMinimo = tiempoMinimo;
        prefacturaMes[idEquipo].listaMes.fill(
          cantidadAObra,
          day - 1,
          daysOfMonth
        );
      }
    }
  };

  const acumEquiposDevolucionPorDia = (
    devoluciones,
    day,
    finMes,
    prefacturaMes
  ) => {
    let anio = finMes.getFullYear(),
      mes = finMes.getMonth(),
      daysOfMonth = finMes.getDate();

    const filterDevByDay = filtrarListaPorFecha(
      devoluciones,
      "fechaSalida",
      new Date(anio, mes, day),
      new Date(anio, mes, day, 23)
    );

    for (const devolucion of filterDevByDay) {
      if (
        devolucion.asumidoTercero === false ||
        (devolucion.costoTransporte && devolucion.costoTransporte > 0)
      ) {
        if (!prefacturaMes.transportes) prefacturaMes.transportes = [];
        prefacturaMes.transportes.push({
          costo: devolucion.costoTransporte,
          fecha: new Date(devolucion.fechaLlegada),
        });
      }
      for (const equipo of devolucion.equiposEnDevolucion) {
        const { equipoID, cantidad } = equipo;
        const idEquipo = `${equipoID._id}`;
        let cantidadAObra = cantidad;
        if (!prefacturaMes[idEquipo]) {
          prefacturaMes[idEquipo] = {};
          prefacturaMes[idEquipo].listaMes = new Array(daysOfMonth).fill(0);
          prefacturaMes[idEquipo].equipo = equipoID;
          Toast(
            [`No existe la remision del equipo ${equipoID.nombreEquipo}`],
            100,
            400
          );
        } else {
          const lastElement =
            day !== 0 ? prefacturaMes[idEquipo].listaMes[day - 1] : 0;
          cantidadAObra = lastElement - cantidad;
        }
        if (cantidadAObra < 0) {
          Toast(
            [
              `No coincide la cantidad devuelta del equipo ${equipoID.nombreEquipo} en la fecha ${day}/${mes}/${anio}`,
            ],
            false,
            400
          );
        }
        let lenListaMes =
          prefacturaMes[idEquipo].listaMes &&
          prefacturaMes[idEquipo].listaMes.length;
        if (day !== lenListaMes) {
          prefacturaMes[idEquipo].listaMes.fill(
            cantidadAObra,
            day,
            daysOfMonth
          );
        } else {
          console.log(
            equipoID.nombreEquipo,
            cantidadAObra,
            prefacturaMes[idEquipo].listaMes[day - 1]
          );
          equiposDevueltosAlComienzoMes[idEquipo] = cantidadAObra;
        }
        console.log(day, prefacturaMes[idEquipo].listaMes);
      }
    }
  };

  const addEquiposARemisionesDelMesAnterior = (_remisiones, dia, inicioMes) => {
    const anio = inicioMes.getFullYear();
    const mes = inicioMes.getMonth();

    equiposMesPasadosSinDevolver.forEach(({ equipo, cantidad }) => {
      _remisiones.push({
        fechaLlegada: new Date(anio, mes, dia, 1),
        equiposEnRemision: [{ equipoID: equipo, cantidad }],
      });
    });
    equiposMesPasadosSinDevolver = [];
  };

  /**
   *
   * @param {Object} ordenes, ordenes de una obra
   * @param {Date} inicioMes, fecha inicial del mes 01/mes/2020, 1:00:00
   * @param {Date} finMes, fecha final del mes ultimoDia/mes/2020, 23:00:00
   */
  const loadRemisionesYDevoluciones = (ordenes, inicioMes, finMes) => {
    let remisionesMes = [];
    let devolucionesMes = [];
    let tarifasMes = [];
    for (let orden of ordenes) {
      const remisionesMesOrden = filtrarListaPorFecha(
        orden.remisiones,
        "fechaLlegada",
        inicioMes,
        finMes
      );
      remisionesMes = remisionesMes.concat(remisionesMesOrden);

      const devolucionesMesOrden = filtrarListaPorFecha(
        orden.devoluciones,
        "fechaSalida",
        inicioMes,
        finMes
      );

      devolucionesMes = devolucionesMes.concat(devolucionesMesOrden);

      let newTarifas = {};
      let tarifasDefinitivas = orden.tarifasDefinitivas || [];
      tarifasDefinitivas.forEach((tarifa) => {
        const tarifasPorEquipo = tarifa.tarifasPorEquipo;
        if (tarifasPorEquipo && tarifasPorEquipo.length > 0) {
          let equipoTarifa = tarifasPorEquipo[0].equipo;

          tarifasPorEquipo.sort((a, b) => {
            let fechaA = new Date(a.fechaInicio);
            let fechaB = new Date(b.fechaInicio);
            return fechaB.getTime() - fechaA.getTime();
          });

          newTarifas[equipoTarifa._id] = tarifasPorEquipo;
        }
      });
      tarifasMes = newTarifas;
    }

    return { remisionesMes, devolucionesMes, tarifasMes };
  };

  /**
   *
   * @param {Object} equipoTarifas tarifa de un equipo
   * @param {Object} remision Objeto remision
   * @param {String} equipoID id de un equipo
   */
  const calcularPrecioEquipo = (equipoTarifas, remision, equipoID) => {
    let precio = 0;
    let categoria = "unidad";
    let tiempo = "dia cal";
    let tiempoMinimo = 0;
    const len = equipoTarifas && equipoTarifas.length;

    if (len && len > 0) {
      let fechaFinTar = equipoTarifas[len - 1].fechaFin;
      let fechaFinTarifa = (fechaFinTar && new Date(fechaFinTar)) || false;
      const fechaRemision = new Date(remision.fechaLlegada);
      while (
        fechaFinTarifa &&
        fechaFinTarifa.getTime() < fechaRemision.getTime() &&
        equipoTarifas.length > 0
      ) {
        equipoTarifas.pop();
        if (equipoTarifas.length > 0) {
          const cur = equipoTarifas[equipoTarifas.length - 1];
          fechaFinTarifa = (cur.fechaFin && new Date(cur.fechaFin)) || false;
        }
      }

      precio =
        (equipoTarifas.length > 0 &&
          equipoTarifas[equipoTarifas.length - 1].valorTarifa) ||
        0;
      const precioRef =
        equipoTarifas[equipoTarifas.length - 1] &&
        equipoTarifas[equipoTarifas.length - 1].precioReferencia;

      if (precioRef) {
        categoria = precioRef.categoria;
        tiempo = precioRef.tiempo;
        tiempoMinimo = precioRef.tiempoMinimo;
      }
    }
    if (precio === 0) {
      const newPrecio =
        equipoID.precios && equipoID.precios.length > 0 && equipoID.precios[0];
      precio = newPrecio && newPrecio.valorAlquiler;
      categoria = newPrecio && newPrecio.categoria;
      tiempo = newPrecio && newPrecio.tiempo;
      tiempoMinimo = newPrecio && newPrecio.tiempoMinimo;
    }

    if (precio === 0) {
      Toast(
        [`No se le asignó precio al equipo ${equipoID.nombreEquipo}`],
        true,
        404
      );
    }

    return { precio, categoria, tiempoMinimo, tiempo };
  };

  /**
   *
   * @param {remisiones o devoluciones} lista de elementos a filtrar
   * @param {fechaLlegada, fechaSalida} nombreFecha propiedad de la lista que se va a filtrar
   * Filtra una lista por fecha inicio y fin a partir de la propiedad fecha
   */
  const filtrarListaPorFecha = (lista, nombreFecha, inicio, fin) => {
    let filteredList = lista.filter((elemento) => {
      const fecha = new Date(elemento[nombreFecha]);
      return (
        inicio.getTime() <= fecha.getTime() && fecha.getTime() <= fin.getTime()
      );
    });
    return filteredList;
  };

  return { prefacturas };
}

export default usePrefacturas;
