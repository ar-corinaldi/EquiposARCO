const express = require("express");
const Equipo = require("../models/equipo");
const router = new express.Router();

/**
 *  Post de equipo
 */
router.post("/equipos", async (req, res) => {
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
router.get("/equipos", async (req, res) => {
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
router.get("/equipos/:id", async (req, res) => {
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

module.exports = router;
