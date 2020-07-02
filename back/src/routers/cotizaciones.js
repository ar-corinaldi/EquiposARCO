const express = require("express");
const Cotizacion = require("../models/cotizacion-model");
const Tarifa = require("../models/tarifa-model");
const Bodega = require("../models/bodega-model");
const router = new express.Router();

/**
 *  Relacion Bodega -> Cotizacion
 */

/**
 * Crea una Cotización y la agrega a una bodega
 */
router.post("/bodegas/:idB/cotizaciones", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("La bodega no existe");
    }
    const cotizacion = new Cotizacion(req.body);
    await cotizacion.save();
    bodega.cotizaciones.push(cotizacion._id);
    await bodega.save();
    res.json(bodega);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Agrega una Cotización existente a una bodega
 */
router.patch("/bodegas/:idB/cotizaciones/:idC", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("La bodega no existe");
    }
    const cotizacion = await Cotizacion.findById(req.params.idC);
    if (!cotizacion) {
      return res
        .status(404)
        .send("La cotizacion con el id especificado no existe");
    }
    bodega.cotizaciones.push(req.params.idC);
    await bodega.save();
    res.json(bodega);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * Cotizacion
 */

/**
 *  Crea una cotizacion
 */
router.post("/cotizaciones", async (req, res) => {
  const cotizacion = new Cotizacion(req.body);
  try {
    await cotizacion.save();
    res.status(201).json(cotizacion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Obtiene todas las cotizaciones
 */
router.get("/cotizaciones", async (req, res) => {
  try {
    const cotizacion = await Cotizacion.find({});
    res.json(cotizacion);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 * Cotizacion especifica
 */
router.get("/cotizaciones/:id", async (req, res) => {
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

/**
 * Modificar una cotizacion
 */
router.patch("/cotizaciones/:id", async (req, res) => {
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

module.exports = router;
