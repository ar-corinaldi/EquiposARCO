const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const clienteSchema = new Schema({
  tipoDocumento: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  numeroDocumento: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  // Revisar
  direcciones: {
    type: [String],
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  celular: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  paginaWeb: {
    type: String,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  nombreTributario: {
    type: String,
    trim: true,
  },
});

const Cliente = mongoose.model("Cliente", clienteSchema);

const noUpdatable = ["__v"];

Cliente.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Cliente.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Cliente;
