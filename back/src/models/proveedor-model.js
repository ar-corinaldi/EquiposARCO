const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const proveedorSchema = new Schema({
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
    trim: true,
    lowercase: true,
  },
  telefono: {
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
  numeroIdentificacionTributario: {
    type: String,
    trim: true,
  },
  regimenSimplificado: {
    type: Boolean,
    default: false,
  },
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

const noUpdatable = ["__v"];

Proveedor.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Proveedor.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Proveedor;
