const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bodegaSchema = new Schema({
  nombreBodega: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  direccionBodega: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  municipio: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  pais: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  departamento: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  codigoPostal: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  celular: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
    required: true,
  },
  fechaRegistro: {
    type: Date,
    defualt: Date.now(),
  },
  duenio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tercero"
  }
  ,
  ordenesActuales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orden",
    },
  ],
  ordenesPasadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orden",
    },
  ],
  // cotizaciones: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Cotizacion",
  //   },
  // ],
});

bodegaSchema.index(
  { direccionBodega: 1, municipio: 1, pais: 1, departamento: 1 },
  { unique: true }
);

const Bodega = mongoose.model("Bodega", bodegaSchema);

const noUpdatable = ["__v"];

/**
 * @param body: Corresponde a los campos que se van a actualizar
 * @returns retorna true si todos los campos que se actualizan se pueden,
 *  retorna false en caso contrario.
 */
Bodega.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Bodega.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  console.log(updates);
  return isValidOp;
};

Bodega.findByLocalizacion = async (body) => {
  let newBodega = null;
  if (body.codigoPostal) {
    let codigoPostal = body.codigoPostal;
    newBodega = await Bodega.findOne({ codigoPostal });
    console.log("Ya se registro una bodega con el mismo codigo postal");
    console.log(newBodega);
  }
  if (!newBodega) {
    let query = {
      municipio: body.municipio,
      departamento: body.departamento,
      pais: body.pais,
      direccionBodega: body.direccionBodega,
    };
    newBodega = await Bodega.findOne(query);
    if (newBodega) {
      console.log(query);
      console.log("Ya se registro una bodega con la misma ubicacion");
      console.log(newBodega);
    }
  }
  return newBodega;
};

module.exports = Bodega;
