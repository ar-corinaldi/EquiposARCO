import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import "./ActividadReciente.css";

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
      setActividad(newActividad);
    }
    console.log("newActividad", newActividad);
  };

  return (
    <div className="timeline-alt pb-0">
      <div className="timeline-item">
        <FaTruck className="bg-info-lighten text-info timeline-icon"></FaTruck>
        <div className="timeline-item-info">
          <a href="#" className="text-info font-weight-bold mb-1 d-block">
            You sold an item
          </a>
          <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
          <p className="mb-0 pb-2">
            <small className="text-muted">5 minutes ago</small>
          </p>
        </div>
      </div>
      {/* <div className="timeline-item">
        <FaTruck className="bg-info-lighten text-info timeline-icon"></FaTruck>
        <div className="timeline-item-info">
          <a href="#" className="text-info font-weight-bold mb-1 d-block">
            You sold an item
          </a>
          <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
          <p className="mb-0 pb-2">
            <small className="text-muted">5 minutes ago</small>
          </p>
        </div>
      </div> */}
      {/* {actividad &&
        actividad.map((actividad, index) => (
          <p key={index}>
            {actividad.remision ? (
              <Link
                to={
                  "/terceros/" +
                  id +
                  "/bodegas/" +
                  idB +
                  "/ordenes/" +
                  idOr +
                  "/remisiones/" +
                  actividad.remision._id
                }
              >
                Remision: {actividad.remision.codigo}
              </Link>
            ) : (
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
                Devolucion: {actividad.devolucion.codigo}
              </Link>
            )}
          </p>
        ))} */}
    </div>
  );
}

export default ActividadReciente;
