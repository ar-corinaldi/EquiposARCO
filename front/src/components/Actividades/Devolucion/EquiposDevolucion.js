import React from "react";

function EquiposDevolucion(props) {
  const equiposEnDevolucion = props.equiposEnDevolucion;

  const calcularPeso = (equipo) => {
    let peso;
    equipo.equipoID.propiedades.forEach((propiedad) => {
      if (propiedad.nombre === "peso") {
        peso = propiedad.valor;
      }
    });
    return peso;
  };

  return (
    <table className="table-width">
      <thead className="thead-light">
        <tr>
          <th>Equipo</th>
          <th>Familia</th>
          <th>Peso</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {equiposEnDevolucion &&
          equiposEnDevolucion.map((equipo, index) => (
            <tr key={equipo.equipoID._id} className="capitalize">
              <td>
                <b>{equipo.equipoID.nombreEquipo}</b>
                <br />
                {equipo.equipoID.tipoEquipo}
              </td>
              <td>{equipo.equipoID.nombreFamilia}</td>
              <td>{calcularPeso(equipo)}</td>
              <td>{equipo.cantidad}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default EquiposDevolucion;
