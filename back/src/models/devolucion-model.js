const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const devolucionSchema = new Schema({
  fechaSalida: {
    type: Date,
  },
  fechaLlegada: {
    type: Date,
  },
  costoTransporte: {
    type: Number,
    default: 0,
  },
  esAsumidoCliente: {
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
  // es una referencia a orden
  orden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
  },
  equiposEnDevolucion: [
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
});

const Devolucion = mongoose.model("Devolucion", devolucionSchema);

const noUpdatable = ["__v"];

Devolucion.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Devolucion.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

module.exports = Devolucion;
