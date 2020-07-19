import React from "react";

function ContenidoPrefactura(props) {
  const { equipo, listaMes, mes, anio } = props;
  const equipoPrefactura = () => {
    let prev = 0,
      prevDay = -1;
    let render = [];
    for (let i = 0; i < listaMes.length; i++) {
      let current = listaMes[i];
      if (prev !== current) {
        if (prev !== 0) {
          const date = `${prevDay + 1}/${mes}/${anio} - ${i}/${mes}/${anio}`;
          render.push(
            <tr key={date}>
              <td>{equipo && equipo.nombreEquipo}</td>
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
    const lastIndex = listaMes.length;
    const date = `${prevDay + 1}/${mes}/${anio} - ${
      listaMes.length
    }/${mes}/${anio}`;
    if (prev !== 0) {
      render.push(
        <tr key={date}>
          <td>{equipo && equipo.nombreEquipo}</td>
          <td>{listaMes[lastIndex - 1]}</td>
          <td>{date}</td>
          <td>{listaMes.length - (prevDay + 1) + 1}</td>
        </tr>
      );
    }
    return render;
  };

  return <React.Fragment>{equipoPrefactura()}</React.Fragment>;
}

export default ContenidoPrefactura;
