import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import EquipoForm from "./EquipoForm";
import EquipoPrecio from "./EquipoPrecio";
import NotaInventarioForm from "../../NotaInventario/NotaInventarioForm";
import Toast from "../../Toast";
// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EquipoNoCompuestoForm(props) {
  const [precios, setPrecios] = useState([]);
  const [notaInventario, setNotaInventario] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "",
  });
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

      newEquipo.precios = precios;
      setEquipo(newEquipo);
      const body = {};
      body.equipo = newEquipo;
      body.notaInventario = notaInventario;
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(body);
      const res = await fetch("/notasInventario/equipos", options);
      const dataEquipo = await res.json();
      if (!res.ok) {
        Toast(dataEquipo, false, res.status);
      } else {
        const messages = [
          "Equipo no compuesto añadido con éxito",
          "Nota de inventario añadida con éxito",
        ];
        Toast(messages, true, res.status);
        history.push(`equipos/${dataEquipo._id}`);
      }
    } catch (e) {
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
            <NotaInventarioForm
              fields={notaInventario}
              setFields={setNotaInventario}
            />
          </Col>
          <Col xs={6}>
            <Row>
              <EquipoPrecio precios={precios} setPrecios={setPrecios} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="buttonAction" type="submit">
              Crear
            </button>
            {error}
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default EquipoNoCompuestoForm;
