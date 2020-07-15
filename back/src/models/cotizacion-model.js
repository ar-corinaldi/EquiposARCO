const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const cotizacionSchema = new Schema({
  numeroContrato: {
    type: Number,
    trim: true,
    required: true,
    lowercase: true,
  },
  precioTotal: {
    type: Number,
    trim: true,
    required: true
  },
  tarifasCotizadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tarifa",
    },
  ],
  orden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
  },
  tercero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tercero",
  },
});

const Cotizacion = mongoose.model("Cotizacion", cotizacionSchema);

const noUpdatable = ["__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Cotizacion.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Cotizacion.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

module.exports = Cotizacion;
