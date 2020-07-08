import React from "react";
import Col from "react-bootstrap/Col";

const tiposEquipo = [
  "",
  "andamios",
  "elementos formaleta entrepiso",
  "encofrado",
  "formaleta",
  "maquinaria",
  "servicio",
];

const nombresFamilia = [
  "",
  "division andamiaje",
  "division de equipos menores",
  "division de formaleteria",
  "division de herramientas",
  "division de maquinaria tipo liviano",
  "division de maquinaria tipo pesado",
  "insumos",
  "servicio", //No lo se rick
  "servicio de alquiler",
  "servicio de transporte",
  "servicio mantenimiento",
  "servicio operador",
];

const nombresGrupo = [
  "",
  "accesorio",
  "allanadora",
  "andamio colgante",
  "andamio de carga",
  "andamio multidireccional",
  "andamio tubular",
  "andamios multidireccionales",
  "apisonador",
  "bomba cifa",
  "compresor",
  "compresor de aire",
  "contenedor",
  "cortadora",
  "derretidora",
  "diferencial",
  "elemento de seguridad",
  "equipo samblasting",
  "escaleras",
  "formaleta",
  "formaleta columna",
  "formaleta entrepiso",
  "formaleta industrializada",
  "formaleta sardinel",
  "generador",
  "grua",
  "herramienta",
  "hidrolavadora",
  "mezcladora",
  "minicargadora",
  "motobomba",
  "motor b&s",
  "motor honda",
  "motor launtop",
  "motor lesson",
  "motor marathon",
  "motor siemens",
  "motor weg",
  "motor yanmar",
  "planta electrica",
  "pluma",
  "puente grua",
  "rana vibrocompactadora",
  "regla vibratoria",
  "retroexcavadora",
  "rodillo vibrocompactador",
  "ruteadora",
  "servicio",
  "taladro",
  "vibrador",
];

function EquipoForm(props) {
  const { fields, handleChange } = props;
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="tipoEquipo">Tipo Equipo:</label>
        <select
          name="tipoEquipo"
          value={fields.tipoEquipo}
          onChange={handleChange}
        >
          {tiposEquipo.map((tipoEquipo) => (
            <option key={tipoEquipo} value={tipoEquipo}>
              {tipoEquipo.length > 0
                ? tipoEquipo[0].toUpperCase() + tipoEquipo.slice(1)
                : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nombreFamilia">Familia Grupo:</label>
        <select
          name="nombreFamilia"
          value={fields.nombreFamilia}
          onChange={handleChange}
        >
          {nombresFamilia.map((nombreFamilia) => (
            <option key={nombreFamilia} value={nombreFamilia}>
              {nombreFamilia.length > 0
                ? nombreFamilia[0].toUpperCase() + nombreFamilia.slice(1)
                : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nombreGrupo">Nombre Grupo:</label>
        <select
          name="nombreGrupo"
          value={fields.nombreGrupo}
          onChange={handleChange}
        >
          {nombresGrupo.map((nombreGrupo) => (
            <option key={nombreGrupo} value={nombreGrupo}>
              {nombreGrupo.length > 0
                ? nombreGrupo[0].toUpperCase() + nombreGrupo.slice(1)
                : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nombreEquipo">Nombre Equipo:</label>
        <input
          name="nombreEquipo"
          type="text"
          value={fields.nombreEquipo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="codigo">Código:</label>
        <input
          name="codigo"
          type="text"
          value={fields.codigo}
          onChange={handleChange}
        />
      </div>
    </React.Fragment>
  );
}

export default EquipoForm;