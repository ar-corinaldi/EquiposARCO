import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import formatoFechas from "../../utils/FormatoFechas";

function OrdenRow(props) {
  const { url } = useRouteMatch();
  const orden = props.orden;
  const bodega = orden && orden.bodega;
  const idBodega = bodega && bodega._id;
  const tercero = bodega && bodega.duenio;
  const idTercero = tercero && tercero._id;

  return (
    <React.Fragment>
      <tr>
        <td>
          <Link
            to={
              "/terceros/" +
              idTercero +
              "/bodegas/" +
              idBodega +
              "/ordenes/" +
              orden._id
            }
          >
            {orden.codigo}
          </Link>
        </td>
        <td className="capitalize">
          <Link to={"/terceros/" + idTercero}>{tercero && tercero.nombre}</Link>
        </td>
        <td className="capitalize">{bodega && bodega.nombreBodega}</td>
        <td>
          <Link
            to={
              "/terceros/" +
              idTercero +
              "/bodegas/" +
              idBodega +
              "/obras/" +
              orden.codigoObra
            }
          >
            {orden.codigoObra}
          </Link>
        </td>
        <td>{!orden.fechaFin ? "En curso" : "Finalizada"}</td>
        <td>{formatoFechas(orden.fechaInicio)}</td>
        <td>{orden.fechaFin ? formatoFechas(orden.fechaFin) : "N/A"}</td>
      </tr>
    </React.Fragment>
  );
}

export default OrdenRow;
