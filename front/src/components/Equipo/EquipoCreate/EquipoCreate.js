import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Components
import EquipoForm from "./EquipoForm";
import EquipoComponente from "./EquipoComponente";
import EquipoPrecio from "./EquipoPrecio";
import NotaInventarioForm from "../../NotaInventario/NotaInventarioForm";
import withFormHandling from "../../withFormHandling";
import Toast from "../../Toast";
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
      const resEquipo = await fetch(props.formAction, optionsEquipo);
      const dataEquipo = await resEquipo.json();
      if (!resEquipo.ok) {
        Toast(dataEquipo, false, resEquipo.status);
      } else {
        // Agrego la nota de inventario a la base de datos con el _id de l equipo
        const newNotaInventario = notaInventario;
        newNotaInventario.equipo = dataEquipo._id;
        setNotaInventario(newNotaInventario);
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
        if (!resInventario.ok) {
          const errorsInventario = await resInventario.json();
          Toast(errorsInventario, false, resInventario.status);
          removeEquipo(dataEquipo);
        } else {
          history.push(`equipos/${dataEquipo._id}`);
        }
      }
    } catch (e) {
      Toast(["Error del sistema"], true, 500);
    }
  };

  const removeEquipo = async ({ _id }) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`/equipos/${_id}`, options);
    const dataRemoved = await res.json();
    if (!res.ok) {
      Toast(["Error eliminando el equipo"], true, res.status);
    }
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
              <button type="submit">Crear</button>
              {error}
            </Col>
          </Row>
        </form>
      </Row>
    </Container>
  );
}

export default withFormHandling(EquipoCreate);
