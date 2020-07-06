import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "../Modal";
import EquipoList from "../Equipo/EquipoList/EquipoList";
import withEquipoList from "../Equipo/EquipoList/withEquipoList";

function NotaInventarioCreate() {
  const [show, setShow] = useState(false);
  const [notaInventario, setNotaInventario] = useState({
    equipo: { nombreEquipo: "" },
  });

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleChange = (e) => {
    const newNotaInventario = notaInventario;
    newNotaInventario[e.target.name] = e.target.value;
    setNotaInventario(e.target.value);
  };
  return (
    <Col>
      NotaInventario
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <form>
                <Row>
                  <div className="group-form">
                    <textarea
                      name="descripcion"
                      // value=""
                      // onChange={handleChange}
                    >
                      Descripción:
                    </textarea>
                  </div>
                </Row>
                <Row>
                  <div className="group-form">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                      name="cantidad"
                      value={""}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </Row>
                <div className="group-form">
                  <Modal
                    title={"Equipo a añadir nota de inventario"}
                    body={withEquipoList(
                      EquipoList,
                      setNotaInventario,
                      "inventario"
                    )}
                    show={show}
                    setShow={setShow}
                    estado={notaInventario}
                    header
                  />
                  <Col>
                    <button onClick={handleClick}>Agregar Equipo</button>
                    <input
                      disabled
                      defaultValue={notaInventario.equipo.nombreEquipo}
                    />
                  </Col>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default NotaInventarioCreate;
