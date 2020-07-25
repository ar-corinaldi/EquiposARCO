const express = require("express");
const Orden = require("../models/orden-model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//const Tercero = require("../models/tercero-model");
const router = express.Router();

/**
 *  OBRAS
 */

/**
 *  Get de obras. Entrega solo el codigo de las obras bajo el atributo _id
 */
router.get("/obras", async (req, res) => {
  let ordenes = null;
  try {
    ordenes = await Orden.aggregate([
      { $project: { codigoObra: 1, _id: 0 } },
      { $group: { _id: "$codigoObra" } },
    ]);
    res.send(ordenes);
  } catch (e) {
    res.status(500).send("Error del sistema");
  }
});

/**
 *  Get de obras de una bodega. Entrega solo el codigo de las obras bajo el atributo _id
 */
router.get("/bodegas/:idB/obras", async (req, res) => {
  let ordenes = null;
  try {
    console.log(req.params.idB);
    ordenes = await Orden.aggregate([
      { $match: { bodega: ObjectId(req.params.idB) } },
      { $project: { codigoObra: 1, _id: 0 } },
      { $group: { _id: "$codigoObra" } },
    ]);
    console.log(ordenes);
    res.send(ordenes);
  } catch (e) {
    res.status(500).send("Error del sistema");
  }
});

/**
 *  Get las ordenes de cada obras de una bodega .Entrega solo el codigo de las obras bajo el atributo _id y las ordenes
 */
router.get("/bodegas/:idB/obras/ordenes", async (req, res) => {
  let ordenes = null;
  try {
    ordenes = await Orden.aggregate([
      { $match: { bodega: ObjectId(req.params.idB) } },
      {
        $group: {
          _id: "$codigoObra",
          ordenes: { $push: { codigo: "$codigo", _id: "$_id" } },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log(ordenes);
    res.send(ordenes);
  } catch (e) {
    res.status(500).send("Error del sistema");
  }
});

module.exports = router;
