import React from "react";
import withFormHandling from "../../withFormHandling";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EscogerEquipos from "./EscogerEquipos";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import Escoger from "../../Escoger";
import EquipoTable from "./EquipoTable";
import formatoPrecios from "../../utils/FormatoPrecios";
import Toast from "../../Toast";

function DevolucionForm(props) {
  const [devolucion, setDevolucion] = useState(undefined);
  const [asumidoTercero, setAsumidoTercero] = useState(true);
  const [equipos, setEquipos] = props.equipos;
  const [equiposSels, setEquiposSels] = useState([]);
  const [conductores, setConductores] = props.conductores;
  const [conductorSelected, setConductorSelected] = useState({});
  const [vehiculos, setVehiculos] = props.vehiculos;
  const [vehiculoSelected, setVehiculoSelected] = useState({});
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [fechaLlegada, setFechaLlegada] = useState(new Date());

  const { fields, handleChange, handleSubmitPOST, idT, idB, idOr } = props;
  //console.log("equipos", equipos);

  const history = useHistory();

  useEffect(() => {
    mostrarOrden();
  }, [devolucion]);

  useEffect(() => {
    handleChangeVehiculo();
  }, [vehiculoSelected]);

  useEffect(() => {
    handleChangeConductor();
  }, [conductorSelected]);

  const mostrarOrden = () => {
    //console.log("bodega", bodega);
    if (devolucion) {
      history.replace(`/terceros/${idT}/bodegas/${idB}/ordenes/${idOr}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fields.fechaSalida = fechaSalida;
    fields.fechaLlegada = fechaLlegada;
    if (!fechasValidas(new Date(fechaLlegada), new Date(fechaSalida))) {
      return Toast(
        [
          "No se puede escoger una fecha de llegada anterior a la fecha de salida",
        ],
        true,
        500
      );
    }
    fields.asumidoTercero = asumidoTercero;
    handleEquiposDevolucion();
    console.log(fields);
    handleSubmitPOST(e).then((value) => setDevolucion(value));
    manejarInventario();
  };

  const fechasValidas = (fechaMayor, fechaMenor) =>
    fechaMayor.getTime() >= fechaMenor.getTime();

  const handleRadio = (event) => {
    const asumidoTerceroP = event.currentTarget.value === "true" ? true : false;
    //console.log("handle", asumidoTerceroP);
    setAsumidoTercero(asumidoTerceroP);
    fields.asumidoTercero = asumidoTerceroP;
  };

  const handleChangeVehiculo = () => {
    fields.vehiculoTransportador = vehiculoSelected._id;
  };

  const handleChangeConductor = () => {
    fields.conductor = conductorSelected._id;
  };

  const handleEquiposDevolucion = () => {
    const equiposEnDevolucion = [];
    equiposSels.forEach((equipoSel) => {
      const equipo = {
        cantidad: equipoSel.cantidad,
        equipoID: equipoSel.equipoID._id,
      };
      equiposEnDevolucion.push(equipo);
    });
    fields.equiposEnDevolucion = equiposEnDevolucion;
  };

  const manejarInventario = async () => {
    let equipoR;
    for (let i = 0; i < equiposSels.length; i++) {
      equipoR = equiposSels[i];
      await editarCantidadBodega(equipoR);
    }
  };

  const editarCantidadBodega = async (equipoR) => {
    const cantidadPrev = equipoR.equipoID.cantidadBodega;
    const cantidadNew = +cantidadPrev + +equipoR.cantidad;
    const field = { cantidadBodega: cantidadNew };
    const options = {
      method: "PATCH",
      body: JSON.stringify(field),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formAction = `/equipos/${equipoR.equipoID._id}`;
    const res = await fetch(formAction, options);
    const objeto = await res.json();
    console.log(objeto);
    return objeto;
  };

  return (
    <div className="devolucion-registrar-card">
      <form onSubmit={handleSubmit}>
        <h4 className="titulo">Registrar una devolución</h4>
        <Row>
          <Col>
            <label>Fecha y hora de salida : </label>{" "}
            <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
              <DateTimePicker
                value={fechaSalida}
                onChange={setFechaSalida}
                showTodayButton
                cancelLabel="Cancelar"
                todayLabel="Hoy"
              ></DateTimePicker>
            </MuiPickersUtilsProvider>
          </Col>
          <Col>
            <label>Fecha y hora de llegada : </label>{" "}
            <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
              <DateTimePicker
                value={fechaLlegada}
                onChange={setFechaLlegada}
                showTodayButton
                cancelLabel="Cancelar"
                todayLabel="Hoy"
              ></DateTimePicker>
            </MuiPickersUtilsProvider>
          </Col>
        </Row>

        <div className="form-group">
          <Row>
            <Col md="auto" className="vertical-center">
              <label>Equipos a trasportar : </label>
            </Col>
            <Col>
              <EscogerEquipos
                equipos={[equipos, setEquipos]}
                equiposSels={[equiposSels, setEquiposSels]}
              ></EscogerEquipos>
            </Col>
          </Row>
          <Row>
            <Col>
              <EquipoTable
                equiposSels={[equiposSels, setEquiposSels]}
              ></EquipoTable>
            </Col>
          </Row>
        </div>
        <div className="form-group">
          <label htmlFor="direccionBodega">
            ¿Quién se encarga del transporte?
          </label>
          <label htmlFor="asumidoTercero">
            <input
              type="radio"
              id="tercero"
              name="asumidoTercero"
              onChange={handleRadio}
              checked={asumidoTercero === true}
              value="true"
            />{" "}
            El Tercero
          </label>
          <label htmlFor="asumidoTercero">
            <input
              type="radio"
              id="equiposARCO"
              name="asumidoTercero"
              onChange={handleRadio}
              checked={asumidoTercero === false}
              value="false"
            />{" "}
            Equipos ARCO
          </label>
        </div>
        {!asumidoTercero && [
          <div key="1" className="form-group">
            <Row>
              <Col md="auto" className="vertical-center">
                <label htmlFor="vehiculoTransportador"> Vehiculo : </label>
              </Col>
              <Col>
                <Escoger
                  nombre={"Vehículo"}
                  nombre_plural={"vehículos"}
                  camposBuscar={["placa", "marca", "modelo", "color"]}
                  campos={["marca", "modelo", "placa"]}
                  elementoSelected={[vehiculoSelected, setVehiculoSelected]}
                  elementos={vehiculos}
                ></Escoger>
              </Col>
            </Row>
          </div>,
          <div key="2" className="form-group">
            <Row>
              <Col md="auto" className="vertical-center">
                <label htmlFor="conductor"> Conductor : </label>
              </Col>
              <Col>
                <Escoger
                  nombre={"Conductor"}
                  nombre_plural={"conductores"}
                  camposBuscar={["nombres", "apellidos", "numeroDocumento"]}
                  campos={["nombres", "apellidos", "numeroDocumento"]}
                  elementoSelected={[conductorSelected, setConductorSelected]}
                  elementos={conductores}
                ></Escoger>
              </Col>
            </Row>
          </div>,
          <div key="3" className="form-group">
            <label htmlFor="costoTransporte"> Costo : </label>
            <input
              name="costoTransporte"
              type="number"
              value={fields.costoTransporte}
              onChange={handleChange}
            />
          </div>,
        ]}
        <div className="button-crear">
          <button type="submit" className="buttonTercero">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default withFormHandling(DevolucionForm);
