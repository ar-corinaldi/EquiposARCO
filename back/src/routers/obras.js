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
 *  Get de de una bodega obras. Entrega solo el codigo de las obras bajo el atributo _id
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

module.exports = router;
