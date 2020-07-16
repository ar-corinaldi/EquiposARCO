import React, { useEffect, useState } from "react";
import OrdenRow from "../Orden/EquipoRow";
import Toast from "../Toast";
function FacturaOrdenDetail(props) {
  const { ordenNoDetail } = props;
  const [orden, setOrden] = useState(ordenNoDetail);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchInfoOrden();
  }, []);

  const fetchInfoOrden = async () => {
    try {
      let res = await fetch(`/ordenes/${orden._id}/tarifasPobladas`);
      const ordenFound = await res.json();
      if (!res.ok) {
        setOrden(undefined);
        Toast(["No se encontro la orden"], true, res.status);
      } else {
        setOrden({ ...ordenFound });
      }
    } catch (e) {
      setOrden(undefined);
      Toast(["Error del sistema"], true, 500);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!orden) {
    return <div>No se encontro la factura con orden</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Cantidad</th>
          <th>Valor</th>
          <th>Tipo de Cobro</th>
          <th>Periodo Cobro</th>
          <th>Status</th>
        </tr>
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
