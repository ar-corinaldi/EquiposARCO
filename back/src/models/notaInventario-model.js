const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Equipo = require("./equipo-model");

const categoria = ["compra", "venta", "fabricación", "reparación", "daño"];

/*
 * Definición del modelo con sus propiedades
 */
const notaInventarioSchema = new Schema({
  categoria: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      isValid = categoria.includes(value);
      if (!isValid) {
        throw new Error("Categoria invalido");
      }
    },
  },
  descripcion: {
    type: String,
    trim: true,
    lowercase: true,
  },
  cantidad: {
    type: Number,
    default: 0,
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipo",
    required: true,
  },
  orden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
    required: false,
  },
  // tercero: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Tercero",
  //   required: false,
  // },
  proveedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proveedor",
    required: false,
  },
});

notaInventarioSchema.post("save", async (notaInventario) => {
  console.log("notaInventario post hook");
  const { categoria, equipo, cantidad } = notaInventario;
  const equipoToUpdate = await Equipo.findById(equipo);
  if (
    categoria === "compra" ||
    categoria === "fabricacion" ||
    categoria === "reparacion"
  ) {
    equipoToUpdate.cantidadBodega += cantidad;
    equipoToUpdate.cantidadTotal += cantidad;
  } else if (categoria === "venta" || categoria === "daño") {
    if (
      !(
        equipoToUpdate.cantidadBodega - cantidad < 0 &&
        equipoToUpdate.cantidadTotal < 0
      )
    ) {
      equipoToUpdate.cantidadBodega -= cantidad;
      equipoToUpdate.cantidadTotal -= cantidad;
    }
  }
  await Equipo.findByIdAndUpdate(equipo, equipoToUpdate, {
    new: true,
    runValidators: true,
  });
  console.log("Actualiza equipo");
});

const NotaInventario = mongoose.model("NotaInventario", notaInventarioSchema);

// Arreglo de los campos que no se pueden modificar
const noUpdatable = ["fecha", "__v", "proveedor", "equipo"];

/**
 * Funcion para revisar que las modificiaciones son validas
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
NotaInventario.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(NotaInventario.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

module.exports = NotaInventario;
