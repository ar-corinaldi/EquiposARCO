var express = require("express");
const Vehiculo = require("../models/vehiculo-model");
var router = express.Router();

/**
 * VEHICULO
 */

/**
 *  Crea un vehiculo
 */
router.post("/vehiculos", async (req, res) => {
  const vehiculo = new Vehiculo(req.body);
  try {
    await vehiculo.save();
    res.status(201).send(bodega);
  } catch (e) {
    console.error("Error", e);
    res.status(400).send(e);
  }
});

/**
 *  Obtiene  Vehiculos
 */
router.get("/vehiculos", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find({});
    res.send(vehiculos);
  } catch (e) {
    console.error("Error", e);
    res.status(500).send();
  }
});

/**
 *  Obtiene Vehiculo por su id
 */
router.get("/vehiculos/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(vehiculo);
  } catch (error) {
    console.error("Error", e);
    res.status(500).send();
  }
});

/**
 *  Modifica un Vehiculo
 */
router.patch("/vehiculos/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Vehiculo.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas al vehiculo");
    }

    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vehiculo) {
      return res.status(404).send();
    }
    res.send(vehiculo);
  } catch (e) {
    console.error("Error", e);
    res.status(400).send(e);
  }
});

/**
 * Elimina un Vehiculo
 */
router.delete("/vehiculos/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).send("El vehiculo no existe");
    }
    res.send(vehiculo);
  } catch (error) {
    console.error("Error", e);
    res.status(500).send(error);
  }
});

module.exports = router;
