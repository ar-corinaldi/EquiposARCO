import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import "./ActividadReciente.css";
import formatoFecha from "../utils/FormatoFechas";
import { formatoHora } from "../utils/FormatoFechas";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
TimeAgo.addLocale(es);
const timeAgo = new TimeAgo("es");
/**
 * Ordanar las actividades de mas reciente a menos. El criterio cambia en remisiones o devoluciones.
 * En remisiones es fecha salida, devoluciones fecha de llegada
 * @param {*} act1
 * @param {*} act2
 */
function compare(act1, act2) {
  const fe1 = act1.remision
    ? act1.remision.fechaSalida
    : act1.devolucion.fechaLlegada;
  const fe2 = act2.remision
    ? act2.remision.fechaSalida
    : act2.devolucion.fechaLlegada;
  const f1 = new Date(fe1);
  const f2 = new Date(fe2);
  if (f1.getTime() < f2.getTime()) {
    return 1;
  }
  if (f1.getTime() > f2.getTime()) {
    return -1;
  }
  // a debe ser igual b
  return 0;
}

function ActividadReciente(props) {
  const [actividad, setActividad] = useState([]);
  const { id, idB, idOr } = props;
  const orden = props.orden;

  useEffect(() => {
    fetchActividad();
  }, [orden]);

  const fetchActividad = () => {
    const remisiones = orden.remisiones;
    const devoluciones = orden.devoluciones;
    let newActividad = [];
    const newRemisiones = [];
    const newDevoluciones = [];

    if (remisiones && devoluciones) {
      remisiones.forEach((remision) => {
        const activity = { remision: remision };
        newRemisiones.push(activity);
      });
      devoluciones.forEach((devolucion) => {
        const activity = { devolucion: devolucion };
        newDevoluciones.push(activity);
      });
      newActividad = actividad.concat(newRemisiones, newDevoluciones);
      newActividad.sort(compare);
      setActividad(newActividad);
    }
    console.log("newActividad", newActividad);
  };

  return (
    <div className="timeline-alt pb-0">
      {actividad &&
        actividad.map((actividad, index) => {
          return actividad.remision ? (
            <div className="timeline-item" key={index} id="item">
              <span className="timeline-line" id="linea"></span>

              <FaTruck
                className="bg-info-lighten text-info timeline-icon"
                id="icono"
              ></FaTruck>

              <div className="timeline-item-info" id="info">
                <p className="text-info font-weight-bold mb-1 d-block">
                  <Link
                    to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/remisiones/${actividad.remision._id}`}
                  >
                    Se hizo una remision
                  </Link>
                </p>
                <small>
                  Remisión No.{" "}
                  <Link
                    to={`/terceros/${id}/bodegas/${idB}/ordenes/${idOr}/remisiones/${actividad.remision._id}`}
                  >
                    {actividad.remision.codigo}
                  </Link>
                </small>
                <p className="mb-0 pb-2">
                  <small className="text-muted">
                    {timeAgo.format(new Date(actividad.remision.fechaSalida))}
                    {/* {formatoFecha(actividad.remision.fechaSalida) +
                      " " +
                      formatoHora(actividad.remision.fechaSalida)} */}
                  </small>
                </p>
              </div>
            </div>
          ) : (
            <div className="timeline-item" key={index} id="item">
              <div className="timeline-line"></div>

              <FaTruck className="bg-info-lighten text-info timeline-icon devolucion"></FaTruck>

              <div className="timeline-item-info">
                <p className="text-info font-weight-bold mb-1 d-block">
                  <Link
                    to={
                      "/terceros/" +
                      id +
                      "/bodegas/" +
                      idB +
                      "/ordenes/" +
                      idOr +
                      "/devoluciones/" +
                      actividad.devolucion._id
                    }
                  >
                    Se hizo una devolucion
                  </Link>
                </p>
                <small>
                  Devolucion No.{" "}
                  <Link
                    to={
                      "/terceros/" +
                      id +
                      "/bodegas/" +
                      idB +
                      "/ordenes/" +
                      idOr +
                      "/devoluciones/" +
                      actividad.devolucion._id
                    }
                  >
                    {actividad.devolucion.codigo}
                  </Link>
                </small>
                <p className="mb-0 pb-2">
                  <small className="text-muted">
                    {timeAgo.format(
                      new Date(actividad.devolucion.fechaLlegada)
                    )}
                    {/* {formatoFecha(actividad.devolucion.fechaLlegada) +
                      " " +
                      formatoHora(actividad.devolucion.fechaLlegada)} */}
                  </small>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ActividadReciente;
