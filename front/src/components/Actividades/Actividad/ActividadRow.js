import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import formatoFechas, { formatoHora } from "../../utils/FormatoFechas";

function ActividadRow(props) {
  const { id, idB, idOr } = useParams();
  const actividad = props.actividad.actividades;

  const calcularCantidad = (actividad) => {
    if (!actividad) {
      return 0;
    }
    let cantidad = 0;
    if (actividad.codigo.includes("R")) {
      actividad.equiposEnRemision.forEach((equipo) => {
        cantidad += equipo.cantidad;
      });
    } else {
      actividad.equiposEnDevolucion.forEach((equipo) => {
        cantidad += equipo.cantidad;
      });
    }
    return cantidad;
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          {actividad.codigo.includes("R") ? (
            <Link
              to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/remisiones/${actividad._id}`}
            >
              {actividad.codigo}
            </Link>
          ) : (
            <Link
              to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/devoluciones/${actividad._id}`}
            >
              {actividad.codigo}
            </Link>
          )}
        </td>
        <td>
          {formatoFechas(actividad.fechaSalida) +
            " " +
            formatoHora(actividad.fechaSalida)}
        </td>
        <td>
          {formatoFechas(actividad.fechaLlegada) +
            " " +
            formatoHora(actividad.fechaLlegada)}
        </td>
        <td>{calcularCantidad(actividad)}</td>
        <td>{actividad.asumidoTercero ? "Tercero" : "EquiposARCO"}</td>
      </tr>
    </React.Fragment>
  );
}

export default ActividadRow;
