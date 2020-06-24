const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//require("../db/mongoose");

//const validator = require("validator");

const tiposEquipo = [
  "maquinaria liviana",
  "maquinaria pesada",
  "motriz",
  "escaleras industriales",
  "andamio tubular",
  "andamio colgante",
  "andamio multidireccional",
  "andamio universal",
  "andamio carga",
  "andamio colgante",
  "fomaleteria tradicional",
  "formaleta",
  "fomaleteria industrial",
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
  //   nombreFamilia: {
  //     type: String,
  //     trim: true,
  //     required: true,
  //     lowercase: true,
  //   },
  //   nombreGrupo: {
  //     type: String,
  //     trim: true,
  //     required: true,
  //     lowercase: true,
  //   },
  //   nombreFamilia: {
  //     type: String,
  //     trim: true,
  //     required: true,
  //     lowercase: true,
  //   },
  cantidadInventario: {
    type: Number,
    required: false,
    default: 1,
  },
  fechaAdquision: {
    type: Date,
    required: true,
  },
});

// const equipoPrueba = new Equipo({
//   nombreEquipo: "  Mezcladora (Gas/Die)  ",
//   tipoEquipo: "  maquinaria liviana  ",
//   fechaAdquision: Date.now(),
// });

// equipoPrueba
//   .save()
//   .then((result) => {
//     console.log("llega");
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("llega");
//     console.log(error);
//   });
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

module.exports = Equipo;
