const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bodegaSchema = new Schema({
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
});
const Bodega = mongoose.model("Bodega", bodegaSchema);

module.exports = Bodega;
