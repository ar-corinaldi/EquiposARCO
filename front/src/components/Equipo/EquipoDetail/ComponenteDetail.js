import React from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

function ComponenteDetail(props) {
  if (!props.componentes || props.componentes.length === 0) {
    return <h5 className="m-4">No se compone de ningun equipo</h5>;
  }
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

export default ComponenteDetail;
