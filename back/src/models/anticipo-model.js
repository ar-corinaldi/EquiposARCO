const mongoose = require("mongoose");

const Tercero = require("./tercero-model");

let Schema = mongoose.Schema;

const anticipoSchema = new Schema({
  fecha: {
    type: Date,
    trim: true,
    required: true,
    lowercase: true,
  },
  valor: {
    type: Number,
    trim: true,
    required: true,
    lowercase: true,
  },
  tercero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tercero,
  },
});

const Anticipo = mongoose.model("Anticipo", anticipoSchema);

// Arreglo de los campos que no queremos modificar
const noUpdatable = ["__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Anticipo.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Anticipo.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};
