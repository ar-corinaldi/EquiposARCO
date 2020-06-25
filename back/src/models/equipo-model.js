const mongoose = require("mongoose");

// Referencia a los precios
const Precio = require("./precio-model");

var Schema = mongoose.Schema;

//require("../db/mongoose");

//const validator = require("validator");

const tiposEquipo = ["maquinaria", "andamios"];

const nombresFamilia = [
  "division de maquinaria tipo pesado",
  "division andamiaje",
];

const nombresGrupo = ["bomba cifa", "andamio multidireccional"];

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
  cantidadInventario: {
    type: Number,
    required: false,
    default: 1,
  },
  fechaAdquision: {
    type: Date,
    required: true,
  },
  precios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Precio",
    },
  ],
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
