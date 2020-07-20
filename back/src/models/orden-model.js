const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./counter-model");

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
      tarifasPorEquipo: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tarifa",
        },
      ],
    },
  ],
  cotizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cotizacion",
    required: true,
  },
  fechaInicio: {
    type: Date,
    trim: true,
    default: Date.now(),
    lowercase: true,
  },
  fechaFin: {
    type: Date,
    trim: true,
    lowercase: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  codigoObra: {
    type: String,
  },
  bodega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bodega",
    required: true,
  },
});

ordenSchema.pre("validate", async function (next) {
  // Nombre en singular de la collection y en minuscula
  const orden = this;
  if (orden.codigo && orden.codigoObra) return next();

  if (!orden.codigo) {
    const seq = await Counter.getNextSequence("orden");
    if (!seq) return next("seq es undefined");
    orden.codigo = `OR${seq}`;
  }

  if (!orden.codigoObra) {
    const seqOb = await Counter.getNextSequence("obra");
    if (!seqOb) return next("seqOb es undefined");
    orden.codigoObra = `OB${seqOb}`;
  }
  next();
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
