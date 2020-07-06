const express = require("express");
const Tercero = require("../models/tercero-model");
const Bodega = require("../models/bodega-model");
const bodegasRouter = require("./bodegas");
const router = new express.Router();

/**
 *  Tercero
 */

/**
 * Cantidad de documentos que hay en tercero
 */
router.get("/terceros/cantidad", async (req, res) => {
  try {
    const count = await Tercero.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res.status(500).send(e);
    console.err(e);
  }
});

/**
 *  Post de tercero
 */
router.post("/terceros", async (req, res) => {
  const tercero = new Tercero(req.body);
  try {
    await tercero.save();
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de terceros para paginacion
 */
router.get("/terceros/:page/:elementsPerPage", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const elementsPerPage = parseInt(req.params.elementsPerPage);
    const terceros = await Tercero.find({})
      .limit(elementsPerPage)
      .skip((page - 1) * elementsPerPage);
    res.send(terceros);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 *  Get de terceros
 */
router.get("/terceros", async (req, res) => {
  let terceros = null;
  try {
    terceros = await Tercero.find({});
    res.send(terceros);
  } catch (e) {
    res.status(500).send();
    console.log(terceros);
    console.error("error", e);
  }
});

/**
 *  Get de TODOS los terceros con sus bodegas
 */
router.get("/terceros/bodegas", async (req, res) => {
  let terceros = null;
  try {
    terceros = await Tercero.find({}).populate("bodegas");
    res.send(terceros);
  } catch (e) {
    res.status(500).send();
    console.log(terceros);
    console.error("error", e);
  }
});

/**
 *  Get de tercero por su id. Puebla las bodegas, y en cada bodega las ordenes pasadas y las actuales
 */
router.get("/terceros/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findById(req.params.id)
      .populate({
        path: "bodegas",
        populate: {
          path: "ordenesActuales",
        },
      })
      .populate({
        path: "bodegas",
        populate: {
          path: "ordenesPasadas",
        },
      })
      .populate({
        path: "bodegas",
        populate: {
          path: "cotizaciones",
        },
      });
    if (!tercero) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 *  Modifica un tercero
 */
router.patch("/terceros/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Tercero.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const tercero = await Tercero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tercero) {
      return res.status(404).send();
    }
    res.send(tercero);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un tercero
 */
router.delete("/terceros/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findByIdAndDelete(req.params.id);

    for (let index = 0; index < tercero.bodegas.length; index++) {
      await Bodega.findByIdAndDelete(tercero.bodegas[index]);
    }

    if (!tercero) {
      return res.status(404).send();
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
