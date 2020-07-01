import "./CrearOrden.css";
import React from "react";
import Row from "react-bootstrap/Row";
import Cl from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import priceLogo from '../../static-files/price.svg'
import priceLogoDark from '../../static-files/price-dark.svg'

function CrearOrden(props) {
  return (
    <div id="create-order-wrapper">
      <Row>
        <Col align='center' className='row-step' > 
        <button type="button" className='step-active step-button'>
            <img src= {priceLogo} className= 'step-logo' />
            <p className='step-button-name' >First Step</p  >
        </button>
        </Col>
        <Col align='center' className='row-step'> 
        <button type="button" className='step-pending step-button'>
            <p className='step-button-name'> Second Step</p>
        </button>
        </Col>
      </Row>
    </div>
  );
}

export default CrearOrden;
