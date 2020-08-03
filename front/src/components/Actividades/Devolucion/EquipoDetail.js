import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { FaTrash, FaRegStickyNote } from "react-icons/fa";

function EquipoDetail(props) {
  const [equiposSels, setEquiposSels] = props.equiposSels;
  const [pesoTotal, setPesoTotal] = props.pesoTotal;
  const [cantidadTotal, setCantidadTotal] = props.cantidadTotal;
  const equipoRender = props.equipoRender;
  const [cantidad, setCantidad] = useState(equipoRender.cantidad);

  const handleCantidad = (e) => {
    const target = e.target;
    setCantidad(target.value);
    equipoRender.cantidad = target.value;
    calcularPesoTot();
    calcularCantTot();
  };

  const handleRemoveEquipo = (e, equipo) => {
    e.preventDefault();
    //console.log("equiposSels", equiposSels);
    const currentIndex = equiposSels.indexOf(equipo);
    setEquiposSels((prev) =>
      prev.filter((prev, index) => currentIndex !== index)
    );
    //console.log("equiposSels", equiposSels);
  };

  const handleNotaInventario = (e, equipo) => {
    e.preventDefault();
  };

  const calcularPesoTot = () => {
    let pesoTot = 0;
    console.log(equiposSels);
    equiposSels.forEach((equipo) => {
      pesoTot += equipo.equipoID.peso * equipo.cantidad;
    });
    console.log("pesoTot", pesoTot);
    setPesoTotal(pesoTot);
  };

  const calcularCantTot = () => {
    let cantTot = 0;
    console.log(equiposSels);
    equiposSels.forEach((equipo) => {
      cantTot += +equipo.cantidad;
    });
    console.log("cantTot", cantTot);
    setCantidadTotal(cantTot);
  };

  return (
    <React.Fragment>
      <tr className="capitalize">
        <td className="pt">
          <b>{equipoRender.equipoID.nombreEquipo}</b>
          <br />
          {equipoRender.equipoID.tipoEquipo}
        </td>
        <td className="pt">{equipoRender.equipoID.nombreFamilia}</td>
        <td className="pt">{equipoRender.equipoID.peso}</td>
        <td className="pt">
          <input
            type="number"
            min="1"
            max={equipoRender.equipoID.porEnviar}
            value={equipoRender.cantidad}
            className="form-control w90 ml0"
            placeholder="cant."
            onChange={handleCantidad}
          ></input>
        </td>
        <td className="pt">
          <FaTrash
            className="icono"
            onClick={(e) => handleRemoveEquipo(e, equipoRender)}
          />
          <FaRegStickyNote
            className="icono"
            onClick={(e) => handleNotaInventario(e, equipoRender)}
          />
        </td>
      </tr>
    </React.Fragment>
  );
}

export default EquipoDetail;
