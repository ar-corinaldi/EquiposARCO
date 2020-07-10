const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Equipo = require("./equipo-model");

const categorias = ["compra", "venta", "fabricación", "reparación", "daño"];

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
      isValid = categorias.includes(value);
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

notaInventarioSchema.pre("save", async function (next) {
  console.log("notaInventario pre middleware");
  const { equipo, cantidad, categoria } = this;
  const newEquipo = await Equipo.findById(equipo).populate({
    path: "componentes",
    populate: {
      path: "equipoID",
    },
  });
  if (!newEquipo) {
    return next(["El equipo no existe"]);
  }
  console.log("Antes de verificar");
  const errores = [];
  console.log(newEquipo.componentes);

  if (newEquipo.componentes && newEquipo.componentes.length > 0) {
    errores.push("Los equipos compuestos no deben tener notas de inventario");
    for (const componente of newEquipo.componentes) {
      if (componente.equipoID) {
        errores.push(
          `Se puede hacer nota de inventario de ${componente.equipoID.nombreEquipo}`
        );
      }
    }
  }

  if (!categorias.includes(categoria)) {
    errores.push(
      `La categoria ${categoria} no pertenece al grupo de categorias`
    );
  }

  if (
    (categoria === "venta" || categoria === "daño") &&
    (newEquipo.cantidadBodega - cantidad < 0 ||
      newEquipo.cantidadTotal - cantidad < 0)
  ) {
    errores.push(
      `No hay suficiente equipo, como para la venta o para que se haya dañado`
    );
  }

  if (errores.length > 0) {
    console.log("No deja hacer save()", errores);
    next(errores);
  } else {
    console.log("Deja hacer save()", newEquipo);
    next();
  }
});

notaInventarioSchema.post("save", async (notaInventario) => {
  console.log("notaInventario post middleware");
  const { categoria, equipo, cantidad } = notaInventario;
  const equipoToUpdate = await Equipo.findById(equipo).populate({
    path: "componentes",
    populate: {
      path: "equipoID",
    },
  });

  if (
    categoria === "compra" ||
    categoria === "fabricación" ||
    categoria === "reparación"
  ) {
    equipoToUpdate.cantidadBodega += cantidad;
    equipoToUpdate.cantidadTotal += cantidad;
  } else if (categoria === "venta" || categoria === "daño") {
    equipoToUpdate.cantidadBodega -= cantidad;
    equipoToUpdate.cantidadTotal -= cantidad;
  } else {
    next(new Error("La categoria no existe"));
  }
  await asyncForEach(equipoToUpdate.componentes, async (componente) => {
    const equipoID = componente.equipoID;
    equipoID.cantidadBodega -= cantidad * componente.cantidad;
    equipoID.cantidadTotal -= cantidad * componente.cantidad;
    await Equipo.findByIdAndUpdate(equipoID._id, equipoID, {
      new: true,
      runValidators: true,
    });
  });

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

// Foreach asincrono
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = NotaInventario;
