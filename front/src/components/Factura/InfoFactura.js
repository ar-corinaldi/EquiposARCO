import React from "react";
import formatoFechas from "../utils/FormatoFechas";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

function InfoFactura(props) {
  const { tercero, bodega, fechaInicial, fechaActual } = props;
  return (
    <React.Fragment>
      <Col>
        <div id="info-wrapper">
          <h4 id="titulos">Informacion Tercero</h4>
          <p>
            <strong>Nombre Tercero : </strong>
            {tercero ? (
              <Link to={`${tercero._id}`}>{tercero.nombre}</Link>
            ) : null}
          </p>
          <p>
            <strong>Tipo Documento : </strong>
            {tercero ? tercero.tipoDocumento : null}
          </p>
          <p>
            <strong>Numero Documento : </strong>
            {tercero ? tercero.numeroDocumento : null}
          </p>
          <p>
            <strong>Fecha Inicial - Fecha Final : </strong>
            {`${formatoFechas(fechaInicial)} - ${formatoFechas(fechaActual)}`}
          </p>
        </div>
      </Col>
      <Col>
        <div id="info-wrapper">
          <h4 id="titulos">Informacion Bodega</h4>
          <p>
            <strong>Nombre Bodega : </strong>
            {bodega ? (
              <Link to={`/bodegas/${bodega._id}`}>{bodega.nombreBodega}</Link>
            ) : null}
          </p>
          <p>
            <strong>Region : </strong>
            {bodega
              ? `${bodega.pais}/${bodega.departamento}/${bodega.municipio}`
              : null}
          </p>
          <p>
            <strong>Dirección : </strong>
            {bodega ? `${bodega.direccionBodega}` : null}
          </p>

          <p>
            <strong>Teléfono : </strong>
            {bodega ? bodega.telefono : null}
          </p>
        </div>
      </Col>
    </React.Fragment>
  );
}

export default InfoFactura;
