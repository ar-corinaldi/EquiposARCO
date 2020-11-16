import React, { useRef } from "react";
import formatoPrecios from "../../utils/FormatoPrecios";
import EditField from "../../EditField";
function PrecioDetail(props) {
  const { equipo, setEquipo, precio } = props;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    const newPrecio = precio;
    newPrecio[name] = value;
    const newPrecios = equipo.precios.map(pr => pr._id === newPrecio._id? newPrecio : pr);
    const newEquipo = {...equipo};
    newEquipo.precios = newPrecios;
    setEquipo(newEquipo);
  }
  const valorVenta = useRef();
  const valorAlquiler = useRef();
  const tiempoMinimo = useRef();

  return (
    <tr>
      <td>
        <EditField value={precio} name="valorVenta" reference={valorVenta} handleChange={handleChange}/>
      </td>
      <td>
        <EditField value={precio} name="valorAlquiler" reference={valorAlquiler} handleChange={handleChange}/>
      </td>
      <td>
        {precio.categoria} / {precio.tiempo}
      </td>
      <td>
        <EditField value={precio} name="tiempoMinimo" reference={tiempoMinimo} handleChange={handleChange}/>
        {precio.tiempo}
      </td>
    </tr>
  );
}

export default PrecioDetail;
