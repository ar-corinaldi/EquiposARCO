import { useState, useEffect } from "react";
import Toast from "../Toast";
function usePrefacturas(fechaInicial, fechaActual, ordenes) {
  const [prefacturas, setPrefacturas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tarifas, setTarifas] = useState([]);
  const lastDays = {};
  useEffect(() => {
    ordenes.forEach((orden) => {
      const { tarifasDefinitivas } = orden;

      loadPrefacturas(orden);

      loadTarifas(orden);
    });
  }, []);

  useEffect(() => {
    tarifas.forEach((tarifa) => {
      addPrecios(tarifa);
    });
  }, [tarifas]);

  const loadTarifas = async (orden) => {
    const url = `/ordenes/${orden._id}/tarifasPobladas`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return Toast(["No se pudieron cargar las facturas"], true, res.status);
      }
      const ordenDetail = await res.json();
      console.log("ORdendETIAL", ordenDetail);
      const newTarifas = tarifas;
      ordenDetail.tarifasDefinitivas.forEach((tarifaPorEquipo) => {
        console.log(tarifaPorEquipo);
        newTarifas.push(tarifaPorEquipo);
      });
      setTarifas((prevTar) => [...prevTar, ordenDetail.tarifasDefinitivas]);
    } catch (e) {
      Toast(["Error del sistema", true, 500]);
    }
  };

  const addPrecios = (tarifa) => {
    console.log(tarifa);
    // tarifa.tarifaPorEquipo;
  };

  const loadPrefacturas = (orden) => {
    let mesInicial = fechaInicial.getMonth();
    let anioInicial = fechaInicial.getFullYear();
    let anioFinal = fechaActual.getFullYear();
    // Calcula la cantidad de meses para anios distintos
    let mesesDifAnios =
      mesInicial + (anioFinal - anioInicial - 1) * 12 + fechaActual.getMonth();
    let mesFinal = mesesDifAnios;

    // En caso de que se tengan los mismos anios
    if (anioInicial === anioFinal) mesFinal = fechaActual.getMonth();

    // anio inicial a poner
    let anio = anioInicial;
    for (let mes = mesInicial; mes <= mesFinal; mes++) {
      let newMes = mes;

      if (newMes > 11) {
        anio += 1;
        newMes = newMes % 12;
      }
      let inicioMes = new Date(anio, newMes);
      let finMes = new Date(anio, newMes + 1, 0, 23);

      if (mes % 12 === fechaActual.getMonth()) {
        finMes = fechaActual;
      }

      const prefacturaMes = loadPrefacturaMes(
        orden.remisiones,
        orden.devoluciones,
        inicioMes,
        finMes
      );

      setPrefacturas((prevFact) => [...prevFact, prefacturaMes]);
    }
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

  const loadPrefacturaMes = (_remisiones, _devoluciones, inicioMes, finMes) => {
    const remMes = filtrarListaPorFecha(
      _remisiones,
      "fechaLlegada",
      inicioMes,
      finMes
    );

    const devMes = filtrarListaPorFecha(
      _devoluciones,
      "fechaSalida",
      inicioMes,
      finMes
    );

    // Cantida de dias del mes
    let daysOfMonth = finMes.getDate();
    const prefactura = {};

    for (let i = 1; i <= daysOfMonth; i++) {
      if (i === 1) cargarEquiposMesAnterior(remMes, i, finMes);

      acumEquiposRemisionPorDia(remMes, i, finMes, prefactura);
      //      1   2   3   4   5 ... daysOfMonth
      // E1  10  15  20
      // E2
      acumEquiposDevolucionPorDia(devMes, i, finMes, prefactura);
    }
    const equiposPrefac = Object.keys(prefactura);
    equiposPrefac.forEach((equipoPrefac) => {
      lastDays[equipoPrefac] = prefactura[equipoPrefac][daysOfMonth - 1];
    });
    return {
      prefacturasDiarias: prefactura,
      mes: finMes.getMonth(),
      anio: finMes.getFullYear(),
    };
  };

  const acumEquiposRemisionPorDia = (remisiones, day, finMes, prefacturas) => {
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
        const idEquipo = `_${equipo.equipoID._id}`;
        let newCantidad = 0;

        if (!prefacturas[idEquipo]) {
          prefacturas[idEquipo] = new Array(daysOfMonth).fill(0);
          newCantidad = equipo.cantidad;
          const newEquipos = equipos;
          if (!newEquipos.some((equip) => `_${equip._id}` === idEquipo)) {
            newEquipos.push(equipo.equipoID);
            setEquipos(newEquipos);
          }
        } else {
          const lastElement = day !== 0 ? prefacturas[idEquipo][day - 1] : 0;
          newCantidad = equipo.cantidad + lastElement;
        }
        prefacturas[idEquipo].fill(newCantidad, day - 1, daysOfMonth);
      }
    }
  };

  const acumEquiposDevolucionPorDia = (
    devoluciones,
    day,
    finMes,
    prefacturas
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
        const idEquipo = `_${equipo.equipoID._id}`;
        let newCantidad = 0;

        if (!prefacturas[idEquipo]) {
          prefacturas[idEquipo] = new Array(daysOfMonth).fill(0);
          newCantidad = equipo.cantidad;
        } else {
          const lastElement = day !== 0 ? prefacturas[idEquipo][day - 1] : 0;
          newCantidad = lastElement - equipo.cantidad;
        }

        prefacturas[idEquipo].fill(newCantidad, day - 1, daysOfMonth);
      }
    }
  };

  const cargarEquiposMesAnterior = (_remisiones, day, finMes) => {
    const equiposMesAnterior = Object.keys(lastDays);
    equiposMesAnterior.forEach((equipo) => {
      const cantidad = lastDays[equipo];
      const found = equipos.find(
        (equipoState) => `_${equipoState._id}` === equipo
      );
      _remisiones.push({
        fechaLlegada: new Date(finMes.getFullYear(), finMes.getMonth(), day),
        equiposEnRemision: [{ equipoID: found, cantidad }],
      });
    });
  };

  return { equipos, prefacturas };
}

export default usePrefacturas;
