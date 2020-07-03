import React from "react";

function EquipoComponenteForm(props) {
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
    <React.Fragment>
      {props.componentes.map((comp, index) => (
        <div key={index} className="form-group">
          <label htmlFor={"componente" + index}>Nombre: </label>
          <input
            name={"componente" + index}
            disabled
            value={comp.equipo.nombreEquipo}
          />
          <label className="ml-2" htmlFor={"cantidad"} disabled>
            Cantidad:
          </label>
          <input
            name={"cantidad"}
            required
            value={comp.cantidad}
            onChange={(e) => handleChange(e, comp.equipo._id)}
          />
        </div>
      ))}
    </React.Fragment>
  );
}

export default EquipoComponenteForm;
