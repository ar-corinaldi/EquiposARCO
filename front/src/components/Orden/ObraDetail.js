import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetchAPI from "../../hooks/useFetchAPI";
import Container from "react-bootstrap/Container";
import FacturaDetailProps from "../Factura/FacturaDetailProps";
import InfoFactura from "../Factura/InfoFactura";
import FacturaObraList from "../Factura/FacturaObraList";
import FacturaFechas from "../Factura/FacturaFechas";

function ObraDetail(props) {
  const { idObra } = useParams();
  const { resource, loading, notFound } = useFetchAPI(
    `/ordenes/groupBy/${idObra}`
  );

  let ordenes = resource && resource.ordenes;
  let fecha = resource && new Date(resource.fecha);

  const [fechaCorte, setFechaCorte] = useState(new Date());
  const [fechaPago, setFechaPago] = useState(new Date());
  const [fechaInicial, setFechaInicial] = useState(new Date());

  useEffect(() => {
    fecha = resource && new Date(resource.fecha);
    ordenes = resource && resource.ordenes;
    setFechaInicial(fecha);
  }, [resource]);

  useEffect(() => {
    console.log("Inicial", fechaInicial);
    console.log("Corte", fechaCorte);
  }, [fechaInicial, fechaCorte]);

  ordenes = (ordenes && ordenes.length > 0 && ordenes) || [];
  const bodega = ordenes.length > 0 && ordenes[0].bodega;
  const tercero = bodega && bodega.duenio;
  if (loading) {
    return loading;
  }

  if (!ordenes || ordenes.length === 0) {
    return notFound("No se encontro la obra con este id");
  }

  return (
    <Container fluid>
      <InfoFactura tercero={tercero} bodega={bodega} ordenes={ordenes} />
      <FacturaObraList
        idObra={idObra}
        fechaInicial={[fechaInicial, setFechaInicial]}
        fechaCorte={[fechaCorte, setFechaCorte]}
      />
      <FacturaFechas
        fechaCorte={[fechaCorte, setFechaCorte]}
        fechaInicial={[fechaInicial, setFechaInicial]}
      />
      <FacturaDetailProps
        tercero={tercero}
        bodega={bodega}
        idObra={idObra}
        ordenes={ordenes || []}
        fechaCorte={[fechaCorte, setFechaCorte]}
        fechaInicial={[fechaInicial, setFechaInicial]}
        fechaPago={[fechaPago, setFechaPago]}
        fechaPrimeraOrden={resource && new Date(resource.fecha)}
      />
    </Container>
  );
}

export default ObraDetail;
