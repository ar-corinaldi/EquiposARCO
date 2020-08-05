import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DevolucionForm from "./DevolucionForm";
import "./Devolucion.css";
import { calcularDisponiblesDevolucion } from "../CalcularEquipos";
import Modal from "./Modal";
import CrearNotaInventario from "./CrearNotaInventario";

function DevolucionCreate(props) {
  const { id, idB, idOr } = useParams();

  const [orden, setOrden] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [vehiculos, setVehiculos] = useState({});
  const [conductores, setConductores] = useState({});
  const [show, setShow] = useState(false);
  const [equipoNota, setEquipoNota] = useState({});

  useEffect(() => {
    fetchOrden();
    fetchVehiculos();
    fetchConductores();
  }, []);

  const fetchOrden = async () => {
    let res = await fetch(`/ordenes/${idOr}`);
    const ordenA = await res.json();
    //console.log("orden", ordenA);
    setOrden(ordenA);
    equiposOrden(ordenA);
  };

  const equiposOrden = (orden) => {
    // const equiposO = [];
    // orden.tarifasDefinitivas.forEach((tarifa) => {
    //   const equipo = tarifa.tarifasPorEquipo[0].equipo;
    //   equiposO.push(equipo);
    // });
    const equiposO = calcularDisponiblesDevolucion(orden);
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

  const formAction = `/ordenes/${idOr}/devoluciones`;

  const fields = {
    fechaSalida: "",
    fechaLlegada: "",
    costoTransporte: 0,
    asumidoTercero: "",
    vehiculoTransportador: "",
    conductor: "",
    orden: "",
    equiposEnDevolucion: [],
  };

  const formActionNota = `/notasInventario`;

  const fieldsNota = {
    categoria: "daño",
    descripcion: "",
    cantidad: 0,
    equipo: equipoNota._id,
    orden: idOr,
  };
  const hideModal = () => {
    setShow(false);
  };

  return (
    <div className="remision-registrar-wrapper">
      <Modal
        orden={orden}
        show={[show, setShow]}
        handleClose={hideModal}
        equipoNota={[equipoNota, setEquipoNota]}
        fields={fieldsNota}
        formAction={formActionNota}
      >
        <CrearNotaInventario></CrearNotaInventario>
      </Modal>
      <DevolucionForm
        equipos={[equipos, setEquipos]}
        conductores={[conductores, setConductores]}
        vehiculos={[vehiculos, setVehiculos]}
        fields={fields}
        formAction={formAction}
        idT={id}
        idB={idB}
        idOr={idOr}
        show={[show, setShow]}
        equipoNota={[equipoNota, setEquipoNota]}
      ></DevolucionForm>
    </div>
  );
}

export default DevolucionCreate;
