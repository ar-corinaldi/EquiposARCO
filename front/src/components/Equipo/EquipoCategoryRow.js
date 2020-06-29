import React from "react";

function EquipoCategoryRow(props) {
  return (
    <React.Fragment>
      <thead>
        <tr>
          <td>{props.equipoCategoria.categoria}</td>
        </tr>
      </thead>
      <thead>
        <tr>
          {Object.keys(props.equipoCategoria).map((campo, index) => (
            <React.Fragment
              key={
                props.equipoCategoria._id + "-campo_categoria-" + (index + 1)
              }
            >
              <td>{campo}</td>
            </React.Fragment>
          ))}
        </tr>
      </thead>
    </React.Fragment>
  );
}

export default EquipoCategoryRow;
