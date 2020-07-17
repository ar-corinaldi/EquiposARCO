import React, { useState, useEffect } from "react";
import PrefacturaTable from "./PrefacturaTable";

const nombreMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function Prefacturas(props) {
  const { fechaInicial, fechaActual, factura } = props;
  const [prefacturas, setPrefacturas] = useState([]);
  const lastDays = {};
  useEffect(() => {
    factura.ordenes &&
      factura.ordenes.forEach((orden) => {
        loadPrefacturas(orden);
      });
  }, []);

  const loadPrefacturas = (orden) => {
    for (
      let mes = fechaInicial.getMonth();
      mes <= fechaActual.getMonth();
      mes++
    ) {
      const prefacturaMes = fileterdEquipo(
        orden.remisiones,
        orden.devoluciones,
        mes
      );
      setPrefacturas((prevFact) => [...prevFact, prefacturaMes]);
    }
  };

  const fileterdEquipo = (_remisiones, _devoluciones, _mes) => {
    let mesYAnio = null;
    const remMes =
      (_remisiones &&
        _remisiones.filter((remision) => {
          const fecha = new Date(remision.fechaLlegada);
          const cond = fecha.getMonth() === _mes;
          if (mesYAnio === null && cond) mesYAnio = fecha;
          return cond;
        })) ||
      [];

    const devMes =
      _devoluciones &&
      _devoluciones.filter((dev) => {
        let fecha = new Date(dev.fechaSalida);
        let cond = fecha.getMonth() === _mes;
        if (mesYAnio === null && fecha.getMonth() === _mes) mesYAnio = fecha;
        return cond;
      });

    // Cantida de dias del mes, en caso de que no haya ninguna remision o devolucion, sera 0
    let daysOfMonth =
      (mesYAnio && new Date(mesYAnio.getFullYear(), _mes + 1, 0).getDate()) ||
      0;
    const prefacturas = {};

    for (let i = 1; i <= daysOfMonth; i++) {
      if (i === 1) cargarEquiposMesAnterior(remMes, i, mesYAnio);

      acumEquiposRemisionPorDia(remMes, i, daysOfMonth, prefacturas);
      //      1   2   3   4   5 ... daysOfMonth
      // E1  10  15  20
      // E2
      acumEquiposDevolucionPorDia(devMes, i, daysOfMonth, prefacturas);
    }
    const equiposPrefac = Object.keys(prefacturas);
    equiposPrefac.forEach((equipoPrefac) => {
      lastDays[equipoPrefac] = prefacturas[equipoPrefac][daysOfMonth - 1];
    });
    return {
      prefacturasDiarias: prefacturas,
      mes: _mes,
      anio: (mesYAnio && mesYAnio.getFullYear()) || 0,
    };
  };

  const acumEquiposRemisionPorDia = (
    remisiones,
    day,
    daysOfMonth,
    prefacturas
  ) => {
    const filterRemByDay =
      remisiones &&
      remisiones.filter((rem) => {
        const fecha = new Date(rem.fechaLlegada);
        return fecha.getDate() === day;
      });

    for (const remision of filterRemByDay) {
      for (const equipo of remision.equiposEnRemision) {
        const idEquipo = `${equipo.equipoID}`;
        let newCantidad = 0;

        if (!prefacturas[idEquipo]) {
          prefacturas[idEquipo] = new Array(daysOfMonth).fill(0);
          newCantidad = equipo.cantidad;
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
    daysOfMonth,
    prefacturas
  ) => {
    const filterDevByDay =
      devoluciones &&
      devoluciones.filter((dev) => {
        const fecha = new Date(dev.fechaSalida);
        return fecha.getDate() === day;
      });
    for (const devolucion of filterDevByDay) {
      for (const equipo of devolucion.equiposEnDevolucion) {
        const idEquipo = `${equipo.equipoID}`;
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

  const cargarEquiposMesAnterior = (_remisiones, day, mesYAnio) => {
    const equiposMesAnterior = Object.keys(lastDays);
    equiposMesAnterior.forEach((equipo) => {
      const equiposMesAnterior = Object.keys(lastDays);
      equiposMesAnterior.forEach((equipo) => {
        const cantidad = lastDays[equipo];
        _remisiones.push({
          fechaLlegada: new Date(
            mesYAnio.getFullYear(),
            mesYAnio.getMonth(),
            day
          ),
          equiposEnRemision: [{ equipoID: equipo, cantidad }],
        });
      });
    });
  };

  return (
    <div id="info-wrapper">
      <div>Prefacturas</div>
      <div>
        {prefacturas.map(({ mes, prefacturasDiarias, anio }) => (
          <div key={mes} className="row">
            <div className="col-2">{nombreMeses[mes]}</div>
            <div className="col">
              {Object.keys(prefacturasDiarias) &&
                Object.keys(prefacturasDiarias).map((equipo) => (
                  <PrefacturaTable
                    key={equipo._id}
                    equipo={equipo}
                    prefactura={prefacturasDiarias[equipo]}
                    mes={mes + 1}
                    anio={anio}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prefacturas;
