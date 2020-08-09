import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Col from "react-bootstrap/Row";

function FacturaFechas(props) {
  const [fechaInicial, setFechaInicial] = props.fechaInicial;
  const [fechaCorte, setFechaCorte] = props.fechaCorte;
  const [renderInicial, setRenderInicial] = useState("");
  const [renderCorte, setRenderCorte] = useState("");

  useEffect(() => {
    setRenderInicial(parseDate(fechaInicial));
  }, [fechaInicial]);

  useEffect(() => {
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
    if (name === "fechaCorte") {
      const newFecha = new Date(anio, mes - 1, dia, 23);
      if (!fechasValida(newFecha, fechaInicial)) {
        return Toast(
          ["No se puede facturar una fecha final antes de la fecha inicial"],
          true,
          500
        );
      }
      setFechaCorte(newFecha);
    } else if (name === "fechaInicial") {
      const newFecha = new Date(anio, mes - 1, dia, 1);
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
    <Row>
      <Col className="ml-3">
        <label htmlFor="fechaInicial">Fecha de Inicial</label>
        <input
          required
          name="fechaInicial"
          value={renderInicial}
          type="date"
          onChange={handleChange}
        />
      </Col>
      <Col>
        <label htmlFor="fechaCorte">Fecha Corte</label>
        <input
          name="fechaCorte"
          value={renderCorte}
          type="date"
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
}

export default FacturaFechas;
