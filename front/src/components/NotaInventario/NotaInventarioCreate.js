import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "../Modal";
import EquipoList from "../Equipo/EquipoList/EquipoList";
import withEquipoList from "../Equipo/EquipoList/withEquipoList";
import withFormHandling from "../withFormHandling";
import { useHistory } from "react-router-dom";
const categorias = ["", "compra", "venta", "fabricación", "reparación", "daño"];

function NotaInventarioCreate(props) {
  const [showEquipo, setShowEquipo] = useState(false);
  const [showOrden, setShowOrden] = useState(false);
  const [equipo, setEquipo] = useState({});
  const [orden, setOrden] = useState({});
  const history = useHistory();

  const { fields, handleChange } = props;

  const submit = (e) => {
    e.preventDefault();
    console.log(fields);
    fields.equipo = equipo._id;
    history.push(`/inventario/equipos/${fields.equipo}`);
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
                <Row>
                  <div className="group-form">
                    Descripción:
                    <textarea
                      name="descripcion"
                      value={fields.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Row>
                <Row>
                  <div className="group-form">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                      name="cantidad"
                      value={fields.cantidad}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </div>
                </Row>
                <Row>
                  <div className="group-form">
                    <label className="ml-2" htmlFor="categoria">
                      Categoria:
                    </label>
                    <select
                      name="categoria"
                      value={fields.categoria}
                      onChange={handleChange}
                      required
                    >
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria.length > 0
                            ? categoria[0].toUpperCase() + categoria.slice(1)
                            : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </Row>
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

export default withFormHandling(NotaInventarioCreate);
