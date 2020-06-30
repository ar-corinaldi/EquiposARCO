import React from "react";
import "./Sidebar.css";
import SidebarDetail from "./SidebarDetail";
import { useLocation, Link } from "react-router-dom";

function Sidebar(props) {
  const completePath = useLocation();
  const location = "/" + completePath.pathname.split("/")[1];
  console.log(completePath.pathname.split("/")[1]);
  console.log(location);

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
      name: "Listar equipos",
      ref: "/equipos",
    },
    {
      type: "Link",
      name: "Prueba",
      ref: "/prueba",
    },
    {
      type: "Link",
      name: "Terceros",
      ref: "/terceros",
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
  ];
  //Definicion del menú home: Cuando la ruta es '/'.
  const home_menu = [];

  //Contiene la referencia a todos los menus disponibles y la ruta de cada uno
  const menus_disponibles = {
    "/inventario": menu_inventario,
    "/": home_menu,
    "/terceros": menu_terceros,
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
