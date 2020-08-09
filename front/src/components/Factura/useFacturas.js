import { useState, useEffect } from "react";
import Toast from "../Toast";
import { calcularTarifa } from "../utils/CacularTarifas";
function useFactura(
  fechaPrimeraOrden,
  fechaInicial,
  fechaCorte,
  ordenes,
  setPrecioTotal
) {
  /**
   * Una prefactura es mensual
   * Una prefactura mapea el _id de un equipo a dos objetos;
   * equipo = equipo de remision
   * listaMes = lista de la cantidad de equipo que hay por dia en la bodega
   * La prefactura va a tener todos los equipos que se les hicieron remision o devolucion en un mes
   * Con la cantidad de equipo por dia en la obra durante el mes.
   */
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    setFacturas([]);
    setPrecioTotal(0);
    loadOrdenes(ordenes);
  }, [fechaCorte, fechaPrimeraOrden, fechaInicial, ordenes]);

  useEffect(() => {}, [facturas]);

  const loadOrdenes = (ordenes) => {
    let remisiones = [];
    let devoluciones = [];
    let tarifas = {};
    let facturas = [];
    for (let orden of ordenes) {
      remisiones = orden.remisiones || [];
      devoluciones = orden.devoluciones || [];
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
          if (!tarifas[equipoTarifa._id]) {
            tarifas[equipoTarifa._id] = [];
          }

          tarifas[equipoTarifa._id] = tarifasPorEquipo[0];
        }
      });

      // Unifica equipos en remisiones y devoluciones
      // Mapea cada equipo en una lista con sus remisiones y devoluciones
      // Cada objeto de la lista mapeada tiene la fecha, la cantidad, el equipo
      // Y si es remision  o no para saber si suma o resta
      const movimientos = registrarRemisionesYDevoluciones(
        remisiones,
        devoluciones,
        tarifas
      );
      // Todas las listas mapeadas estan ordenadas en orden de fecha

      // Toda orden tiene una tarifa unica por equipo
      // Todos los equipos con remisiones y devoluciones comparten
      // La misma tarifa de la orden
      // Retorna un arreglo factura en orden de fecha
      // la factura representa el cambio
      let facturasXOrden = loadFacturas(movimientos);
      let curFacturas = facturas;
      curFacturas = curFacturas.concat(facturasXOrden);
      curFacturas.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
      setFacturas(curFacturas);
    }
  };

  const loadFacturas = (movimientos) => {
    let items = [];

    for (let idEquipo in movimientos) {
      let { remisiones, devoluciones, equipo } = movimientos[idEquipo];
      remisiones = remisiones || [];
      while (remisiones.length > 0) {
        let rem = remisiones.shift();
        let tarifa = rem.tarifa;

        devoluciones = devoluciones || [];
        let dev = null;
        while (rem && (!dev || dev.cantidad < 0)) {
          if (!dev) {
            dev = devoluciones.shift();
            if (!dev) break;
          }
          let cantInicial = rem.cantidad;
          let cantidadFinal = dev.cantidad;
          let cantidad = cantInicial + cantidadFinal;
          if (cantidad >= 0) {
            rem.cantidad = Math.abs(cantidadFinal);
            dev.cantidad = 0;
          } else {
            rem.cantidad = cantInicial;
            dev.cantidad = cantidad;
          }
          let item = addItem(rem, dev, tarifa, equipo);

          rem.cantidad = cantidad;
          if (rem.cantidad <= 0) {
            rem = remisiones.shift();
          }

          items.push(item);
          if (dev.cantidad >= 0) {
            dev = null;
          }
        }
        if (devoluciones.length == 0 && rem && rem.cantidad > 0) {
          let devCorte = { cantidad: 0, fecha: fechaCorte, remision: false };
          let item = addItem(rem, devCorte, tarifa, equipo);
          items.push(item);
        }
      }
    }
    items = items.concat(movimientos.transportes);
    return items;
  };

  const addTransporte = (fecha, valorUnitario, codigo) => {
    let rem = codigo;
    let cantidad = "N/A";
    let nombreEquipo = "Servicio Transporte";
    let num = "N/A";
    let tiempo = "";
    let periodo = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
    let total = valorUnitario;
    setPrecioTotal((prev) => prev + total);
    return {
      rem,
      fecha,
      cantidad,
      nombreEquipo,
      valorUnitario,
      num,
      tiempo,
      periodo,
      total,
    };
  };

  const calcularTiempoYTiempoMinimo = (tiempo, tiempoMinimo) => {
    switch (tiempo) {
      case "semana":
        tiempo = "dia cal";
        tiempoMinimo = tiempoMinimo * 7;
        break;
      case "mes":
        tiempo = "mes";
        tiempoMinimo = tiempoMinimo * 30;
        break;
      case "anio":
        tiempo = "anio";
        tiempoMinimo = tiempoMinimo * 365;
        break;
    }
    return [tiempo, tiempoMinimo];
  };

  const addItem = (remision, devolucion, tarifa, equipo) => {
    tarifa = tarifa || { precioReferencia: {} };
    let rem = `${remision.codigo}-${devolucion.codigo || "CORTE"}`;
    let cantidad = remision.cantidad;
    let nombreEquipo = equipo.nombreEquipo || "Equipo No Encontrado";
    let valorUnitario = (tarifa && tarifa.valorTarifa) || 0;
    let fechaFin = devolucion.fecha;
    let fechaIni = remision.fecha;
    // fechaFin.setDate(fechaFin.getDate() + 1);
    let [tiempo, tiempoMinimo] = calcularTiempoYTiempoMinimo(
      tarifa.precioReferencia.tiempo || "dia cal",
      tarifa.precioReferencia.tiempoMinimo || 1
    );
    let { tiempoTotal } = calcularTarifa(
      null,
      tiempo,
      tiempoMinimo,
      fechaIni,
      fechaFin,
      1
    );
    let num = tiempoTotal;
    let periodo = `${fechaIni.getDate()}/${
      fechaIni.getMonth() + 1
    }/${fechaIni.getFullYear()}-${fechaFin.getDate()}/${
      fechaFin.getMonth() + 1
    }/${fechaFin.getFullYear()}`;

    let total = cantidad * valorUnitario * num;
    setPrecioTotal((prev) => prev + total);
    let item = {
      rem,
      fecha: remision.fecha,
      cantidad,
      nombreEquipo,
      valorUnitario,
      num,
      tiempo,
      periodo,
      total,
    };
    return item;
  };

  const registrarRemisionesYDevoluciones = (
    remisiones,
    devoluciones,
    tarifas
  ) => {
    // equipo: {cantidad, equipoID}, costoTransporte
    let equipos = {};
    let transportes = [];
    for (let remision of remisiones) {
      let { equiposEnRemision, fechaSalida } = remision;
      for (let equipo of equiposEnRemision || []) {
        let objEquipo = equipos[equipo.equipoID._id];
        if (!objEquipo) {
          objEquipo = {};
          objEquipo.remisiones = [];
          objEquipo.devoluciones = [];
        }
        objEquipo.equipo = equipo.equipoID;
        objEquipo.remisiones.push({
          cantidad: equipo.cantidad,
          fecha: new Date(fechaSalida),
          tarifa: tarifas[equipo.equipoID._id],
          costoTransporte:
            (remision.costoTransporte > 0 && remision.costoTransporte) ||
            undefined,
          codigo: remision.codigo,
        });
        equipos[equipo.equipoID._id] = objEquipo;
      }
      if (!remision.asumidoTercero) {
        let trans = addTransporte(
          new Date(fechaSalida),
          remision.costoTransporte,
          remision.codigo
        );
        transportes.push(trans);
      }
    }

    for (let devolucion of devoluciones) {
      let { equiposEnDevolucion, fechaLlegada } = devolucion;

      for (let equipo of equiposEnDevolucion || []) {
        let objEquipo = equipos[equipo.equipoID._id];
        if (!objEquipo) {
          objEquipo = {};
          objEquipo.devoluciones = [];
        }
        objEquipo.equipo = equipo.equipoID;
        objEquipo.devoluciones.push({
          cantidad: -equipo.cantidad,
          fecha: new Date(fechaLlegada),
          costoTransporte:
            (devolucion.costoTransporte > 0 && devolucion.costoTransporte) ||
            undefined,
          codigo: devolucion.codigo,
        });

        equipos[equipo.equipoID._id] = objEquipo;
      }
      if (!devolucion.asumidoTercero) {
        let trans = addTransporte(
          new Date(fechaLlegada),
          devolucion.costoTransporte,
          devolucion.codigo
        );
        transportes.push(trans);
      }
    }
    equipos.transportes = transportes;
    return equipos;
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

  return { facturas };
}

export default useFactura;
