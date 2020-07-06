const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ordenSchema = new Schema({
  remisiones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remision",
    },
  ],
  devoluciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devolucion",
    },
  ],
  tarifasDefinitivas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tarifa",
    },
  ],
  cotizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cotizacion",
  },
});

const Orden = mongoose.model("Orden", ordenSchema);

const noUpdatable = ["__v"];

Orden.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Orden.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Orden;
