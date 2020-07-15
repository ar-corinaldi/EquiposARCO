import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RemisionForm from "./RemisionForm";
import "./Remision.css";

//const formAction = "/remision";
const fields = {};

function RemisionCreate(props) {
  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [vehiculos, setVehiculos] = useState({});
  const [empleados, setEmpleados] = useState({});

  useEffect(() => {
    fetchOrden();
    fetchVehiculos();
    fetchEmpleados();
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
    console.log("newVehiculos", newVehiculos);
    setVehiculos(newVehiculos);
  };

  const fetchEmpleados = async () => {
    let res = await fetch(`/empleados`);
    const newEmpleados = await res.json();
    console.log("newEmpleados", newEmpleados);
    setEmpleados(newEmpleados);
  };

  const fields = {
    fechaSalida: "",
    fechaLlegada: "",
    costoTrasporte: "",
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
        fields={fields}
      ></RemisionForm>
    </div>
  );
}

export default RemisionCreate;
