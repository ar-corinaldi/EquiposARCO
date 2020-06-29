import React, { useState, useEffect } from "react";
import EquipoCategoryRow from "./EquipoCategoryRow";
import EquipoRow from "./EquipoRow";

function EquipoTable(props) {
  const [equiposCategorias, setEquiposCategorias] = useState([]);
  useEffect(() => {
    console.log("entra", props.filterText);
    // setEquiposCategorias([]);
    // cargarCategorias();
  }, [props.filterText]);

  const cargarCategorias = () => {
    let ultimaCategoria = null;
    props.equipos.forEach((equipo, index) => {
      if (
        props.filterText &&
        equipo.categoria
          .toUpperCase()
          .indexOf(props.filterText.toUpperCase()) === -1
      ) {
        return;
      }
      if (equipo.categoria !== ultimaCategoria) {
        console.log(equipo.categoria);
        setEquiposCategorias((prev) => [...prev, equipo]);
      }
      ultimaCategoria = equipo.categoria;
    });
  };

  const renderRow = (categoria) => {
    const byCategory = props.equipos.filter(
      (equipo, index) => categoria === equipo.categoria
    );

    return byCategory.map((equipo) => (
      <EquipoRow key={equipo._id} equipo={equipo} />
    ));
  };

  return (
    <div className="table-equipo">
      <table className="table">
        {/* {equiposCategorias.map((equipoCategoria, index) => (
          <React.Fragment
            key={equipoCategoria._id + "-categoria-" + (index + 1)}
          >
            { <EquipoCategoryRow
              equipos={props.equipos}
              equipoCategoria={equipoCategoria}
            /> }
          </React.Fragment>
        ))} */}
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Tipo Equipo</td>
            <td>Codigo</td>
          </tr>
        </thead>
        <tbody>
          {props.equipos.map((equipo) => (
            <EquipoRow key={equipo._id} equipo={equipo} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipoTable;
