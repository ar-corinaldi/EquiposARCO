const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const vehiculoSchema = new Schema({
  placa: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  modelo: {
    type: String,
    lowercase: true,
    trim: true,
  },
  capacidad: {
    type: Number,
    min: 0,
  },
  remisiones: [String],
});

const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);

const noUpdatable = ["__v", "placa"];

Vehiculo.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Vehiculo.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Vehiculo;
