import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";

/**
 *
 * @param {/facturas/:id, /equipos/cantidad, /terceros/:id/bodegas/:idBodega} _url, url a buscar en el back
 * @param {estado1, estado2} _dependencies, array de dependencias para el useEffect, deben ponerse estados, default es []
 * Un ejemplo, en paginacion, se usa el currentPage y el resourcesPerPage, o en el detail se puede dejar vacio
 */
function useFetchAPI(_url, _dependencies = []) {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  useEffect(() => {
    fetchResourceDetail();
  }, _dependencies);

  /**
   * Retorna un recurso en base a la url
   * En caso de error lo maneja con una notificacion y se pone en undefined el resource
   */
  const fetchResourceDetail = async () => {
    try {
      const res = await fetch(_url);

      if (!res.ok) {
        setResource(undefined);
        Toast([`No existe el recurso buscado`], true, res.staus);
      } else {
        const newResource = await res.json();
        setResource(newResource);
      }
    } catch (e) {
      setResource(undefined);
      Toast(["Error del sistema"], true, 500);
    }

    setLoading(undefined);
  };

  /**
   *
   * @param {"El equipo actual no existe"} message
   */
  const notFound = (message) => {
    return <div>{message}</div>;
  };

  return {
    resource,
    setResource,
    loading,
    notFound,
    setLoading,
  };
}

export default useFetchAPI;
