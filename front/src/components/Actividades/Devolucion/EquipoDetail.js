import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

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
        <td>
          <b>{equipoRender.equipoID.nombreEquipo}</b>
          <br />
          {equipoRender.equipoID.tipoEquipo}
        </td>
        <td>{equipoRender.equipoID.nombreFamilia}</td>
        <td>{equipoRender.equipoID.peso}</td>
        <td>
          <input
            type="number"
            min="1"
            max={equipoRender.equipoID.porEnviar}
            value={equipoRender.cantidad}
            className="form-control w90"
            placeholder="cant."
            onChange={handleCantidad}
          ></input>
        </td>
        <td>
          <CloseIcon
            className="closeIcon"
            onClick={(e) => handleRemoveEquipo(e, equipoRender)}
          />
        </td>
      </tr>
    </React.Fragment>
  );
}

export default EquipoDetail;
