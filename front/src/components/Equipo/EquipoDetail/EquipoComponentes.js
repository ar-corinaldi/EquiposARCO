import React from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

function EquipoComponentes(props) {
  return (
    <Col>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {props.componentes &&
            props.componentes.map((componente) => {
              if (componente.equipoID === null) {
                return null;
              }
              return (
                <tr key={componente._id}>
                  <td>{componente.equipoID.nombreEquipo || "No existe"}</td>
                  <td>{componente.cantidad}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Col>
  );
}

export default EquipoComponentes;
