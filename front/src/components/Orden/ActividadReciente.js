import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      {actividad &&
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
        ))}
    </div>
  );
}

export default ActividadReciente;
