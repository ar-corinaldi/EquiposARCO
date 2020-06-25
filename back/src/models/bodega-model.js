const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bodegaSchema = new Schema({
  tipoDocumento: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  nombreBodega: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  direccion: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  municipio: {
    type: String,
    lowercase: true,
    trim: true,
  },
  ciudad: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  pais: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
  },
  celular: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  regimenSimplificado: {
    type: Boolean,
    default: false,
  },
});
const Bodega = mongoose.model("Bodega", bodegaSchema);

module.exports = Bodega;
