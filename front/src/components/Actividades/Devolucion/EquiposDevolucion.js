import React from "react";
import { Link } from "react-router-dom";
import {
  calcularPesoTotal,
  calcularCantidadTotal,
} from "../CalcularTransporte";

function EquiposDevolucion(props) {
  const devolucion = props.devolucion;
  const equiposEnDevolucion = devolucion && devolucion.equiposEnDevolucion;
  const pesoTotal = calcularPesoTotal(devolucion);
  const cantidadTotal = calcularCantidadTotal(devolucion);

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
                <Link to={`/inventario/equipos/${equipo.equipoID._id}`}>
                  <b>{equipo.equipoID.nombreEquipo}</b>
                  <br />
                  {equipo.equipoID.tipoEquipo}
                </Link>
              </td>
              <td>{equipo.equipoID.nombreFamilia}</td>
              <td>{equipo.equipoID.peso}</td>
              <td>{equipo.cantidad}</td>
            </tr>
          ))}
      </tbody>
      <tbody className="borderUp">
        <tr>
          <td>Total:</td>
          <td></td>
          <td>{pesoTotal}</td>
          <td>{cantidadTotal}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EquiposDevolucion;
