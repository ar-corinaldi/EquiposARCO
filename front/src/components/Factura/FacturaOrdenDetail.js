import React from "react";
import OrdenRow from "../Orden/EquipoRow";
import useAPIDetail from "../../hooks/useFetchAPI";

function FacturaOrdenDetail(props) {
  const { ordenNoDetail } = props;

  const url = `/ordenes/${ordenNoDetail._id}/tarifasPobladas`;
  const { resource, loading, notFound } = useAPIDetail(url);
  const orden = resource;

  if (!orden) {
    return notFound("No se encontro la factura con orden");
  }

  return (
    <table className="table">
      <thead>
        {!loading ? (
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Valor</th>
            <th>Tipo de Cobro</th>
            <th>Periodo Cobro</th>
            <th>Status</th>
          </tr>
        ) : null}
      </thead>
      <tbody>
        {!loading &&
          orden.tarifasDefinitivas &&
          orden.tarifasDefinitivas.map((tarifaAgrupada, index) => (
            <OrdenRow
              key={index}
              tarifasPorEquipo={tarifaAgrupada.tarifasPorEquipo}
              index={index}
            />
          ))}
      </tbody>
    </table>
  );
}

export default FacturaOrdenDetail;
