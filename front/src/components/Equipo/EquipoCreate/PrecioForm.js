import React from "react";
import withFormHandling from "../../withFormHandling";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const categorias = ["", "unidad", "metro", "metro2", "metro3", "venta"];

const tiempos = ["", "hora", "dia cal", "dia habil", "semana", "mes", "anio"];

function PrecioForm(props) {
  const { fields, handleChange } = props;

  const handleAgregar = (e) => {
    e.preventDefault();
    props.setPrecios((prev) => [...prev, fields]);
  };

  return (
    <Container key={props.index}>
      <Row>
        <div className="form-group">
          <label htmlFor="valorVenta">Valor Venta: </label>
          <input
            name="valorVenta"
            value={fields.valorVenta}
            onChange={handleChange}
          />
        </div>
      </Row>
      <Row>
        <div className="form-group">
          <label className="ml-2" htmlFor="valorAlquiler">
            Valor Alquiler:
          </label>
          <input
            name="valorAlquiler"
            value={fields.valorAlquiler}
            onChange={handleChange}
          />
        </div>
      </Row>
      <Row>
        <div className="form-group">
          <label className="ml-2" htmlFor="categoria">
            Categoria:
          </label>
          <select
            name="categoria"
            value={fields.categoria}
            onChange={handleChange}
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
        <div className="form-group">
          <label className="ml-2" htmlFor="tiempo">
            Tiempo:
          </label>
          <select name="tiempo" value={fields.tiempo} onChange={handleChange}>
            {tiempos.map((tiempo) => (
              <option key={tiempo} value={tiempo}>
                {tiempo.length > 0
                  ? tiempo[0].toUpperCase() + tiempo.slice(1)
                  : ""}
              </option>
            ))}
          </select>
        </div>
      </Row>
      <Row>
        <div className="form-group">
          <label className="ml-2" htmlFor="tiempoMinimo">
            Tiempo Minimo:
          </label>
          <input
            name="tiempoMinimo"
            value={fields.tiempoMinimo}
            onChange={handleChange}
          />
        </div>
      </Row>
      <Row>
        <button onClick={handleAgregar}>Agregar</button>
      </Row>
    </Container>
  );
}

export default withFormHandling(PrecioForm);
