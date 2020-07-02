var express = require("express");
const Devolucion = require("../models/devolucion-model");
var router = express.Router();

/**
 *  Devolucion
 */

/**
 *  Post de devolucion
 */
router.post("/devoluciones", async (req, res) => {
  const devolucion = new Devolucion(req.body);
  try {
    await devolucion.save();
    res.status(201).send(devolucion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de devoluciones
 */
router.get("/devoluciones", async (req, res) => {
  let devoluciones = null;
  try {
    devoluciones = await Devolucion.find({});
    res.send(devoluciones);
  } catch (e) {
    res.status(500).send();
    console.log(devoluciones);
    console.error("error", e);
  }
});

/**
 *  Get de devolucion por su id.
 */
router.get("/devoluciones/:id", async (req, res) => {
  try {
    const devolucion = await Devolucion.findById(req.params.id);
    if (!devolucion) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(devolucion);
  } catch (error) {
    res.status(500).send();
    console.error("error", error);
  }
});

/**
 *  Modifica un devolucion
 */
router.patch("/devoluciones/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Devolucion.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const devolucion = await Devolucion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!devolucion) {
      return res.status(404).send();
    }
    res.send(devolucion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un devolucion
 */
router.delete("/devoluciones/:id", async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndDelete(req.params.id);
    if (!devolucion) {
      return res.status(404).send();
    }
    res.send(devolucion);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
