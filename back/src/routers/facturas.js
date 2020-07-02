var express = require("express");
const Factura = require("../models/factura-model");
var router = express.Router();

/**
 *  Factura
 */

/**
 *  Post de factura
 */
router.post("/facturas", async (req, res) => {
  const factura = new Factura(req.body);
  try {
    await factura.save();
    res.status(201).send(factura);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de facturas
 */
router.get("/facturas", async (req, res) => {
  let facturas = null;
  try {
    facturas = await Factura.find({});
    res.send(facturas);
  } catch (e) {
    res.status(500).send();
    console.log(facturas);
    console.error("error", e);
  }
});

/**
 *  Get de factura por su id.
 */
router.get("/facturas/:id", async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id);
    if (!factura) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(factura);
  } catch (error) {
    res.status(500).send();
    console.error("error", error);
  }
});

/**
 *  Modifica un factura
 */
router.patch("/facturas/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Factura.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!factura) {
      return res.status(404).send();
    }
    res.send(factura);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un factura
 */
router.delete("/facturas/:id", async (req, res) => {
  try {
    const factura = await Factura.findByIdAndDelete(req.params.id);
    if (!factura) {
      return res.status(404).send();
    }
    res.send(factura);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
