import React, { useRef, useEffect, useState } from "react";
import Toast from "../Toast";

function FacturaFechas(props) {
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;
  const [renderInicial, setRenderInicial] = useState("");
  const [renderCorte, setRenderCorte] = useState("");
  const refFechaCorte = useRef();
  const refFechaInicial = useRef();

  useEffect(() => {
    setRenderInicial(parseDate(fechaInicial));
  }, [fechaInicial]);

  useEffect(() => {
    setRenderCorte(parseDate(fechaCorte));
  }, [fechaCorte]);

  const cambioFechaInicial = (e) => {
    e.preventDefault();
    const val = refFechaInicial.current.value;
    const [anio, mes, dia] = val.split("-");
    const newFecha = new Date(anio, mes - 1, dia);
    if (!fechasValida(fechaCorte, newFecha)) {
      return Toast(
        ["No se puede facturar una fecha final antes de la fecha inicial"],
        true,
        500
      );
    } else {
      setFechaInicial(newFecha);
    }
  };

  const cambioFechaCorte = (e) => {
    e.preventDefault();
    const val = refFechaCorte.current.value;
    const [anio, mes, dia] = val.split("-");
    const newFecha = new Date(anio, mes - 1, dia);
    if (!fechasValida(newFecha, fechaInicial)) {
      return Toast(
        ["No se puede facturar una fecha final antes de la fecha inicial"],
        true,
        500
      );
    } else {
      setFechaCorte(newFecha);
    }
  };

  const parseDate = (date) => {
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + date.getDate()).slice(-2);
    let fecha = [date.getFullYear(), mes, dia].join("-");
    return fecha;
  };

  const fechasValida = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() > fechaMenor.getTime();

  return (
    <React.Fragment>
      <label htmlFor="fechaInicial">Fecha de Inicial</label>
      <input
        required
        disabled
        name="fechaInicial"
        defaultValue={renderInicial}
        type="date"
        ref={refFechaInicial}
      />
      <button disabled onClick={cambioFechaInicial}>
        Cambiar Fecha de Inicial
      </button>
      <label htmlFor="fechaCorte">Fecha Corte</label>
      <input
        name="fechaCorte"
        defaultValue={renderCorte}
        type="date"
        ref={refFechaCorte}
      />
      <button onClick={cambioFechaCorte}>Cambiar Fecha Corte</button>
    </React.Fragment>
  );
}

export default FacturaFechas;
