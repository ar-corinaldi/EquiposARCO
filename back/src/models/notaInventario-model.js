const mongoose = require("mongoose");
var Schema = mongoose.Schema;

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

const NotaInventario = mongoose.model("NotaInventario", notaInventarioSchema);

// // Arreglo de los campos que no se pueden modificar
const noUpdatable = ["fecha", "__v"];

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
