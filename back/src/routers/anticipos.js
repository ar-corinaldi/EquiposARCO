const express = require("express");
const mongoose = require("mongoose");
const Anticipo = require("../models/anticipo-model");
const router = require("./equipos");
const ObjectId = mongoose.Types.ObjectId;

/**
 * Mete un anticipo en la base de datos
 */
router.post("", async (req, resp) => {
  try {
    const anticipo = new Anticipo(req, body);
    await anticipo.save();
    return resp.status(201).send(anticipo);
  } catch (error) {
    resp.status(400).send(error);
  }
});

/**
 * Get de Anticipos
 */
router.get("", async (req, res) => {
  try {
    const anticipo = await Anticipo.find({});
    res.send(anticipo);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * Devuelve un anticipo por id
 */
router.get("/:id", async (req, resp) => {
  try {
    const anticipo = await Anticipo.findById(req.params.id);
    if (!anticipo) {
      return res.status(404).send("No hubo coincidencia");
    }
    return res.send(anticipo);
  } catch (error) {
    return res.status(500).send();
  }
});
