const mongoose = require("mongoose");

// Referencia a los precios
const Precio = require("./precio-model");

var Schema = mongoose.Schema;

//require("../db/mongoose");

//const validator = require("validator");

const tiposEquipo = [
  "andamios",
  "elementos formaleta entrepiso",
  "encofrado",
  "formaleta",
  "maquinaria",
  "servicio",
];

const nombresFamilia = [
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

/*
 * Definición del modelo con sus propiedades
 */
const equipoSchema = new Schema({
  nombreEquipo: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  nombreGrupo: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      isValid = nombresGrupo.includes(value);
      if (!isValid) {
        throw new Error("Nombre Grupo invalido");
      }
    },
  },
  nombreFamilia: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      isValid = nombresFamilia.includes(value);
      if (!isValid) {
        throw new Error("Nombre Familia invalido");
      }
    },
  },
  tipoEquipo: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      isValid = tiposEquipo.includes(value);
      if (!isValid) {
        throw new Error("Tipo de equipo invalido");
      }
    },
  },
  codigo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  /**
   */
  cantidadTotal: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * Cantidad del equipo que se encuentra en las bodegas de Equipos ARCOS y que pueden ser alquilados
   */
  cantidadBodega: {
    type: Number,
    required: false,
    default: 0,
  },
  fechaAdquision: {
    type: Date,
    default: Date.now(),
  },
  precioReposicion: {
    type: Number,
    default: 0,
    required: false,
  },
  costoEquipo: {
    type: Number,
    default: 0,
    required: false,
  },
  precios: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Precio",
      },
    ],
    validate(v) {
      const isValid = Array.isArray(v) && v.length > 0;
      if (!isValid) {
        throw new Error(`Debe tener al menos un precuio`);
      }
    },
  },
  componentes: [
    {
      cantidad: {
        type: Number,
        required: false,
        default: 1,
      },
      equipoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
      },
    },
  ],
  propiedades: [
    {
      nombre: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      valor: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      tipoPropiedad: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
  ],
  peso: {
    type: Number,
    min: 0,
    default: 0,
  },
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
  },
});

const Equipo = mongoose.model("Equipo", equipoSchema);

// Arreglo de los campos que no queremos modificar
const noUpdatable = ["fechaAdquision", "__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Equipo.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Equipo.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

// const precioTest = new Precio({
//   categoria: "unidad",
//   valor: 10000,
//   tiempoMinimo: 1,
// });

// precioTest.save();

// const equipoPrueba = new Equipo({
//   codigo: "ABO008",
//   nombreEquipo: "ABRAZADERA 4.5  FP",
//   nombreGrupo: "BOMBA CIFA",
//   nombreFamilia: "DIVISION DE MAQUINARIA TIPO PESADO",
//   tipoEquipo: "MAQUINARIA",
//   fechaAdquision: Date.now(),
//   precios: [precioTest._id],
// });

// equipoPrueba
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = Equipo;
