import React from "react";
import { Link } from "react-router-dom";

function EquiposRemision(props) {
  const equiposEnRemision = props.equiposEnRemision;

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
        {equiposEnRemision &&
          equiposEnRemision.map((equipo, index) => (
            <tr key={equipo.equipoID._id} className="capitalize">
              <td>
                <Link to={`/inventario/equipos/${equipo.equipoID._id}`}>
                  <b>{equipo.equipoID.nombreEquipo}</b>
                  <br />
                  {equipo.equipoID.tipoEquipo}
                </Link>
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

export default EquiposRemision;
