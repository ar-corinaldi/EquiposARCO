const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const globalSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  valor: {
    type: Schema.Types.Mixed,
  },
});

const Global = mongoose.model("Global", globalSchema);

// Arreglo de los campos que no queremos modificar
const noUpdatable = ["__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Global.fieldsNotAllowedUpdates = (body) => {
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

module.exports = Global;
