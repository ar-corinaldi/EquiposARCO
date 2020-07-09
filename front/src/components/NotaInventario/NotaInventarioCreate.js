import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "../Modal";
import EquipoList from "../Equipo/EquipoList/EquipoList";
import NotaInventarioForm from "./NotaInventarioForm";
import Toast from "../Toast";
import withEquipoList from "../Equipo/EquipoList/withEquipoList";
import { useHistory } from "react-router-dom";

function NotaInventarioCreate(props) {
  const [showEquipo, setShowEquipo] = useState(false);
  const [showOrden, setShowOrden] = useState(false);
  const [errors, setErrors] = useState([]);
  const [notaInventario, setNotaInventario] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "",
    proveedor: undefined,
  });
  const [equipo, setEquipo] = useState({});
  const [orden, setOrden] = useState({});
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const newNotaInventario = notaInventario;
    newNotaInventario.equipo = equipo._id;
    newNotaInventario.order = orden._id;
    const options = {
      method: "POST",
      body: JSON.stringify(newNotaInventario),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch("/notasInventario", options);
      const dataNotaInventario = await res.json();
      if (!res.ok) {
        Toast(dataNotaInventario, false, res.status);
      } else {
        history.push(`/inventario/listar_notas_de_inventario`);
      }
    } catch (e) {
      console.log(e);
      Toast(["Error del sistema"], true, 500);
    }
  };

  const handleClickEquipo = (e) => {
    e.preventDefault();
    setShowEquipo(true);
  };

  const handleClickOrden = (e) => {
    e.preventDefault();
    setShowOrden(true);
  };

  const handleRemoveEquipo = (e) => {
    e.preventDefault();
    setEquipo({});
  };

  const handleRemoveOrden = (e) => {
    e.preventDefault();
    setOrden({});
  };

  return (
    <Col>
      NotaInventario
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <form onSubmit={submit}>
                <NotaInventarioForm
                  fields={notaInventario}
                  setFields={setNotaInventario}
                />
                <Row>
                  <div className="group-form">
                    <Modal
                      title={"Equipo a añadir nota de inventario"}
                      body={withEquipoList(EquipoList, setEquipo, "inventario")}
                      show={showEquipo}
                      setShow={setShowEquipo}
                      estado={equipo}
                      header
                    />
                    <Col>
                      <button onClick={handleClickEquipo}>
                        Agregar Equipo
                      </button>
                      <input
                        disabled
                        defaultValue={equipo.nombreEquipo}
                        required
                      />
                      <button onClick={handleRemoveEquipo}>-</button>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="group-form">
                    <Modal
                      title={"Orden a añadir nota de inventario"}
                      body={() => <div>Orden</div>}
                      show={showOrden}
                      setShow={setShowOrden}
                      estado={equipo}
                      header
                    />
                    <Col>
                      <button onClick={handleClickOrden}>Agregar Orden</button>
                      <input disabled required />
                      <button onClick={handleRemoveOrden}>-</button>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <button type="submit">Agregar Nota de Inventario</button>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default NotaInventarioCreate;
