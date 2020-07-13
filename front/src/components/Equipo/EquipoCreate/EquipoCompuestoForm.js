import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import EquipoForm from "./EquipoForm";
import EquipoComponente from "./EquipoComponente";
import EquipoPrecio from "./EquipoPrecio";
import Toast from "../../Toast";
// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EquipoCompuestoForm(props) {
  const [componentes, setComponentes] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [equipo, setEquipo] = useState({
    tipoEquipo: "",
    nombreFamilia: "",
    nombreGrupo: "",
    nombreEquipo: "",
    precioReposicion: "",
    costoEquipo: "",
    codigo: "",
  });
  const [error, setError] = useState(null);
  const { handleChange } = props;
  const history = useHistory();
  const handleSubmitPOSTEquipo = async (e) => {
    e.preventDefault();

    // Agrego componentes
    try {
      const newEquipo = equipo;
      newEquipo.componentes = componentes.map((componente) => {
        const newComponente = {};
        newComponente.cantidad = componente.cantidad;
        newComponente.equipoID = componente.equipo._id;
        if (componente.cantidad === 0) {
          setError("La cantidad del componente debe ser mayor a 0");
          throw new Error("La cantidad del componente debe ser mayor a 0");
        }
        return newComponente;
      });
      newEquipo.precios = precios;
      setEquipo(newEquipo);
      const options = {
        method: "POST",
        body: JSON.stringify(newEquipo),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("/equipos", options);
      const dataEquipo = await res.json();
      if (!res.ok) {
        Toast(dataEquipo, false, res.status);
      } else {
        const messages = ["Equipo compuesto añadido con éxito"];
        Toast(messages, true, res.status);
        history.push(`equipos/${dataEquipo._id}`);
      }
    } catch (e) {
      console.log(e);
      Toast(["Error del sistema"], true, 500);
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmitPOSTEquipo}>
        <Row>
          <Col>
            <EquipoForm
              fields={equipo}
              setFields={setEquipo}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <EquipoComponente
              setComponentes={setComponentes}
              componentes={componentes}
            />
          </Col>
          <Col xs={6}>
            <EquipoPrecio precios={precios} setPrecios={setPrecios} />
          </Col>
        </Row>
        <Row>
          <Col>
            <button type="submit">Crear</button>
            {error}
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default EquipoCompuestoForm;
