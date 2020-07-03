import React from "react";
import withFormHandling from "../../withFormHandling";
function PrecioForm(props) {
  const { fields, handleChange } = props;

  const handleAgregar = (e) => {
    e.preventDefault();
    props.setPrecios((prev) => [...prev, fields]);
  };

  return (
    <div key={props.index} className="form-group">
      <label htmlFor="valorVenta">Valor Venta: </label>
      <input
        name="valorVenta"
        value={fields.valorVenta}
        onChange={handleChange}
      />
      <label className="ml-2" htmlFor="valorAlquiler">
        Valor Alquiler:
      </label>
      <input
        name="valorAlquiler"
        value={fields.valorAlquiler}
        onChange={handleChange}
      />
      <label className="ml-2" htmlFor="categoria">
        Categoria:
      </label>
      <input
        name="categoria"
        value={fields.categoria}
        onChange={handleChange}
      />
      <label className="ml-2" htmlFor="tiempo">
        Tiempo:
      </label>
      <input name="tiempo" value={fields.tiempo} onChange={handleChange} />
      <label className="ml-2" htmlFor="tiempoMinimo">
        Tiempo Minimo:
      </label>
      <input
        name="tiempoMinimo"
        value={fields.tiempoMinimo}
        onChange={handleChange}
      />
      <button onClick={handleAgregar}>Agregar</button>
    </div>
  );
}

export default withFormHandling(PrecioForm);
