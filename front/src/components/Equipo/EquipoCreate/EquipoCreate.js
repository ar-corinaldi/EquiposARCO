import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import EquipoForm from "./EquipoForm";
import EquipoComponente from "./EquipoComponente";
import EquipoPrecio from "./EquipoPrecio";
import NotaInventarioForm from "../../NotaInventario/NotaInventarioForm";
import withFormHandling from "../../withFormHandling";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function EquipoCreate(props) {
  const [componentes, setComponentes] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [notaInventario, setNotaInventario] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "",
  });
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
      console.log(fields);
      console.log(notaInventario);
      const resEquipo = await fetch(props.formAction, optionsEquipo);
      const equipoPost = await resEquipo.json();
      // Agrego la nota de inventario a la base de datos con el _id de l equipo
      const newNotaInventario = notaInventario;
      newNotaInventario.equipo = equipoPost._id;
      setNotaInventario(newNotaInventario);
      console.log(newNotaInventario);
      const optionsNotaInventario = {
        method: "POST",
        body: JSON.stringify(notaInventario),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const resInventario = await fetch(
        "/notasInventario",
        optionsNotaInventario
      );
      history.push(`equipos/${equipoPost._id}`);
    } catch (e) {}
  };
  return (
    <Container>
      <Row>
        <form onSubmit={handleSubmitPOSTEquipo}>
          <Row>
            <Col>
              <EquipoForm
                formAction={props.formAction}
                fields={fields}
                handleChange={handleChange}
              />
            </Col>
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
              <NotaInventarioForm
                fields={notaInventario}
                setFields={setNotaInventario}
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
      </Row>
    </Container>
  );
}

export default withFormHandling(EquipoCreate);
