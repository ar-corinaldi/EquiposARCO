import React from "react";

function EquipoComponenteForm(props) {
  return (
    <React.Fragment>
      {props.componentes.map((comp, index) => (
        <div key={index} className="form-group">
          <label htmlFor={"componente" + index}>Código: </label>
          <input name={"componente" + index} />
          <label className="ml-2" htmlFor={"cantidad"}>
            Cantidad:{" "}
          </label>
          <input name={"cantidad"} />
        </div>
      ))}
    </React.Fragment>
  );
}

export default EquipoComponenteForm;
