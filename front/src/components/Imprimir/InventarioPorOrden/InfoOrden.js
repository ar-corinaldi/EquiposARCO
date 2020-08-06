import React from "react";
import TarifaRow from "./TarifaRow";

function InfoOrden(props) {
  const orden = props.orden;
  const tarifas = orden && orden.tarifasDefinitivas;
  return (
    <div className="orden-wrapper" id="orden-equipos-wrapper">
      <h4 className="page-title-orden">Inventario Orden {orden.codigo}</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Cantidad</th>
              <th>Valor</th>
              <th>Tipo de Cobro</th>
              <th>Periodo Cobro</th>
            </tr>
          </thead>
          <tbody>
            {tarifas &&
              tarifas.map((tarifaAgrupada, index) => (
                <TarifaRow
                  key={index}
                  tarifasPorEquipo={tarifaAgrupada.tarifasPorEquipo}
                  index={index}
                  opcion={1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoOrden;
