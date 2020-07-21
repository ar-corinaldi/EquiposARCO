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
          const date = `${prevDay + 1}/${mes}/${anio} - ${
            i + 1
          }/${mes}/${anio}`;
          const facturado = i - (prevDay + 1) + 1;
          const cantidad = prev;
          render.push(
            <tr key={date}>
              <td>{equipo && equipo.nombreEquipo}</td>
              <td>{cantidad}</td>
              <td>{date}</td>
              <td>{facturado}</td>
              <td>{equipo.precio}</td>
              <td>{equipo.precio * facturado * cantidad}</td>
            </tr>
          );
        }
        prevDay = i;
      }

      prev = current;
    }
    const lastIndex = listaMes.length;
    const cantidad = listaMes[lastIndex - 1];
    const date = `${prevDay + 1}/${mes}/${anio} - ${
      listaMes.length
    }/${mes}/${anio}`;
    const facturado = listaMes.length - (prevDay + 1) + 1;
    if (prev !== 0) {
      render.push(
        <tr key={date}>
          <td>{equipo && equipo.nombreEquipo}</td>
          <td>{cantidad}</td>
          <td>{date}</td>
          <td>{facturado}</td>
          <td>{equipo.precio}</td>
          <td>{equipo.precio * facturado * cantidad}</td>
        </tr>
      );
    }
    return render;
  };

  return <React.Fragment>{equipoPrefactura()}</React.Fragment>;
}

export default ContenidoPrefactura;
