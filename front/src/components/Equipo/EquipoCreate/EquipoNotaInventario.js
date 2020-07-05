import React from "react";

const categorias = ["", "compra", "venta", "fabricación", "reparación", "daño"];
function EquipoNotaInventario(props) {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <select
          name="categoria"
          // value={fields.tipoEquipo}
          // onChange={handleChange}
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
      <div className="form-group">
        <label htmlFor="descripcion">Descripcion:</label>
        <textarea
          name="descripcion"
          cols="30"
          rows="10" // value={fields.nombreEquipo}
          // onChange={handleChange}
        >
          Descripción:
        </textarea>
      </div>
      <div className="form-group">
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          name="cantidad"
          type="text"
          // value={fields.codigo}
          // onChange={handleChange}
        />
      </div>
    </React.Fragment>
  );
}

export default EquipoNotaInventario;
