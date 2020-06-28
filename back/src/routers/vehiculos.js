var express = require("express");
const Vehiculo = require("../models/vehiculo-model");
var router = express.Router();

/**
 *  POST de vehiculo
 */
router.post("", async (req, res) => {
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
 *  Get de Vehiculos
 */
router.get("", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find({});
    res.send(vehiculos);
  } catch (e) {
    console.error("Error", e);
    res.status(500).send();
  }
});

/**
 *  Get de Vehiculo por su id
 */
router.get("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Vehiculo.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
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
router.delete("/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).send("La bodega no existe");
    }
    res.send(vehiculo);
  } catch (error) {
    console.error("Error", e);
    res.status(500).send();
  }
});

module.exports = router;
