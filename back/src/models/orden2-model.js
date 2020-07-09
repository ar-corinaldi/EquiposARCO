const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://equiposEDI:sharedLogin@cluster0-yur6w.mongodb.net/equiposARCO",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const Precio = require("./precio-model");
const Equipo = require("./equipo-model");
const Tarifa = require("./tarifa-model");

var Schema = mongoose.Schema;

const orden2Schema = new Schema({
  remisiones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remision",
    },
  ],
  devoluciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devolucion",
    },
  ],
  tarifasDefinitivas: [
    {
      equipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
      },
      precioRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Precio",
      },
      tarifas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tarifa",
        },
      ],
    },
  ],
  cotizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cotizacion",
  },
});

const Orden2 = mongoose.model("Orden2", orden2Schema);

const noUpdatable = ["__v"];

Orden2.fieldsNotAllowedUpdates = (body) => {
  const updates = Object.keys(body);

  // Sirve para obtener los campos del modelo
  let allowedUpdates = Object.keys(Orden2.schema.paths);

  // Deja los campos que no queremos moficiar
  allowedUpdates = allowedUpdates.filter(
    (update) => !noUpdatable.includes(update)
  );
  const isValidOp = updates.every((update) => allowedUpdates.includes(update));
  // console.log(updates);
  return isValidOp;
};

const precioTest = new Precio({
  categoria: "unidad",
  valorVenta: 10000,
  valorAlquiler: 10000,
  tiempo: "dia cal",
  tiempoMinimo: 1,
});

precioTest.save();

const equipoPrueba = new Equipo({
  codigo: "ABO008",
  nombreEquipo: "ABRAZADERA 4.5  FP",
  nombreGrupo: "BOMBA CIFA",
  nombreFamilia: "DIVISION DE MAQUINARIA TIPO PESADO",
  tipoEquipo: "MAQUINARIA",
  fechaAdquision: Date.now(),
  precios: [precioTest._id],
});

equipoPrueba.save();

const tarifaPreuba = new Tarifa({
  fechaInicio: "2020-07-03T05:00:00.000+00:00",
  fechaFin: "2020-08-03T05:00:00.000+00:00",
  valorTarifa: "300",
  cantidad: 6,
});

tarifaPreuba.save();

const tarifaPreuba2 = new Tarifa({
  fechaInicio: "2020-06-03T05:00:00.000+00:00",
  fechaFin: "2020-07-03T05:00:00.000+00:00",
  valorTarifa: "800",
  cantidad: 6,
});

tarifaPreuba2.save();

const ordenPrueba = new Orden2({
  remisiones: [],
  devoluciones: [],
  tarifasDefinitivas: [
    {
      equipo: equipoPrueba._id,
      precioRef: precioTest._id,
      tarifas: [tarifaPreuba._id, tarifaPreuba2._id],
    },
  ],
});

console.log("llegs");

ordenPrueba
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = Orden2;
