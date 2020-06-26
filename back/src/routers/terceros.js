const express = require("express");
const Tercero = require("../models/tercero-model");
const Bodega = require("../models/bodega-model");
const router = new express.Router();

/**
 *  Post de tercero
 */
router.post("", async (req, res) => {
  const tercero = new Tercero(req.body);
  try {
    await tercero.save();
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de terceros
 */
router.get("", async (req, res) => {
  try {
    const terceros = await Tercero.find({});
    res.send(terceros);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Get de tercero por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un tercero
 */
router.patch("/:id", async (req, res) => {
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
    console.log(e);
    res.status(400).send(e);
  }
});

/**
 * Elimina un tercero
 */
router.delete("/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findByIdAndDelete(req.params.id);
    if (!tercero) {
      return res.status(404).send();
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Agrega una bodega nueva a un tercero
 */
router.post("/:id/bodegas", async (req, res) => {
  let newBodega = undefined;
  try {
    newBodega = new Bodega(req.body);
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ninguna tercero coincidio con ese id");
    }
    await newBodega.save();
    tercero.bodegas.push(newBodega._id);
    await tercero.save();
    res.status(201).send(tercero);
  } catch (e) {
    if (newBodega !== undefined) {
      console.log("Debio eliminar la bodega");
      // Manejo en caso de que no se agregue la bodega
      Bodega.findByIdAndDelete(newBodega._id);
    }
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
  }
});

/**
 * Agrega una bodega creada a un tercero
 */
router.post("/:id/bodegas/:idB", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ningun tercero coincidio con ese id");
    }
    if (tercero.bodegas.includes(bodega._id)) {
      return res.status(404).send("La bodega ya existe para ese tercero");
    }
    tercero.bodegas.push(bodega._id);
    await tercero.save();
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
  }
});

/**
 * Obtiene las bodegas de un tercero
 * Envia el tercero completo con sus bodegas.
 */
router.get("/:id/bodegas", async (req, res) => {
  try {
    const tercero = await Tercero.findById(req.params.id).populate("bodegas");
    res.send(tercero);
  } catch (e) {
    res.status(400).send("El tercero con sus bodegas" + e);
  }
});

/**
 * Elimina una bodega de un tercero
 * Envia el tercero completo con sus bodegas.
 */
router.delete("/:id/bodegas/:idB", async (req, res) => {
  try {
    console.log(req.params.idB);
    let idB = req.params.idB;
    const bodega = await Bodega.findById(idB);
    if (!bodega) {
      return res.status(404).send("La bodega no existe");
    }
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("El tercero no existe");
    }
    const cantidadBodegasAntes = tercero.bodegas.length;
    tercero.bodegas = tercero.bodegas.filter(
      (bod) => bod._id.toString() !== bodega._id.toString()
    );
    if (tercero.bodegas.length === cantidadBodegasAntes) {
      return res.status(404).send("La bodega no corresponde al tercero");
    }
    await tercero.save();
    res.send(tercero);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
  }
});

module.exports = router;
