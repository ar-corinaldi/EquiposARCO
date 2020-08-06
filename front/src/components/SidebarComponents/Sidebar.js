import React from "react";
import "./Sidebar.css";
import SidebarDetail from "./SidebarDetail";
import { useLocation, Link } from "react-router-dom";

function Sidebar(props) {
  const completePath = useLocation();
  const location = "/" + completePath.pathname.split("/")[1];
  // console.log(completePath.pathname.split("/")[1]);
  // console.log(location);

  /**Header, Title, link, menu son los tipos de componentes en el sibar, el menu aún no está implementado en Sidebar Details
  Todos necesitan name ya que este es el nombre que se va a renderizar. El Type especifica el tipo de componente a renderizar en Details. Si es un link necesita un ref
  que es el la segunda parte del link al que va a dirigirse: Ejemplo, actualemnte en menu_inventario sale en todas las paths que empiecen por '/inventario',
  si quiero definir un link a equipos y pongo '/equipo' El link iría a '/inventario/equipo' en vez de a '/equipo', ojo con eso manitos.
  Todo esto depende de que definan las rutas en App.js, si por ejemplo la ruta '/inventario/equipo' no está definida en App.js no va a mostrar nada el Link.

  La idea de todo esto es que solo sea necesario editar los arreglos y no meterse con html css y JS, que eso lo maneje SidebarDetails**/

  //Descripción del menú de inventario
  const menu_inventario = [
    {
      type: "Header",
      name: "Inventario",
    },
    {
      type: "Title",
      name: "Opciones",
    },
    {
      type: "Link",
      name: "Listar Equipos",
      ref: "/equipos",
    },
    {
      type: "Link",
      name: "Crear Equipo",
      ref: "/crearEquipo",
    },
    {
      type: "Link",
      name: "Listar Notas de Inventario",
      ref: "/listar_notas_de_inventario",
    },
    {
      type: "Link",
      name: "Crear Nota Inventario",
      ref: "/crearNotaInventario",
    },
  ];

  //Descripción del menú de inventario
  const menu_terceros = [
    {
      type: "Header",
      name: "Terceros",
    },
    {
      type: "Title",
      name: "Opciones",
    },
    {
      type: "Link",
      name: "Listar terceros",
      ref: "/listar_terceros",
    },
    {
      type: "Link",
      name: "Crear tercero",
      ref: "/crear_tercero",
    },
    {
      type: "Link",
      name: "Listar ordenes",
      ref: "/listar_ordenes",
    },
  ];

  const menu_facturación = [
    {
      type: "Header",
      name: "Facturación",
    },
    {
      type: "Title",
      name: "Opciones",
    },
    {
      type: "Link",
      name: "Listar Facturas",
      ref: "/listar_facturas",
    },
    {
      type: "Link",
      name: "Ordenes",
      ref: "/crear_orden",
    },
    {
      type: "Link",
      name: "Cotizar",
      ref: "/cotizar",
    },
    {
      type: "Link",
      name: "Prueba",
      ref: "/prueba",
    },
  ];

  const menu_imprimir = [
    {
      type: "Header",
      name: "Imprimir",
    },
    {
      type: "Title",
      name: "Opciones",
    },
    {
      type: "Link",
      name: "Inventario por orden",
      ref: "/inventarioPorOrden",
    },
    {
      type: "Link",
      name: "Inventario por tercero",
      ref: "/inventarioPorTercero",
    },
    {
      type: "Link",
      name: "Inventario por equipo",
      ref: "/inventarioPorEquipo",
    },
    {
      type: "Link",
      name: "Movimiento por Orden",
      ref: "/movimientoPorOrden",
    },
    {
      type: "Link",
      name: "Movimiento por Contrato",
      ref: "/movimientoPorContrato",
    },
    {
      type: "Link",
      name: "Resumen de Trasporte",
      ref: "/resumenDeTransporte",
    },
  ];

  //Definicion del menú home: Cuando la ruta es '/'.
  const home_menu = [];

  //Contiene la referencia a todos los menus disponibles y la ruta de cada uno
  const menus_disponibles = {
    "/inventario": menu_inventario,
    "/": home_menu,
    "/terceros": menu_terceros,
    "/facturacion": menu_facturación,
    "/imprimir": menu_imprimir,
  };

  return (
    <div className="wraper">
      <nav id="sidebar" className="visible">
        <SidebarDetail menu={menus_disponibles[location]} baseUrl={location} />
      </nav>
    </div>
  );
}

export default Sidebar;
