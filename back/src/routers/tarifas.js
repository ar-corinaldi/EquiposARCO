const express = require("express");
const Precio = require("../models/precio-model");
const Equipo = require("../models/equipo-model");
const Tarifa = require("../models/tarifa-model");

const router = new express.Router();

/**
 * Relacion Cotizacion -> Tarifa
 */

/**
 * Crea una tarifa nueva a una cotizacion
 */
router.post("/cotizaciones/:id/tarifasCotizadas", async (req, res) => {
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

/**
 * Agrega una tarifa existente a una cotizacion
 */
router.patch(
  "/cotizaciones/:id/tarifasCotizadas/:idTarifa",
  async (req, res) => {
    try {
      const cotizacion = await Cotizacion.findById(req.params.id);
      if (!cotizacion) {
        return res.status(404).send("Ninguna cotizacion coincidio con ese id");
      }
      const tarifa = await Tarifa.findById(req.params.idTarifa);
      if (!tarifa) {
        return res.status(404).send("Ninguna tarifa coincidio con ese id");
      }
      cotizacion.tarifasCotizadas.push(tarifa._id);
      await cotizacion.save();
      res.json(cotizacion);
    } catch (e) {
      res.status(400).send(e);
      console.error("error", e);
    }
  }
);

/**
 *  TARIFA
 */

/**
 * Agrega una tarifa
 */
router.post("/tarifas", async (req, res) => {
  const tarifa = new Tarifa(req.body);
  try {
    await tarifa.save();
    res.status(201).json(tarifa);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Obtiene todas las tarifas
 */
router.get("/tarifas", async (req, res) => {
  try {
    const tarifa = await Tarifa.find({});
    res.json(tarifa);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 * Obtiene una tarifa
 */
router.get("/tarifas/:id", async (req, res) => {
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

/**
 * Modifica una tarifa
 */
router.patch("/tarifas/:id", async (req, res) => {
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

/**
 * Elimina una tarifa
 */
router.delete("/tarifas/:id", async (req, res) => {
  try {
    const tarifa = await Tarifa.findByIdAndDelete(req.params.id);
    if (!tarifa) {
      return res.status(404).send();
    }
    res.send(tarifa);
  } catch (error) {
    res.status(500).send(error);
    console.error("error", error);
  }
});

module.exports = router;
