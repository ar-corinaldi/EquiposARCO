import React from "react";

function ComponenteForm(props) {
  const { componente } = props;
  const handleChange = (e, id) => {
    const val = e.target.value;
    props.setComponentes((prev) => {
      return prev.map((comp) => {
        if (comp.equipo._id === id) {
          comp.cantidad = val;
        }
        return comp;
      });
    });
  };
  return (
    <div className="form-group">
      <label htmlFor="nombre">Nombre: </label>
      <input name="nombre" disabled value={componente.equipo.nombreEquipo} />
      <label className="ml-2" htmlFor="cantidad" disabled>
        Cantidad:
      </label>
      <input
        name="cantidad"
        required
        value={componente.cantidad}
        onChange={(e) => handleChange(e, componente.equipo._id)}
      />
    </div>
  );
}

export default ComponenteForm;
