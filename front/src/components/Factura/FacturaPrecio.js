import React from "react";
import formatoPrecios from "../utils/FormatoPrecios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
function FacturaPrecio(props) {
  const { precioTotal, facturar } = props;
  const [iva, setIva] = props.iva;
  const [canFacturar, setCanFacturar] = props.canFacturar;

  useEffect(() => {
    setCanFacturar(iva >= 0 && precioTotal >= 0);
  }, [iva, precioTotal]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setIva(value);
  };

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
                  disabled
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
        <button
          className="buttonAction"
          onClick={facturar}
          disabled={!canFacturar}
        >
          Facturar
        </button>
      </div>
    </Row>
  );
}

export default FacturaPrecio;
