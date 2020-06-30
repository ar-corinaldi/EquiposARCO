const express = require("express");
const Orden = require("../models/orden-model");
const Bodega = require("../models/bodega-model");
const Tercero = require("../models/tercero-model");
const router = express.Router({ mergeParams: true });

/* GET users listing. */
router.get("/actuales", async (req, res, next) => {
  try {
    const bodega = await Bodega.findById(req.params.idB).populate(
      ordenesActuales
    );
    if (!bodega) {
      return res.send("La bodega no existe");
    }
    res.send(bodega.ordenesActuales);
    console.log("La bodega existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud", e);
  }
});

/* GET users listing. */
router.get("/pasadas", async (req, res, next) => {
  try {
    const bodega = await Bodega.findById(req.params.idB).populate(
      ordenesPasadas
    );
    if (!bodega) {
      return res.send("La bodega no existe");
    }
    res.send(bodega.ordenesPasadas);
    console.log("La bodega existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud", e);
  }
});

module.exports = router;
