const mongoose = require("mongoose");
const Precio = require("./precio-model");
const Equipo = require("./equipo-model");
const ObjectId = mongoose.Types.ObjectId;

var Schema = mongoose.Schema;

const tarifaSchema = new Schema({
  fechaInicio: {
    type: Date,
    trim: true,
    required: true,
    lowercase: true,
  },
  fechaFin: {
    type: Date,
    trim: true,
    lowercase: true,
  },
  valorTarifa: {
    type: Number,
    trim: true,
    required: true,
    lowercase: true,
  },
  valorReposicion: {
    type: Number,
    trim: true,
    lowercase: true,
  },
  cantidad: {
    type: Number,
    trim: true,
    required: true,
  },
  horasEnUso: {
    type: Number,
    trim: true,
  },
  precioReferencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Precio",
  },
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Equipo",
  },
});

const Tarifa = mongoose.model("Tarifa", tarifaSchema);

// Arreglo de los campos que no queremos modificar
const noUpdatable = ["fechaInicio", "__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Tarifa.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Tarifa.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

/**
 * Compara dos tarifas con base al id de su equipo. Se utiliza para ordenar las tarifas con base en este criterio
 * @param {*} tarifaA
 * @param {*} tarifaB
 */
compare = (tarifaA, tarifaB) => {
  //console.log("tarifaA.equipo._id", tarifaA.equipo._id);
  //console.log("tarifaB.equipo._id", tarifaB.equipo._id);
  return tarifaA.equipo._id
    .toString()
    .localeCompare(tarifaB.equipo._id.toString());
};

/**
 * True si dos tarifas tienen el mismo equipo, false de lo contrario.
 * @param {*} tarifaA
 * @param {*} tarifaB
 */
mismoEquipo = (tarifaA, tarifaB) => {
  //console.log("tarifaA.equipo._id", tarifaA.equipo._id);
  //onsole.log("tarifaB.equipo._id", tarifaB.equipo._id);
  return tarifaA.equipo._id.toString() === tarifaB.equipo._id.toString();
};

/**
 * Recibe las tarifas. Las ordena con base a sus equipos
 * Retorna un arregalo que contiene arreglos de las tarifas sobre el mismo equipo.
 * Crea nuevas instancias de las tarifas
 */
Tarifa.filtrarPorEquipo = async (tarifas) => {
  tarifasOrdenadas = Array.from(tarifas);
  //console.log(tarifasOrdenadas);
  tarifasOrdenadas.sort(compare);
  if (tarifasOrdenadas) {
    const tarifasPorEquipo = [];
    let tAnterior = tarifasOrdenadas[0];
    let tMismoEquipo = { tarifasPorEquipo: [] };
    for (let i = 0; i < tarifasOrdenadas.length; i++) {
      console.log("Tarifa vieja", tarifasOrdenadas[i]);
      const tarifa = new Tarifa(tarifasOrdenadas[i]);
      tarifa._id = new ObjectId();
      tarifa.isNew = true;
      console.log("Tarifa nueva", tarifa);
      try {
        await tarifa.save();
      } catch (error) {
        console.log(error);
      }
      if (mismoEquipo(tarifa, tAnterior)) {
        tMismoEquipo.tarifasPorEquipo.push(tarifa._id);
      } else {
        tAnterior = tarifa;
        tarifasPorEquipo.push(tMismoEquipo);
        tMismoEquipo = { tarifasPorEquipo: [] };
        tMismoEquipo.tarifasPorEquipo.push(tarifa._id);
      }
      if (i === tarifasOrdenadas.length - 1) {
        tarifasPorEquipo.push(tMismoEquipo);
      }
    }
    console.log("tarifasPorEquipo", tarifasPorEquipo);
    return tarifasPorEquipo;
  }
};

module.exports = Tarifa;
