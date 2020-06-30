const express = require("express");
const Precio = require("../models/precio-model");
const Equipo = require("../models/equipo-model");
const Tarifa = require("../models/tarifa-model");

const router = new express.Router();

router.post("", async (req, res) => {
  const tarifa = new Tarifa(req.body);
  try {
    await tarifa.save();
    res.status(201).json(tarifa);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

router.get("", async (req, res) => {
  try {
    const tarifa = await Tarifa.find({});
    res.json(tarifa);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tarifa = await Tarifa.findById(req.params.id)
      .populate("equipo")
      .populate("precioReferencia");
    if (!tarifa) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.json(tarifa);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!Tarifa.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const tarifa = await Tarifa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tarifa) {
      return res.status(404).send();
    }
    res.send(tarifa);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

module.exports = router;
