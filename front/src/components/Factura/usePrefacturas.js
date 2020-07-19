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
  const [tarifas, setTarifas] = useState([]);

  let equiposMesPasadosSinDevolver = [];

  useEffect(() => {
    // const { tarifasDefinitivas } = orden;
    setPrefacturas([]);
    loadPrefacturas(ordenes);

    // loadTarifas(ordenes);
  }, [fechaCorte, fechaInicial, ordenes]);

  // useEffect(() => {
  //   tarifas.forEach((tarifa) => {
  //     addPrecios(tarifa);
  //   });
  // }, [tarifas]);

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
      mesInicial + (anioFinal - anioInicial - 1) * 12 + fechaCorte.getMonth();
    let mesFinal = mesesDifAnios;

    // En caso de que se tengan los mismos anios
    if (anioInicial === anioFinal) mesFinal = fechaCorte.getMonth();

    // anio inicial a poner
    let anio = anioInicial;
    for (let i = mesInicial; i <= mesFinal; i++) {
      let mes = i;
      if (mes > 11) {
        anio += 1;
        mes = mes % 12;
      }
      let inicioMes = new Date(anio, mes);
      let finMes = new Date(anio, mes + 1, 0, 23);

      if (mes % 12 === fechaCorte.getMonth()) {
        finMes = fechaCorte;
      }

      // Carga todas las remisiones y devoluciones de un mes de todas las ordenes
      const { remisionesMes, devolucionesMes } = loadRemisionesYDevoluciones(
        ordenes,
        inicioMes,
        finMes
      );
      const prefacturaMes = loadPrefacturaMes(
        remisionesMes,
        devolucionesMes,
        inicioMes,
        finMes
      );

      setPrefacturas((prevFact) => [...prevFact, prefacturaMes]);
    }
  };

  const loadPrefacturaMes = (remMes, devMes, inicioMes, finMes) => {
    // Cantida de dias del mes
    let daysOfMonth = finMes.getDate();

    const prefactura = {};

    // Equipos del mes pasado que no han sido devueltos
    addEquiposARemisionesDelMesAnterior(remMes, 1, inicioMes);
    for (let i = 1; i <= daysOfMonth; i++) {
      // Añade la cantidad de un equipo para la obra en el dia actual
      acumEquiposRemisionPorDia(remMes, i, finMes, prefactura);

      // Quita la cantidad de un equipo en la obra con la respectiva devolucion
      // En el dia
      acumEquiposDevolucionPorDia(devMes, i, finMes, prefactura);
    }

    // Añade los equipos que estan en obra pendientes
    // Para que en la siguiente prefactura se añadan a la remision
    const idEquipos = Object.keys(prefactura);
    idEquipos.forEach((idEquipo) => {
      const equipo = prefactura[idEquipo].equipo;
      const cantidad = prefactura[idEquipo].listaMes[daysOfMonth - 1];
      if (cantidad > 0) {
        equiposMesPasadosSinDevolver.push({ equipo, cantidad });
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
    prefacturaMes
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
      for (const equipo of remision.equiposEnRemision) {
        const { equipoID, cantidad } = equipo;
        const idEquipo = `_${equipoID._id}`;
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
      for (const equipo of devolucion.equiposEnDevolucion) {
        const { equipoID, cantidad } = equipo;
        const idEquipo = `_${equipoID._id}`;
        let cantidadAObra = cantidad;

        if (!prefacturaMes[idEquipo]) {
          prefacturaMes[idEquipo] = {};
          prefacturaMes[idEquipo].listaMes = new Array(daysOfMonth).fill(0);
          prefacturaMes[idEquipo].equipo = equipoID;
          Toast(
            [`No existe la remision del equipo ${equipoID.nombreEquipo}`],
            false,
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
              `No coincide la cantidad devuelta del equipo ${equipoID.nombreEquipo}`,
            ],
            false,
            400
          );
        }
        prefacturaMes[idEquipo].listaMes.fill(
          cantidadAObra,
          day - 1,
          daysOfMonth
        );
      }
    }
  };

  const addEquiposARemisionesDelMesAnterior = (_remisiones, day, inicioMes) => {
    const anio = inicioMes.getFullYear();
    const mes = inicioMes.getMonth();

    equiposMesPasadosSinDevolver.forEach(({ equipo, cantidad }) => {
      _remisiones.push({
        fechaLlegada: new Date(anio, mes, day, 1),
        equiposEnRemision: [{ equipoID: equipo, cantidad }],
      });
    });
    equiposMesPasadosSinDevolver = [];
  };

  const loadTarifas = async (ordenes) => {
    for (let orden of ordenes) {
      const url = `/ordenes/${orden._id}/tarifasPobladas`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          return Toast(
            ["No se pudieron cargar las facturas"],
            true,
            res.status
          );
        }
        const ordenDetail = await res.json();
        let newTarifas = tarifas;
        newTarifas = newTarifas.concat(ordenDetail.tarifasDefinitivas);
        setTarifas(newTarifas);
        console.log(newTarifas);
      } catch (e) {
        Toast(["Error del sistema", true, 500]);
      }
    }
  };

  const addPrecios = (tarifa) => {
    // tarifa.tarifaPorEquipo;
  };

  // Carga todas las remisiones y devoluciones de un mes de todas las ordenes
  const loadRemisionesYDevoluciones = (ordenes, inicioMes, finMes) => {
    let remisionesMes = [];
    let devolucionesMes = [];
    ordenes.forEach((orden) => {
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
    });
    return { remisionesMes, devolucionesMes };
  };

  /**
   *
   * @param {remisiones o devoluciones} lista de elementos a filtrar
   * @param {fechaLlegada, fechaSalida} nombreFecha propiedad de la lista que se va a filtrar
   * Filtra una lista por fecha inicio y fin a partir de la propiedad fecha
   */
  const filtrarListaPorFecha = (lista, nombreFecha, inicio, fin) => {
    return lista.filter((elemento) => {
      const fecha = new Date(elemento[nombreFecha]);
      return (
        inicio.getTime() <= fecha.getTime() && fecha.getTime() <= fin.getTime()
      );
    });
  };

  return { prefacturas };
}

export default usePrefacturas;
