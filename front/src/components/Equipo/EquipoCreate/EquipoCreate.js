import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import EquipoForm from "./EquipoForm";
import EquipoComponente from "./EquipoComponente";
import EquipoPrecio from "./EquipoPrecio";
import EquipoNotaInventario from "./EquipoNotaInventario";
import withFormHandling from "../../withFormHandling";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EquipoCreate(props) {
  const [componentes, setComponentes] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [notaInventario, setNotaInventario] = useState({});
  const [error, setError] = useState(null);
  const { handleChange, fields } = props;
  const history = useHistory();
  const handleSubmitPOSTEquipo = async (e) => {
    e.preventDefault();

    // Agrego componentes
    try {
      fields.componentes = componentes.map((componente) => {
        const newComponente = {};
        newComponente.cantidad = componente.cantidad;
        newComponente.equipoID = componente.equipo._id;
        if (componente.cantidad === 0) {
          setError("La cantidad del componente debe ser mayor a 0");
          throw new Error("La cantidad del componente debe ser mayor a 0");
        }
        return newComponente;
      });
      fields.precios = precios;
      const optionsEquipo = {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(props.formAction, optionsEquipo);
      const equipoPost = await res.json();
      console.log("El equipo posteado", equipoPost);
      // Agrego la nota de inventario a la base de datos con el _id de l equipo
      const newNotaInventario = notaInventario;
      newNotaInventario.equipo = equipoPost._id;
      setNotaInventario(newNotaInventario);
      console.log(notaInventario);
      const optionsNotaInventario = {
        method: "POST",
        body: JSON.stringify(notaInventario),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // const res = await fetch("notasInventario", optionsNotaInventario);
      // const notaInventario = await
      // history.push(`equipos/${equipoPost._id}`);
    } catch (e) {}
  };
  return (
    <form onSubmit={handleSubmitPOSTEquipo}>
      <Row>
        <EquipoForm
          formAction={props.formAction}
          fields={fields}
          componentes={componentes}
          handleChange={handleChange}
        />
        <Col md="auto">
          <Row>
            <EquipoComponente
              setComponentes={setComponentes}
              componentes={componentes}
            />
          </Row>
          <Row>
            <EquipoPrecio precios={precios} setPrecios={setPrecios} />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <EquipoNotaInventario
            notaInventario={notaInventario}
            setNotaInventario={setNotaInventario}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <button type="submit" onClick={() => setError(null)}>
            Crear
          </button>
          {error}
        </Col>
      </Row>
    </form>
  );
}

export default withFormHandling(EquipoCreate);
