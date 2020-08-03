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
import { calcularPrecioTransporte } from "../CalcularTransporte";

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
  const [pesoTotal, setPesoTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [costoTransporte, setCostoTransporte] = useState(0);
  const [costoEstimado, setCostoEstimado] = useState(0);
  const [calculoTransp, setCalculoTransp] = useState("peso");

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

  useEffect(() => {
    calcularPesoTot();
    calcularCantTot();
  }, [equiposSels]);

  useEffect(() => {
    calcularTransporte();
  }, [asumidoTercero]);

  useEffect(() => {
    estimarTrasnporte();
  }, [pesoTotal]);

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
    fields.costoTransporte = costoTransporte;
    handleEquiposDevolucion();
    //   console.log(fields);
    if (fields.equiposEnDevolucion.length === 0) {
      return Toast(["Debe escogerse al menos un equipo"], true, 500);
    }
    if (!fields.asumidoTercero) {
      if (!fields.vehiculoTransportador) {
        return Toast(
          [
            "Si el transporte no lo asume el tercero, debe escogerse un vehiculo",
          ],
          true,
          500
        );
      }
      if (!fields.conductor) {
        return Toast(
          [
            "Si el transporte no lo asume el tercero, debe escogerse un conductor",
          ],
          true,
          500
        );
      }
    }
    handleSubmitPOST(e)
      .then((value) => {
        setDevolucion(value);
        manejarInventario();
      })
      .catch((error) => console.log("error", error));
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

  /**
   * Manejar la cantidad en inventario
   * @param {} equipoR
   */
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

  const calcularPesoTot = () => {
    let pesoTot = 0;
    // console.log(equiposSels);
    equiposSels.forEach((equipo) => {
      pesoTot += equipo.equipoID.peso * equipo.cantidad;
    });
    // console.log("pesoTot", pesoTot);
    setPesoTotal(pesoTot);
    return pesoTot;
  };

  const calcularCantTot = () => {
    let cantTot = 0;
    // console.log(equiposSels);
    equiposSels.forEach((equipo) => {
      cantTot += +equipo.cantidad;
    });
    // console.log("cantTot", cantTot);
    setCantidadTotal(cantTot);
  };

  /**
   * Sugerir un valor cuando se quiere cobrar el transporte
   */
  const calcularTransporte = () => {
    if (!asumidoTercero) {
      fields.costoTransporte = calcularPrecioTransporte("peso", pesoTotal);
    } else {
      fields.costoTransporte = 0;
    }
    setCostoTransporte(fields.costoTransporte);
  };

  /**
   * Manejar el cambio del campo costo trasnporte
   * @param {} e
   */
  const handleCostoTrasnporte = (e) => {
    const newCosto = e.target.value;
    setCostoTransporte(newCosto);
    fields.costoTransporte = newCosto;
    //console.log(newCosto);
  };

  /**
   * Tomar el tipo de transporte que se quiere mostrar
   * @param {} e
   */
  const handleCalculoTrasnporte = (e) => {
    const categoria = e.target.value;
    setCalculoTransp(categoria);
    setCostoEstimado(calcularPrecioTransporte(categoria, pesoTotal));
  };

  /**
   * Calcular el trasporte estiamdo y mostrarrlo
   */
  const estimarTrasnporte = () => {
    const newPrecio = calcularPrecioTransporte(calculoTransp, pesoTotal);
    //console.log(newPrecio);
    setCostoEstimado(newPrecio);
  };

  /**
   * Confirmar el costo estimado
   */
  const confirmarCosto = () => {
    setCostoTransporte(costoEstimado);
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
                pesoTotal={[pesoTotal, setPesoTotal]}
                cantidadTotal={[cantidadTotal, setCantidadTotal]}
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
          <div key="1">
            <Row>
              <Col xs={7}>
                <div className="form-group precio">
                  <Row className="titulo">
                    <b>COSTO TRANSPORTE</b>
                  </Row>
                  <div className="estimado">
                    <p className="mb-2">
                      <b>Estimar</b>
                    </p>
                    <Row className="margin0">
                      <p>Tipo: </p>
                      <label htmlFor="calculo">
                        <input
                          type="radio"
                          id="moto"
                          name="calculo"
                          onChange={handleCalculoTrasnporte}
                          checked={calculoTransp === "moto"}
                          value="moto"
                        />{" "}
                        Moto carga
                      </label>
                      <label htmlFor="calculo">
                        <input
                          type="radio"
                          id="liviana"
                          name="calculo"
                          onChange={handleCalculoTrasnporte}
                          checked={calculoTransp === "liviana"}
                          value="liviana"
                        />{" "}
                        Maquinaria Liviana
                      </label>
                      <label htmlFor="calculo">
                        <input
                          type="radio"
                          id="pesada"
                          name="calculo"
                          onChange={handleCalculoTrasnporte}
                          checked={calculoTransp === "pesada"}
                          value="pesada"
                        />{" "}
                        Maquinaria Pesada
                      </label>
                      <label htmlFor="calculo">
                        <input
                          type="radio"
                          id="peso"
                          name="calculo"
                          onChange={handleCalculoTrasnporte}
                          checked={calculoTransp === "peso"}
                          value="peso"
                        />{" "}
                        Por peso
                      </label>
                    </Row>
                    <Row className="vert-center">
                      <Col>
                        <p>Costo estimado: {formatoPrecios(costoEstimado)}</p>
                      </Col>
                      <Col md="auto">
                        <button
                          type="button"
                          className="buttonPrecio"
                          onClick={confirmarCosto}
                        >
                          Confirmar costo
                        </button>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-3 mb-2">
                    <label htmlFor="costoTransporte">Costo definitivo :</label>
                    <input
                      name="costoTransporte"
                      type="number"
                      value={costoTransporte}
                      onChange={handleCostoTrasnporte}
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <Row>
                    <Col md="auto" className="vertical-center">
                      <label htmlFor="vehiculoTransportador">
                        {" "}
                        Vehiculo :{" "}
                      </label>
                    </Col>
                    <Col>
                      <Escoger
                        nombre={"Vehículo"}
                        nombre_plural={"vehículos"}
                        camposBuscar={["placa", "marca", "modelo", "color"]}
                        campos={["marca", "modelo", "placa"]}
                        elementoSelected={[
                          vehiculoSelected,
                          setVehiculoSelected,
                        ]}
                        elementos={vehiculos}
                      ></Escoger>
                    </Col>
                  </Row>
                </div>
                <div className="form-group">
                  <Row>
                    <Col md="auto" className="vertical-center">
                      <label htmlFor="conductor"> Conductor : </label>
                    </Col>
                    <Col>
                      <Escoger
                        nombre={"Conductor"}
                        nombre_plural={"conductores"}
                        camposBuscar={[
                          "nombres",
                          "apellidos",
                          "numeroDocumento",
                        ]}
                        campos={["nombres", "apellidos", "numeroDocumento"]}
                        elementoSelected={[
                          conductorSelected,
                          setConductorSelected,
                        ]}
                        elementos={conductores}
                      ></Escoger>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
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
