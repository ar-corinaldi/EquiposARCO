var express = require("express");
const Remision = require("../models/remision-model");
var router = express.Router();

/**
 *  Remision
 */

/**
 *  Post de remision
 */
router.post("/remisiones", async (req, res) => {
  const remision = new Remision(req.body);
  try {
    await remision.save();
    res.status(201).send(remision);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de remisiones
 */
router.get("/remisiones", async (req, res) => {
  let remisiones = null;
  try {
    remisiones = await Remision.find({});
    res.send(remisiones);
  } catch (e) {
    res.status(500).send();
    console.log(remisiones);
    console.error("error", e);
  }
});

/**
 *  Get de remision por su id.
 */
router.get("/remisiones/:id", async (req, res) => {
  try {
    const remision = await Remision.findById(req.params.id);
    if (!remision) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(remision);
  } catch (error) {
    res.status(500).send();
    console.error("error", error);
  }
});

/**
 *  Modifica un remision
 */
router.patch("/remisiones/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Remision.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const remision = await Remision.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!remision) {
      return res.status(404).send();
    }
    res.send(remision);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un remision
 */
router.delete("/remisiones/:id", async (req, res) => {
  try {
    const remision = await Remision.findByIdAndDelete(req.params.id);
    if (!remision) {
      return res.status(404).send();
    }
    res.send(remision);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
