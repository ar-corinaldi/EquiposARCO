const express = require("express");
const Orden = require("../models/orden-model");
const Bodega = require("../models/bodega-model");
//const Tercero = require("../models/tercero-model");
const router = express.Router();

/**
 *  Relacion Bodega -> Orden
 */

/**
 * Crea una orden y la agrega a una bodega
 */
router.post("/bodegas/:idB/ordenes", async (req, res) => {
  let orden = null;
  try {
    orden = new Orden(req.body);
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    await orden.save();
    console.log("orden guardada");
    bodega.ordenesActuales.push(orden._id);
    await bodega.save();
    console.log("Bodega aniadida al tercero con exito");
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Agrega una orden creada a una bodega
 */
router.patch("/bodegas/:idB/ordenes/:idOr", async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    const indice = bodega.ordenesActuales.indexOf(orden._id);
    if (indice === -1) {
      return res.status(404).send("La orden no pertenece a la bodega");
    }
    bodega.ordenesActuales.push(orden._id);
    await bodega.save();
    console.log("Bodega aniadida al tercero con exito");
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Terminar una orden.
 * Pasarla de ordenesActuales a ordenesGuardadas
 */
router.patch("/bodegas/:idB/ordenes/:idOr/terminar", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    const orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("La orden existe");
    const indice = bodega.ordenesActuales.indexOf(orden._id);
    if (indice === -1) {
      return res.status(404).send("La orden no pertenece a la bodega");
    }
    bodega.ordenesActuales.splice(indice, 1);
    bodega.ordenesPasadas.push(orden._id);
    await bodega.save();
    console.log("Bodega aniadida al tercero con exito");
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Obtener las ordenes actuales de una bodega
 * Return: las ordenes actuales
 */
router.get("/bodegas/:idB/ordenesActuales", async (req, res, next) => {
  try {
    const bodega = await Bodega.findById(req.params.idB).populate(
      "ordenesActuales"
    );
    if (!bodega) {
      return res.send("La bodega no existe");
    }
    res.send(bodega.ordenesActuales);
    console.log("La bodega existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud " + e);
  }
});

/**
 * Obtener las ordenes pasadas de una bodega
 * Return: las ordenes pasadas
 */
router.get("/bodegas/:idB/ordenesPasadas", async (req, res, next) => {
  try {
    const bodega = await Bodega.findById(req.params.idB).populate(
      "ordenesPasadas"
    );
    if (!bodega) {
      return res.send("La bodega no existe");
    }
    res.send(bodega.ordenesPasadas);
    console.log("La bodega existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud " + e);
  }
});

/**
 *  Orden
 */

/**
 * Cantidad de documentos que hay en Orden
 */
router.get("/ordenes/cantidad", async (req, res) => {
  try {
    const count = await Orden.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res.status(500).send(e);
    console.err(e);
  }
});

/**
 *  Post de Orden
 */
router.post("/ordenes", async (req, res) => {
  const orden = new Orden(req.body);
  try {
    await orden.save();
    res.status(201).send(orden);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de ordenes
 */
router.get("/ordenes", async (req, res) => {
  let ordenes = null;
  try {
    ordenes = await Orden.find({});
    res.send(ordenes);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 *  Get de orden por su id
 */
router.get("/ordenes/:id", async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(orden);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 *  Modifica un orden
 */
router.patch("/ordenes/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Orden.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!orden) {
      return res.status(404).send();
    }
    res.send(orden);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un Orden
 */
router.delete("/terceros/:id", async (req, res) => {
  try {
    const orden = await Orden.findByIdAndDelete(req.params.id);
    if (!orden) {
      return res.status(404).send();
    }
    res.send(orden);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
