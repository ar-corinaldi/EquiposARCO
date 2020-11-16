import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PrecioTable from "./PrecioTable";
import EquipoDetailBadges from "./EquipoDetailBadges";
import Container2Components from "../../Container2Components";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import formatoPrecios from "../../utils/FormatoPrecios";
import PropiedadesDetail from "./PropiedadDetail";
import ComponenteDetail from "./ComponenteDetail";
import useFetchAPI from "../../../hooks/useFetchAPI";
import EditField from "../../EditField";
function EquipoDetail() {
  let { idEquipo } = useParams();
  const [loading, setLoading] = useState(true);
  const [equipo, setEquipo] = useState({});
  const costoEquipo = useRef();
  const precioReposicion = useRef();
  const nombreEquipo = useRef();
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newEquipo = {...equipo};
    newEquipo[name] = value;
    setEquipo(newEquipo);
  }

  const deleteEquipoActual = async () => {
    const options = {
      method: "DELETE",
    };
    const res = await fetch("/equipos/" + idEquipo, options);
    const equipoActualizado = await res.json();
    setEquipo({});
  }

  const guardarEquipoActual = async () => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(equipo),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("/equipos/" + idEquipo, options);
    const equipoActualizado = await res.json();
    setEquipo(equipoActualizado);
  }



  useEffect(() => {
    console.log(equipo);
  }, [equipo])

  useEffect(() => {
    const fetchEquipo = async () => {
      const res = await fetch("/equipos/" + idEquipo);
      const newEquipo = await res.json();
      setEquipo(newEquipo);
      setLoading(false);

    }
    fetchEquipo();
  }, [])

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!equipo) {
    return <h1>No se encontro equipo con este id</h1>;
  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>
               <EditField value={equipo} name={"nombreEquipo"} reference={nombreEquipo} handleChange={handleChange} />
            ({equipo.codigo && equipo.codigo.toUpperCase()})
          </h3>
        </Col>
      </Row>
      <Row className="d-flex justify-content-around">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <h6>
                Costo Equipo <EditField value={equipo} name={"costoEquipo"} reference={costoEquipo} handleChange={handleChange} />
              </h6>
            </li>
            <li className="breadcrumb-item">
              <h6>
                Precio Reposicion:{" "}
                <EditField value={equipo} name={"precioReposicion"} reference={precioReposicion} handleChange={handleChange}/>
              </h6>
            </li>
          </ol>
        </nav>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <h6>{equipo.tipoEquipo}</h6>
            </li>
            <li className="breadcrumb-item">
              <h6>{equipo.nombreFamilia}</h6>
            </li>
            <li className="breadcrumb-item">
              <h6>{equipo.nombreGrupo}</h6>
            </li>
          </ol>
        </nav>
      </Row>
      <Row className="d-flex justify-content-around">
        <EquipoDetailBadges
          equipo={equipo}
          handleChange={handleChange}
          cantidadTotal={equipo.cantidadTotal}
          cantidadBodega={equipo.cantidadBodega}
          cantidadUsado={equipo.cantidadTotal - equipo.cantidadBodega}
        />
      </Row>
      <Row>
        <Col>
          <PrecioTable precios={equipo.precios || []} equipo={equipo} setEquipo={setEquipo}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container2Components
            componentes={[
              () => <ComponenteDetail componentes={equipo.componentes} />,
              () => <PropiedadesDetail equipo={equipo} />,
            ]}
            nombres={["Componentes", "Propiedades"]}
          />
        </Col>
        <Col>
        <div className="d-flex justify-content-around">
            <Button onClick={guardarEquipoActual}>Guardar</Button>
            <Button onClick={deleteEquipoActual} className="btn btn-danger">Eliminar</Button>
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EquipoDetail;
