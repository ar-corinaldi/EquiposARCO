import React from "react";
import Row from "react-bootstrap/Row";
import withFormHandling from "../withFormHandling";

const categorias = ["", "compra", "venta", "fabricación", "reparación", "daño"];

function NotaInventarioForm(props) {
  const { fields, handleChange } = props;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default withFormHandling(NotaInventarioForm);
