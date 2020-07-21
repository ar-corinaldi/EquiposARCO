import React, { useState, useEffect } from "react";
import useAPIDetail from "./useFetchAPI";
import Toast from "../components/Toast";

/**
 *
 * @param {/equipos, /facturas, /terceros} urlResource, url del recurso
 * @param {/equipos/cantidad, /facturas/cantidad} urlCount, url de la cantidad total del recurso
 * Retorna un objeto con los recursos necesarios para listar y la paginacion.
 * currentPage, setCurrentPage
 * resourcesPerPage, setResourcesPerPage
 * resource, setResource,
 * loading, setLoading (opcional si  manejan loading)
 */
function usePagination(urlResource, urlCount) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage, setResourcesPerPage] = useState(10);
  const [countResources, setCountResources] = useState(0);
  const { resource, loading, setResource, setLoading } = useAPIDetail(
    // Automaticamente actualiza la pagina actual y recursos de la pagina
    // Por default son 1 y 10
    `${urlResource}/${currentPage}/${resourcesPerPage}`,
    [currentPage, resourcesPerPage]
  );

  useEffect(() => {
    fetchCountResources();
  }, []);

  // Retorna la cantidad de recursos que tiene la collecion
  const fetchCountResources = async () => {
    try {
      const res = await fetch(urlCount);
      if (!res.ok) {
        setCountResources(0);
        Toast(["No se encontro el recurso"], true, res.status);
      } else {
        const newCount = await res.json();
        setCountResources(parseInt(newCount));
      }
    } catch (e) {
      setCountResources(0);
      Toast(["Error del sistema"], true, 500);
    }
  };

  return {
    resource,
    setResource,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    countResources,
    resourcesPerPage,
    setResourcesPerPage,
  };
}

export default usePagination;
