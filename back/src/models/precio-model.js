const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const categorias = [
  "unidad",
  "area",
  "hora",
  "dia",
  "mes",
  "año",
  "volumen",
  "venta",
];

/*
 * Definición del modelo con sus propiedades
 */
const precioSchema = new Schema({
  categoria: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate(value) {
      isValid = categorias.includes(value);
      if (!isValid) {
        throw new Error("Categoria invalida");
      }
    },
  },
  valor: {
    type: Number,
    required: true,
  },
  tiempoMinimo: {
    type: Number,
    required: false,
    default: 0,
  },
});

const Precio = mongoose.model("Precio", precioSchema);

// // Arreglo de los campos que no se pueden modificar
const noUpdatable = [];

// /**
//  * Funcion para revisar que las modificiaciones son validas
//  * @param body: Corresponde a los campos que se van a actualizar
//  * @returns retorna true si todos los campos que se actualizan se pueden,
//  *  retorna false en caso contrario.
//  */
Precio.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Precio.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

module.exports = Precio;
