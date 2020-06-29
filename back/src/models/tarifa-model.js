const mongoose = require("mongoose");
const Precio = require("./precio-model");
const Equipo = require("./equipo-model");

var Schema = mongoose.Schema;

const tarifaSchema = new Schema({
  fechaInicio: {
    type: Date,
    trim: true,
    required: true,
    lowercase: true,
  },
  fechaFin: {
    type: Date,
    trim: true,
    lowercase: true,
  },
  valorTarifa: {
    type: Number,
    trim: true,
    required: true,
    lowercase: true,
  },
  cantidad: {
    type: Number,
    trim: true,
    required: true,
    lowercase: true,
  },
  precioReferencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Precio",
  },
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipo",
  },
});

const Tarifa = mongoose.model("Tarifa", tarifaSchema);

// Arreglo de los campos que no queremos modificar
const noUpdatable = ["fechaInicio", "__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Tarifa.fieldsNotAllowedUpdates = (body) => {
    const updates = Object.keys(body);
  
    // Sirve para obtener los campos del modelo
    let allowedUpdates = Object.keys(Tarifa.schema.paths);
  
    // Deja los campos que no queremos moficiar
    allowedUpdates = allowedUpdates.filter(
      (update) => !noUpdatable.includes(update)
    );
    const isValidOp = updates.every((update) => allowedUpdates.includes(update));
    console.log(updates);
    return isValidOp;
  };

  module.exports = Tarifa;
