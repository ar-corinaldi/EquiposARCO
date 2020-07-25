import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function InfoFactura(props) {
  const { tercero, bodega, ordenes } = props;
  return (
    <Row>
      <Col className="col-6">
        <div id="info-wrapper">
          <h4 id="titulos">Información Tercero</h4>
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
            <strong>Celular : </strong>
            {tercero && tercero.celular}
          </p>
        </div>
      </Col>
      <Col className="col-6">
        <div id="info-wrapper">
          <h4 id="titulos">Información Bodega</h4>
          <div>
            <p>
              <strong>Nombre Bodega : </strong>
              {bodega ? (
                <Link to={`/terceros/${tercero._id}`}>
                  {bodega.nombreBodega}
                </Link>
              ) : null}
            </p>
          </div>
          <div>
            <p>
              <strong>Region : </strong>
              {bodega
                ? `${bodega.pais}/${bodega.departamento}/${bodega.municipio}`
                : null}
            </p>
          </div>
          <div>
            <p>
              <strong>Dirección : </strong>
              {bodega ? `${bodega.direccionBodega}` : null}
            </p>
          </div>
          <div>
            <p>
              <strong>Teléfono : </strong>
              {bodega ? bodega.telefono : null}
            </p>
          </div>
          <div className="d-inline">
            <p>
              <strong> Órdenes en curso : </strong>
              {ordenes.length > 0 ? (
                ordenes.map((orden, index) => (
                  <Link
                    key={orden._id}
                    to={
                      "/terceros/" +
                      tercero._id +
                      "/bodegas/" +
                      bodega._id +
                      "/ordenes/" +
                      orden._id
                    }
                  >
                    {orden.codigo}
                    {index !== ordenes.length - 1 ? " - " : ""}
                  </Link>
                ))
              ) : (
                <span className="d-inline">No hay ordenes en curso</span>
              )}
            </p>
          </div>
          <div className="d-inline">
            <p>
              <strong> Órdenes finalizadas : </strong>
              {bodega.ordenesPasadas.length > 0 ? (
                bodega.ordenesPasadas.map((orden, index) => (
                  <Link
                    to={
                      "/terceros/" +
                      tercero._id +
                      "/bodegas/" +
                      bodega._id +
                      "/ordenes/" +
                      orden._id
                    }
                  >
                    {orden.codigo}
                    {index !== ordenes.length - 1 ? " - " : ""}
                  </Link>
                ))
              ) : (
                <span className="d-inline">No hay ordenes finalizadas</span>
              )}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default InfoFactura;
