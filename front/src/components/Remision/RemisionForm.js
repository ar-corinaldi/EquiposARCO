import React from "react";
import withFormHandling from "../withFormHandling";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EscogerEquipos from "./EscogerEquipos";
import EquipoDetail from "./EquipoDetail";

import "moment/locale/es";

function RemisionForm(props) {
  const [remision, setRemision] = useState(undefined);
  const [asumidoTercero, setAsumidoTercero] = useState(true);
  const [equipoSel, setEquipoSel] = useState({});
  const [equiposSels, setEquiposSels] = useState([]);
  const [equipos, setEquipos] = props.equipos;

  const { fields, handleChange, handleSubmitPOST, idT, idB, idOr } = props;
  console.log("equipos", equipos);

  const history = useHistory();

  useEffect(() => {
    mostrarOrden();
  }, [remision]);

  const mostrarOrden = () => {
    //console.log("bodega", bodega);
    if (remision) {
      history.replace(`/terceros/${idT}/bodegas/${idB}/ordenes/${idOr}`);
    }
  };

  const jsonConsola = (e) => {
    e.preventDefault();
    console.log(fields);
  };

  const handleRadio = (event) => {
    const asumidoTerceroP = event.currentTarget.value === "true" ? true : false;
    //console.log("handle", asumidoTerceroP);
    setAsumidoTercero(asumidoTerceroP);
    fields.asumidoTercero = asumidoTerceroP;
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
        <MuiPickersUtilsProvider locale="es" utils={MomentUtils}>
          <DateTimePicker
            value={fields.fechaSalida}
            disablePast
            //onChange={handleChange}
            label="Fecha y hora de salida"
            showTodayButton
            cancelLabel="Cancelar"
            todayLabel="Hoy"
          ></DateTimePicker>
        </MuiPickersUtilsProvider>
        <div className="form-group">
          <EscogerEquipos
            equipos={[equipos, setEquipos]}
            equipoSel={[equipoSel, setEquipoSel]}
            equiposSels={[equiposSels, setEquiposSels]}
          ></EscogerEquipos>
          {equiposSels &&
            equiposSels.map((equipoRender, index) => (
              <EquipoDetail
                key={index}
                equipoRender={equipoRender}
                equiposSels={[equiposSels, setEquiposSels]}
              ></EquipoDetail>
            ))}
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
            <label htmlFor="vehiculoTransportador"> Vehiculo : </label>
            <input
              name="vehiculoTransportador"
              type="text"
              value={fields.vehiculoTransportador}
              onChange={handleChange}
            />
          </div>,
          <div key="2" className="form-group">
            <label htmlFor="conductor"> Conductor : </label>
            <input
              name="conductor"
              type="text"
              value={fields.conductor}
              onChange={handleChange}
            />
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
