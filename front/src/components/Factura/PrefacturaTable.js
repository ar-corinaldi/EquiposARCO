import React from "react";

function PrefacturaTable(props) {
  const { equipo, prefactura, mes, anio } = props;
  const equipoPrefactura = () => {
    let prev = 0,
      prevDay = -1;
    let render = [];
    for (let i = 0; i < prefactura.length; i++) {
      let current = prefactura[i];
      if (prev !== current) {
        if (prev !== 0) {
          const date = `${prevDay + 1}/${mes}/${anio} - ${i}/${mes}/${anio}`;
          render.push(
            <tr key={date}>
              <td>{equipo.nombreEquipo}</td>
              <td>{prev}</td>
              <td>{date}</td>
              <td>{i - (prevDay + 1) + 1}</td>
            </tr>
          );
        }
        prevDay = i;
      }

      prev = current;
    }
    const lastIndex = prefactura.length;
    const date = `${prevDay + 1}/${mes}/${anio} - ${
      prefactura.length
    }/${mes}/${anio}`;
    render.push(
      <tr key={date}>
        <td>{equipo.nombreEquipo}</td>
        <td>{prefactura[lastIndex - 1]}</td>
        <td>{date}</td>
        <td>{prefactura.length - (prevDay + 1) + 1}</td>
      </tr>
    );
    return render;
  };

  return <React.Fragment>{equipoPrefactura()}</React.Fragment>;
}

export default PrefacturaTable;
