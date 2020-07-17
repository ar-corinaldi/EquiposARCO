import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RemisionForm from "./RemisionForm";
import "./Remision.css";

function RemisionCreate(props) {
  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [vehiculos, setVehiculos] = useState({});
  const [conductores, setConductores] = useState({});

  useEffect(() => {
    fetchOrden();
    fetchVehiculos();
    fetchConductores();
  }, []);

  const fetchOrden = async () => {
    let res = await fetch(`/ordenes/${idOr}/tarifasPobladas`);
    const ordenA = await res.json();
    //console.log("orden", ordenA);
    setOrden(ordenA);
    equiposOrden(ordenA);
  };

  const equiposOrden = (orden) => {
    const equiposO = [];
    orden.tarifasDefinitivas.forEach((tarifa) => {
      const equipo = tarifa.tarifasPorEquipo[0].equipo;
      equiposO.push(equipo);
    });
    setEquipos(equiposO);
    //console.log("equipos", equiposO);
  };

  const fetchVehiculos = async () => {
    let res = await fetch(`/vehiculos`);
    const newVehiculos = await res.json();
    //console.log("newVehiculos", newVehiculos);
    setVehiculos(newVehiculos);
  };

  const fetchConductores = async () => {
    let res = await fetch(`/empleados/conductores`);
    const newConductores = await res.json();
    //console.log("newConductores", newConductores);
    setConductores(newConductores);
  };

  const formAction = `/ordenes/${idOr}/remisiones`;

  const fields = {
    fechaSalida: "",
    fechaLlegada: "",
    costoTransporte: "",
    asumidoTercero: "",
    vehiculoTransportador: "",
    conductor: "",
    orden: "",
    equiposEnRemision: [],
  };

  return (
    <div className="remision-registrar-wrapper">
      <RemisionForm
        equipos={[equipos, setEquipos]}
        conductores={[conductores, setConductores]}
        vehiculos={[vehiculos, setVehiculos]}
        fields={fields}
        formAction={formAction}
        idT={id}
        idB={idB}
        idOr={idOr}
      ></RemisionForm>
    </div>
  );
}

export default RemisionCreate;
