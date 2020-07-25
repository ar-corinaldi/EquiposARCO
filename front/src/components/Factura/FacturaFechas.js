import React, { useEffect, useState } from "react";
import Toast from "../Toast";

function FacturaFechas(props) {
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;
  const [renderInicial, setRenderInicial] = useState("");
  const [renderCorte, setRenderCorte] = useState("");

  useEffect(() => {
    setRenderInicial(parseDate(fechaInicial));
  }, [fechaInicial]);

  useEffect(() => {
    console.log("renderiza la fecha corte", fechaCorte.toLocaleDateString());
    setRenderCorte(parseDate(fechaCorte));
  }, [fechaCorte]);

  const parseDate = (date) => {
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + date.getDate()).slice(-2);
    let fecha = [date.getFullYear(), mes, dia].join("-");
    return fecha;
  };

  const fechasValida = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [anio, mes, dia] = value.split("-");
    const newFecha = new Date(anio, mes - 1, dia, 1);
    if (name === "fechaCorte") {
      console.log(newFecha);
      if (!fechasValida(newFecha, fechaInicial)) {
        return Toast(
          ["No se puede facturar una fecha final antes de la fecha inicial"],
          true,
          500
        );
      }
      setFechaCorte(newFecha);
    } else if (name === "fechaInicial") {
      if (!fechasValida(fechaCorte, newFecha)) {
        return Toast(
          ["No se puede facturar una fecha final antes de la fecha inicial"],
          true,
          500
        );
      }
      setFechaInicial(newFecha);
    }
  };

  return (
    <React.Fragment>
      <label htmlFor="fechaInicial">Fecha de Inicial</label>
      <input
        required
        disabled
        name="fechaInicial"
        value={renderInicial}
        type="date"
        onChange={handleChange}
      />
      <button disabled>Cambiar Fecha de Inicial</button>
      <label htmlFor="fechaCorte">Fecha Corte</label>
      <input
        name="fechaCorte"
        value={renderCorte}
        type="date"
        onChange={handleChange}
      />
      <button>Cambiar Fecha Corte</button>
    </React.Fragment>
  );
}

export default FacturaFechas;
