const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Counter = require("./counter-model");

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
  asumidoTercero: {
    type: Boolean,
    required: true,
    validate(value) {
      if (value) {
        const isValid =
          !this.vehiculoTransportador &&
          !this.conductor &&
          (!this.costoTransporte || this.costoTransporte == 0);
        if (!isValid) {
          throw new Error(
            `El trasporte lo asume el tercero, no puede tener vehiculo, conductor ni costo.`
          );
        }
      } else {
        const isValid =
          this.vehiculoTransportador &&
          this.conductor &&
          this.costoTransporte &&
          this.costoTransporte > 0;
        if (!isValid) {
          throw new Error(
            `El trasporte lo asume el EquiposARCO, debe tener vehiculo, conductor y costo.`
          );
        }
      }
    },
  },
  vehiculoTransportador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehiculo",
  },
  conductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
  },
  equiposEnDevolucion: {
    type: [
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
    validate(v) {
      const isValid = Array.isArray(v) && v.length > 0;
      if (!isValid) {
        throw new Error(`Debe tener al menos un equipo`);
      }
    },
  },
  codigo: {
    type: String,
    required: true,
  },
});

devolucionSchema.pre("validate", async function (next) {
  // Nombre en singular de la collection y en minuscula
  const devolucion = this;
  if (devolucion.codigo) return next();

  if (!devolucion.codigo) {
    const seq = await Counter.getNextSequence("devolucion");
    if (!seq) return next("seq es undefined");
    devolucion.codigo = `DE${seq}`;
  }
  next();
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
