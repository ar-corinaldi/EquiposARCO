import React from "react";

function EquipoRow(props) {
  return (
    <React.Fragment>
      <tr>
        {Object.keys(props.equipo).map((campo, index) => (
          <td key={props.equipo._id + "-row-" + (index + 1)}>
            {props.equipo[campo]}
          </td>
        ))}
      </tr>
    </React.Fragment>
  );
}

export default EquipoRow;
