const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Counter = require("./counter-model");

const facturaSchema = new Schema({
  fechaEmision: {
    type: Date,
    default: Date.now(),
  },
  fechaInicial: {
    type: Date,
    required: true,
  },
  fechaCorte: {
    type: Date,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  },
  ordenes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "factura",
    },
  ],
  iva: {
    type: Number,
    required: true,
    min: 0,
  },
  codigoObra: {
    type: String,
    trim: true,
  },
  subTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  precioTotal: {
    type: Number,
    required: true,
    min: 0,
  },
  bodega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bodega",
  },
  aceptada: {
    type: Boolean,
  },
  codigo: {
    type: String,
    required: true,
  },
});

//Valido fechas inicial, final y precio
facturaSchema.pre("validate", async function (next) {
  const factura = this;
  try {
    const { fechaInicial, fechaCorte, fechaPago } = factura;
    let cond = fechaCorte.getTime() - fechaInicial.getTime() >= 0;
    // Fecha corte < fecha inicial
    if (!cond) {
      return next(["La fecha corte no es mayor o igual que la fecha inicial"]);
    }
    cond =
      fechaPago.getTime() - fechaCorte.getTime() >= 0 ||
      fechaPago.getTime() - fechaInicial.getTime() >= 0;
    // FechaPago > (fechaCorte & fechaInicial)
    if (!cond) {
      return next(["La fecha pago no es valida"]);
    }
    // No problem
    next();
  } catch (e) {
    next(["Hubo un error en el sistema con las facturas"]);
  }
});

facturaSchema.pre("validate", async function (next) {
  // Nombre en singular de la collection y en minuscula
  const factura = this;
  if (factura.codigo) return next();

  const seq = await Counter.getNextSequence("factura");
  if (!seq) return next("seq es undefined");
  factura.codigo = `FA${seq}`;

  next();
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
