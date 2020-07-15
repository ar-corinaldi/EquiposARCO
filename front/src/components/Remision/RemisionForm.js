import React from "react";
import withFormHandling from "../withFormHandling";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EscogerEquipos from "./EscogerEquipos";
import EquipoDetail from "./EquipoDetail";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/es";
import Escoger from "./Escoger";

function RemisionForm(props) {
  const [remision, setRemision] = useState(undefined);
  const [asumidoTercero, setAsumidoTercero] = useState(true);
  const [equipos, setEquipos] = props.equipos;
  const [equiposSels, setEquiposSels] = useState([]);
  const [conductores, setConductores] = props.conductores;
  const [conductorSelected, setConductorSelected] = useState({});
  const [vehiculos, setVehiculos] = props.vehiculos;
  const [vehiculoSelected, setVehiculoSelected] = useState({});
  const [selectedDate, handleDateChange] = useState(new Date());

  const { fields, handleChange, handleSubmitPOST, idT, idB, idOr } = props;
  //console.log("equipos", equipos);

  const history = useHistory();

  useEffect(() => {
    mostrarOrden();
  }, [remision]);

  useEffect(() => {
    handleChangeEquipos();
  }, [equiposSels]);

  useEffect(() => {
    handleChangeVehiculo();
  }, [vehiculoSelected]);

  useEffect(() => {
    handleChangeConductor();
  }, [conductorSelected]);

  const mostrarOrden = () => {
    //console.log("bodega", bodega);
    if (remision) {
      history.replace(`/terceros/${idT}/bodegas/${idB}/ordenes/${idOr}`);
    }
  };

  const jsonConsola = (e) => {
    e.preventDefault();
    handleEquiposRemision();
    console.log(fields);
  };

  const handleRadio = (event) => {
    const asumidoTerceroP = event.currentTarget.value === "true" ? true : false;
    //console.log("handle", asumidoTerceroP);
    setAsumidoTercero(asumidoTerceroP);
    fields.asumidoTercero = asumidoTerceroP;
  };

  const handleChangeEquipos = () => {
    fields.equiposEnRemision = equiposSels;
  };

  const handleChangeVehiculo = () => {
    fields.vehiculoTransportador = vehiculoSelected._id;
  };

  const handleChangeConductor = () => {
    fields.conductor = conductorSelected._id;
  };

  const eliminarEquipoSelect = (equipo) => {
    console.log("equiposSels", equiposSels);
    console.log("indice", equiposSels.indexOf(equipo));
    setEquiposSels(equiposSels.splice(equiposSels.indexOf(equipo), 1));
    console.log(equiposSels);
  };

  const handleEquiposRemision = () => {
    const equiposEnRemision = [];
    equiposSels.forEach((equipoSel) => {
      const equipo = {
        cantidad: equipoSel.cantidad,
        equipoID: equipoSel.equipoID._id,
      };
      equiposEnRemision.push(equipo);
    });
    fields.equiposEnRemision = equiposEnRemision;
  };
  return (
    <div className="remision-registrar-card">
      <form
        onSubmit={jsonConsola}
        // onSubmit={(e) =>
        //   handleSubmitPOST(e).then((value) => setRemision(value))
        // }
      >
        <h4 className="titulo">Registrar una remisión</h4>
        <label>Fecha y hora de salida : </label>{" "}
        <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
          <DateTimePicker
            value={selectedDate}
            disablePast
            onChange={handleDateChange}
            showTodayButton
            cancelLabel="Cancelar"
            todayLabel="Hoy"
          ></DateTimePicker>
        </MuiPickersUtilsProvider>
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
              <table className="table-width">
                <thead className="thead-light">
                  <tr>
                    <th>Equipo</th>
                    <th>Cantidad</th>
                    <th className="w50"></th>
                  </tr>
                </thead>
                <tbody>
                  {equiposSels &&
                    equiposSels.map((equipoRender, index) => (
                      <EquipoDetail
                        key={index}
                        equipoRender={equipoRender}
                        equiposSels={[equiposSels, setEquiposSels]}
                        eliminarEquipoSelect={eliminarEquipoSelect}
                      ></EquipoDetail>
                    ))}
                </tbody>
              </table>
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
        ]}
        <div id="button-wrapper">
          <button type="submit" className="buttonTercero">
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}

export default withFormHandling(RemisionForm);
