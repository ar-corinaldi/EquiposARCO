import React from "react";
import EquipoRow from "./EquipoRow";
import formatoPrecios from "../utils/FormatoPrecios";
import calcularTarifaCotizacion from "../utils/CacularTarifas";

function EquiposTable(props) {
  const cotizacion = props.cotizacion;
  const tarifas = props.cotizacion.tarifasCotizadas;
  console.log("tarifas", tarifas);
  const calculosTarifas = calcularTarifaCotizacion(tarifas);
  console.log("calculosTarifas", calculosTarifas);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Tipo de Cobro</th>
            <th>Valor</th>
            <th>Tiempo estimado</th>
            <th>Periodo estimado</th>
            <th>Valor estimado</th>
          </tr>
        </thead>
        <tbody>
          {tarifas &&
            tarifas.map((tarifa, index) => (
              <EquipoRow
                key={tarifa._id}
                tarifa={tarifa}
                index={index}
                calculoTarifa={calculosTarifas && calculosTarifas[tarifa._id]}
              />
            ))}
        </tbody>
        <tbody>
          <tr>
            <td>
              <b>Total</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {calculosTarifas && formatoPrecios(calculosTarifas.cobroCompleto)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EquiposTable;
