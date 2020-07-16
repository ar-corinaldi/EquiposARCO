import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FacturaOrdenDetail from "./FacturaOrdenDetail";
import Toast from "../Toast";

function FacturaDetail() {
  const [factura, setFactura] = useState({});
  const [loading, setLoading] = useState(true);

  let { idFactura } = useParams();

  useEffect(() => {
    fetchFacturaDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFacturaDetail = async () => {
    try {
      const url = `/facturas/${idFactura}`;
      const res = await fetch(url);
      const newFactura = await res.json();

      if (!res.ok) {
        setFactura(undefined);
        Toast(["No existe la factura buscada"], true, 404);
      } else {
        setFactura(newFactura);
      }
    } catch (e) {
      setFactura(undefined);
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
  if (!factura) {
    return <div>No se encontro factura con este id</div>;
  }

  if (factura.ordenes && factura.ordenes.length === 0) {
    return <div>No se encontraron ordenes asociadas a la factura</div>;
  }

  return (
    <div>
      {factura.ordenes &&
        factura.ordenes.map((orden) => (
          <FacturaOrdenDetail key={orden._id} ordenNoDetail={orden} />
        ))}
    </div>
  );
}

export default FacturaDetail;
