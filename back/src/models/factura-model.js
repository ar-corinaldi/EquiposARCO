const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const facturaSchema = new Schema({
  fechaEmision: {
    type: Date,
    default: Date.now(),
  },
  ordenes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orden",
    },
  ],
  aceptada: {
    type: Boolean,
  },
});

const Factura = mongoose.model("Factura", facturaSchema);

const noUpdatable = ["__v"];

Factura.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Factura.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Factura;
