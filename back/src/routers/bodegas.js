const express = require("express");
const Bodega = require("../models/bodega-model");
const router = new express.Router();

/**
 *  Post de Bodega
 */
router.post("", async (req, res) => {
  const bodega = new Bodega(req.body);
  try {
    await bodega.save();
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de Bodegas
 */
router.get("", async (req, res) => {
  try {
    const bodegas = await Bodega.find({});
    res.send(bodegas);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Get de Bodega por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.id);
    if (!bodega) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(bodega);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un Bodega
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Bodega.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const bodega = await Bodega.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bodega) {
      return res.status(404).send();
    }
    res.send(bodega);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Elimina un Bodega
 */
router.delete("/:id", async (req, res) => {
  try {
    const bodega = await Bodega.findByIdAndDelete(req.params.id);
    if (!bodega) {
      return res.status(404).send();
    }
    res.send(bodega);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
