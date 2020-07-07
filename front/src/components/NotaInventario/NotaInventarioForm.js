import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import withFormHandling from "../withFormHandling";
import Modal from "../Modal";

const categorias = ["", "compra", "venta", "fabricación", "reparación", "daño"];

function NotaInventarioForm(props) {
  const { fields, setFields, handleChange } = props;
  const [show, setShow] = useState();

  const handleRemoveProveedor = (e) => {
    e.preventDefault();
    const newFields = fields;
    newFields.proveedor = {};
    setFields(newFields);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
    const newFields = fields;
    newFields.proveedor = "Nuevo proveedor";
    setFields(newFields);
  };
  return (
    <React.Fragment>
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
            title={"Proveedor a añadir nota de inventario"}
            body={() => <div>Porveedor</div>}
            show={show}
            setShow={setShow}
            estado={fields}
            header
          />
          <Col>
            <button onClick={handleShow}>Agregar Proveedor</button>
            <input disabled defaultValue={fields.proveedor} required />
            <button onClick={handleRemoveProveedor}>-</button>
          </Col>
        </div>
      </Row>
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
    </React.Fragment>
  );
}

export default withFormHandling(NotaInventarioForm);
