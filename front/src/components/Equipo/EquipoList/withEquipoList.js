import React from "react";

export const ContextEquipoList = React.createContext(false);

const withEquipoList = (EquipoList, setState, stateNombre) => (props) => {
  const handleClickEquipo = (equipo) => {
    if (stateNombre === "componentes") {
      setState((prev) => [...prev, { cantidad: 0, equipo }]);
    } else if (stateNombre === "inventario") {
      setState(equipo);
    }
  };

  return (
    <ContextEquipoList.Provider value={handleClickEquipo}>
      <EquipoList {...props} />
    </ContextEquipoList.Provider>
  );
};

export default withEquipoList;
