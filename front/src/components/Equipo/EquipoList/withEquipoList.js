import React from "react";

export const ContextEquipoList = React.createContext({
  noCompuesto: false,
  handleClick: false,
});

const withEquipoList = (EquipoList, setState, stateNombre, noCompuesto) => (
  props
) => {
  const handleClickEquipo = (equipo) => {
    if (stateNombre === "componentes") {
      setState((prev) => [...prev, { cantidad: 0, equipo }]);
    } else if (stateNombre === "inventario") {
      setState(equipo);
    }
  };

  return (
    <ContextEquipoList.Provider
      value={{ noCompuesto: noCompuesto, handleClickEquipo: handleClickEquipo }}
    >
      <EquipoList {...props} />
    </ContextEquipoList.Provider>
  );
};

export default withEquipoList;
