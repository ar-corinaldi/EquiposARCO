import React, { useState, useEffect } from "react";
import EquipoFilter from "./EquipoFilter";
import EquipoTable from "./EquipoTable";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
let equiposTmp = [
  {
    _id: "1",
    nombre: "mezcladora",
    especificacion: "0.5 bulto",
    tipoCobro: "Unid/ dia + IVA",
    alquiler: "32000",
    reposicion: "2354000",
    categoria: "maquinaria pesada",
  },
  {
    _id: "2",
    nombre: "vibradora",
    especificacion: "0.5 bulto",
    tipoCobro: "Unid/ dia + IVA",
    alquiler: "32000",
    reposicion: "2354000",
    categoria: "maquinaria liviana",
  },
  {
    _id: "3",
    nombre: "allanadora",
    especificacion: "0.5 bulto",
    tipoCobro: "Unid/ dia + IVA",
    alquiler: "32000",
    reposicion: "2354000",
    categoria: "maquinaria liviana",
  },
];

function Equipo(props) {
  const [equipos, setEquipos] = useState(equiposTmp);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    // El fetch al equipo viene ordenado por categoria
    // const res = await fetch("/equipos");
    // const newEquipos = await res.json();

    setEquipos(equiposTmp);
    console.log("filter", filterText);
  }, [filterText]);

  return (
      <Container>
        <Row>
          <EquipoFilter filterText={filterText} setFilterText={setFilterText} />
        </Row>
        <Row>
              <EquipoTable equipos={equipos} filterText={filterText} />
        </Row>
      </Container>
  );
}

export default Equipo;
