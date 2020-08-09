import React, { useState } from "react";
import withFormHandling from "../withFormHandling";
import useFetchAPI from "../../hooks/useFetchAPI";
import Escoger from "../Escoger";

const categorias = ["", "compra", "venta", "fabricación", "reparación", "daño"];

function NotaInventarioForm(props) {
  const { fields, handleChange } = props;
  const [proveedor, setProveedor] = useState({});
  const proveedorAPI = useFetchAPI(`/proveedores`);
  return (
    <React.Fragment>
      <div className="group-form">
        <label htmlFor="cantidad">
          <strong>Cantidad:</strong>
        </label>
        <input
          name="cantidad"
          value={fields.cantidad}
          onChange={handleChange}
          type="text"
          required
        />
      </div>
      <div className="group-form">
        <label className="d-grid" htmlFor="categoria">
          <strong>Categoria:</strong>
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
      <div className="group-form">
        <label className="d-block" htmlFor="descripcion">
          <strong>Descripción:</strong>
        </label>
        <textarea
          name="descripcion"
          value={fields.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="group-form">
        <strong>Buscar Proveedor</strong>
        <Escoger
          nombre={"Proveedor 1... "}
          camposBuscar={["nombre", "email", "telefono", "celular"]}
          campos={["nombre", "email", "telefono", "celular"]}
          elementoSelected={[proveedor, setProveedor]}
          elementos={
            typeof proveedorAPI.resource === typeof {}
              ? []
              : proveedorAPI.resource
          }
        />
      </div>
    </React.Fragment>
  );
}

export default withFormHandling(NotaInventarioForm);
