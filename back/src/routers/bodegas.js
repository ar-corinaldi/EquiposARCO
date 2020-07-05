const express = require("express");
const Bodega = require("../models/bodega-model");
const Orden = require("../models/orden-model");
const Tercero = require("../models/tercero-model");
const Cotizacion = require("../models/cotizacion-model");
const ordenesRouter = require("../routers/ordenes");
const router = new express.Router();

/**
 *  Relacion Tercero -> Bodega
 */

/**
 * Agrega una bodega nueva a un tercero
 */
router.post("/terceros/:id/bodegas", async (req, res) => {
  let newBodega = undefined;
  try {
    newBodega = await Bodega.findByLocalizacion(req.body);
    if (newBodega) {
      console.log("El usuario ya tiene la bodega agregada");
      return res
        .status(404)
        .send("Ya se registro una bodega con la misma ubicacion");
    }
    console.log("La bodega no es existente");
    newBodega = new Bodega(req.body);
    const tercero = await Tercero.findById(req.params.id);
    console.log("Encuentra tercero", tercero);
    if (!tercero) {
      return res.status(404).send("Ninguna tercero coincidio con ese id");
    }
    await newBodega.save();
    console.log("Agrega bodega");
    tercero.bodegas.push(newBodega._id);
    await tercero.save();
    console.log("Guarda tercero con bodega");
    res.status(201).send(tercero);
  } catch (e) {
    console.log("Hubo un error");
    if (newBodega !== undefined) {
      console.log("Elimina la bodega");
      // Manejo en caso de que no se agregue la bodega
      Bodega.findByIdAndDelete(newBodega._id);
    }
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Agrega una bodega existente a un tercero
 */
router.patch("/terceros/:id/bodegas/:idB", async (req, res) => {
  try {
    const newBodega = await Bodega.findById(req.params.idB);
    if (!newBodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ningun tercero coincidio con ese id");
    }
    console.log("Existe el tercero");
    tercero.bodegas.push(newBodega._id);
    await tercero.save();
    console.log("Guarda tercero con bodega");
    res.status(201).send(tercero);
  } catch (e) {
    console.log("Hubo un error");
    if (newBodega !== undefined) {
      console.log("Elimina la bodega");
      // Manejo en caso de que no se agregue la bodega
      Bodega.findByIdAndDelete(newBodega._id);
    }
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Obtiene las bodegas de un tercero
 * Return: SOLO las bodegas del tercero con sus ordenes actuales y pasadas pobladas
 */
router.get("/terceros/:id/bodegas", async (req, res) => {
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
      });
    if (!tercero) {
      return res.status(404).send("No se encontro el tercero");
    }
    console.log("tercero encontrado");
    res.send(tercero.bodegas);
  } catch (e) {
    res.status(400).send("El tercero con sus bodegas" + e);
    console.error("error", e);
  }
});

/**
 * Elimina una bodega de un tercero
 * Envia el tercero completo con sus bodegas
 * NO elimina las ordenes de la bodega. FALTA
 */
router.delete("/terceros/:id/bodegas/:idB", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("La bodega no existe");
    }
    console.log("La bodega existe");
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("El tercero no existe");
    }
    console.log("El tercero existe");
    const lenBodegas = tercero.bodegas.length;
    tercero.bodegas = tercero.bodegas.filter(
      (bod) => bod._id.toString() !== bodega._id.toString()
    );
    if (tercero.bodegas.length === lenBodegas) {
      return res.status(404).send("La bodega no corresponde al tercero");
    }
    console.log("La bodega no corresponde al tercero");
    await tercero.save();
    console.log("Bodega eliminada del tercero");
    res.send(tercero);
  } catch (e) {
    console.error(e);
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
  }
});

/**
 *  Bodega
 */

/**
 * Get de todas las bodegas que existen. No necesita un id de un tercero
 */
router.get("/bodegas", async (req, res) => {
  try {
    const bodegas = await Bodega.find({});
    res.send(bodegas);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * Get de Bodega por su id
 */
router.get("/bodegas/:idB", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(bodega);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Modifica un Bodega
 * Ruta: bodegas/actual/:idB
 */
router.patch("/bodegas/:idB", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Bodega.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const bodega = await Bodega.findByIdAndUpdate(req.params.idB, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bodega) {
      return res.status(404).send();
    }
    res.send(bodega);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Elimina un Bodega
 * Ruta: bodegas/actual/:idB
 */
router.delete("/bodegas/:idB", async (req, res) => {
  try {
    const bodega = await Bodega.findByIdAndDelete(req.params.idB);
    if (!bodega) {
      return res.status(404).send("La bodega no existe");
    }
    res.send(bodega);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
