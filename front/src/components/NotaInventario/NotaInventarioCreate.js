import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import NotaInventarioForm from "./NotaInventarioForm";
import Toast from "../Toast";
import Escoger from "../Escoger";
import { useHistory } from "react-router-dom";
import useFetchAPI from "../../hooks/useFetchAPI";

function NotaInventarioCreate(props) {
  const [canSubmit, setCanSubmit] = useState(true);
  const [errors, setErrors] = useState([]);
  const [notaInventario, setNotaInventario] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "",
    proveedor: null,
  });
  const [equipo, setEquipo] = useState({});
  const [orden, setOrden] = useState({});
  const history = useHistory();

  const equipoAPI = useFetchAPI("/equipos/darNoCompuestos");
  const ordenAPI = useFetchAPI("/ordenes");

  const submit = async (e) => {
    e.preventDefault();
    setCanSubmit(false);
    const newNotaInventario = notaInventario;
    newNotaInventario.equipo = equipo._id;
    newNotaInventario.order = orden._id;
    const options = {
      method: "POST",
      body: JSON.stringify(newNotaInventario),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch("/notasInventario", options);
      const dataNotaInventario = await res.json();
      if (!res.ok) {
        Toast(dataNotaInventario, false, res.status);
      } else {
        history.push(`/inventario/listar_notas_de_inventario`);
      }
    } catch (e) {
      Toast(["Error del sistema"], true, 500);
    }
  };

  return (
    <div id="tercero-registrar-wrapper">
      <div id="tercero-registrar-card">
        <form onSubmit={submit}>
          <h4 id="tercero-registrar-titulo">Registrar Nota Inventario</h4>
          <NotaInventarioForm
            fields={notaInventario}
            setFields={setNotaInventario}
          />
          <div className="group-form mt-3">
            <strong>Buscar Equipo</strong>
            <Escoger
              nombre={"Mezcladora de concreto... "}
              camposBuscar={["nombreEquipo"]}
              campos={["nombreEquipo"]}
              elementoSelected={[equipo, setEquipo]}
              elementos={
                typeof equipoAPI.resource === typeof {}
                  ? []
                  : equipoAPI.resource
              }
            />
          </div>
          <div className="group-form mt-3">
            <strong>Buscar Orden</strong>
            <Escoger
              nombre={"OR3... "}
              camposBuscar={["codigo", "codigoObra"]}
              campos={["codigo", "codigoObra"]}
              elementoSelected={[orden, setOrden]}
              elementos={
                typeof ordenAPI.resource === typeof {} ? [] : ordenAPI.resource
              }
            />
          </div>
          <div id="button-wrapper">
            <button
              className="buttonAction"
              disabled={!canSubmit}
              type="submit"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotaInventarioCreate;
