const express = require("express");
const Cotizacion = require("../models/cotizacion-model");

const Router = new express.Router();

router.post("", async (req, resp) => {
  const cotizacion = new Cotizacion(req.body);
  try {
    await cotizacion.save();
    res.status(201).json(cotizacion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

router.get("", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.find({});
    res.json(cotizacion);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id).populate(
      "tarifasCotizadas"
    );

    if (!cotizacion) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.json(cotizacion);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

router.patch("/:id", async (req, res) => {
    try {
      if (!Cotizacion.fieldsNotAllowedUpdates(req.body)) {
        return res.status(400).send({ error: "Invalid updates" });
      }
  
      const cotizacion = await Cotizacion.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!cotizacion) {
        return res.status(404).send();
      }
      res.send(cotizacion);
    } catch (e) {
      res.status(400).send(e);
      console.error("error", e);
    }
  });

  module.exports = router;
