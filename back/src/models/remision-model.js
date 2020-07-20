const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Counter = require("./counter-model");

const remisionSchema = new Schema({
  fechaSalida: {
    type: Date,
  },
  fechaLlegada: {
    type: Date,
  },
  costoTransporte: {
    type: Number,
    defualt: 0,
  },
  asumidoTercero: {
    type: Boolean,
    required: true,
  },
  vehiculoTransportador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehiculo",
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
  },
  // // es una referencia a orden
  // orden: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Orden",
  // },
  equiposEnRemision: [
    {
      cantidad: {
        type: Number,
        required: false,
        default: 1,
      },
      equipoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
      },
    },
  ],
  codigo: {
    type: String,
    required: true,
  },
});

remisionSchema.pre("validate", async function (next) {
  // Nombre en singular de la collection y en minuscula
  const remision = this;
  if (remision.codigo) return next();

  if (!remision.codigo) {
    const seq = await Counter.getNextSequence("remision");
    if (!seq) return next("seq es undefined");
    remision.codigo = `RE${seq}`;
  }
  next();
});

const Remision = mongoose.model("Remision", remisionSchema);

const noUpdatable = ["__v"];

Remision.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Remision.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Remision;
