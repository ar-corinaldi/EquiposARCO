import React from "react";

export const ContextEquipoList = React.createContext(true);

const withEquipoList = (EquipoList, setState, stateNombre) => (props) => {
  const handleClickEquipo = (equipo) => {
    if (stateNombre === "componentes") {
      setState((prev) => [...prev, { cantidad: 0, equipo }]);
    } else if (stateNombre === "inventario") {
      setState((prevState) => ({
        ...prevState, // keep all other key-value pairs
        equipo, // update the value of specific key
      }));
    }
  };

  return (
    <ContextEquipoList.Provider value={handleClickEquipo}>
      <EquipoList {...props} />
    </ContextEquipoList.Provider>
  );
};

export default withEquipoList;
