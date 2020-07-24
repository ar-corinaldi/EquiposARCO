import React from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function FacturaPrecio(props) {
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setIva(value);
  };

  const { precioTotal, facturar } = props;
  const [iva, setIva] = props.iva;

  return (
    <Row>
      <div id="info-wrapper">
        <Row>
          <Col className="col-2">
            <strong id="titulos">Subtotal: </strong>
          </Col>
          <Col>
            <p>
              <strong>{formatoPrecios(precioTotal)}</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="col-2">
            <strong id="titulos">IVA: </strong>
          </Col>
          <Col>
            <p>
              <strong>
                <input
                  placeholder={19}
                  value={iva}
                  onChange={handleChange}
                  style={{ width: "30px" }}
                />
                %
              </strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="col-2">
            <strong id="titulos">Total:</strong>
          </Col>
          <Col>
            <p>
              <strong>{formatoPrecios(precioTotal * (1 + iva / 100))}</strong>
            </p>
          </Col>
        </Row>
        <button className="buttonEquipo" onClick={facturar}>
          Facturar
        </button>
      </div>
    </Row>
  );
}

export default FacturaPrecio;
