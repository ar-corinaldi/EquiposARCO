const express = require("express");
const mongoose = require("mongoose");
const Equipo = require("../models/equipo-model");
const router = new express.Router();
const Precio = require("../models/precio-model");

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
    ("console.log(req.body)");
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

/**
 * Agrega un precio a un equipo
 */
router.post("/:id/precios", async (req, res) => {
  const precio = new Precio(req.body);
  try {
    await precio.save();
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      res.status(404).send("No hubo coincidencia");
    }
    const preciosN = equipo.precios;
    preciosN.push(precio._id);
    const prop = { precios: preciosN };
    const equipoN = await Equipo.findByIdAndUpdate(req.params.id, prop, {
      new: true,
      runValidators: true,
    });
    if (!equipoN) {
      return res.status(404).send();
    }
    res.stauts(201).send(equipoN);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});
//link util: https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/

/**
 * Obtiene los precios de un equipo
 */
router.get("/:id/precios", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id).populate("precios");
    res.send(ans);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});

module.exports = router;
