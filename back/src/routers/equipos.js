const express = require("express");
const Equipo = require("../models/equipo-model");
const router = new express.Router();

/**
 *  Post de equipo
 */
router.post("", async (req, res) => {
  const equipo = new Equipo(req.body);
  try {
    await equipo.save();
    res.status(201).send(equipo);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de equipos
 */
router.get("", async (req, res) => {
  try {
    const equipos = await Equipo.find({});
    res.send(equipos);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Get de equipo por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un equipo
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Equipo.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Elimina un equipo
 */
router.delete("/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
