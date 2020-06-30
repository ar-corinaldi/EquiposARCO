const express = require("express");
const Cotizacion = require("../models/cotizacion-model");
const Tarifa = require("../models/tarifa-model");

const router = new express.Router();

router.post("", async (req, res) => {
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

    const cotizacion = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!cotizacion) {
      return res.status(404).send();
    }
    res.send(cotizacion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

router.post("/:id/tarifasCotizadas", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id);
    const tarifa = new Tarifa(req.body);
    await tarifa.save();

    cotizacion.tarifasCotizadas.push(tarifa._id);
    await cotizacion.save();
  } catch (error) {
    if (tarifa !== undefined) {
      Tarifa.findByIdAndDelete(tarifa._id);
    }
  }
});

router.patch("/:id/tarifasCotizadas/:idTarifa", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id);
    console.log(req.params);
    
    const tarifa = await Tarifa.findById(req.params.idTarifa);
    console.log("aquí");
    
    cotizacion.tarifasCotizadas.push(tarifa._id);
    console.log("acá");
    
    await cotizacion.save();
    // console.log(cotizacion);
    res.json(cotizacion);
    
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

module.exports = router;
