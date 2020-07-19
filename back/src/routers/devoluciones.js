var express = require("express");
const Devolucion = require("../models/devolucion-model");
const Orden = require("../models/orden-model");

var router = express.Router();

/**
 *  Relacion Orden -> Devolucion
 */

/**
 * Agrega una nueva devolucion a una orden
 */
router.post("/ordenes/:idOr/devoluciones", async (req, res) => {
  let newDevolucion;
  let orden;
  try {
    orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Encuentra orden", orden);
    console.log("body", req.body);
    newDevolucion = new Devolucion(req.body);
    await newDevolucion.save();
    console.log("Agrega devolucion");
    orden.devoluciones.push(newDevolucion._id);
    await orden.save();
    console.log("Guarda orden con devolucion");
    res.status(201).send(orden);
    console.log("newDevolucion", newDevolucion);
  } catch (e) {
    console.log("Hubo un error");
    if (newDevolucion !== undefined) {
      console.log("Elimina la devolucion");
      // Manejo en caso de que no se agregue la devolucion
      Devolucion.findByIdAndDelete(newDevolucion._id);
      const i = orden.devoluciones.indexOf(newDevolucion._id);
      if (i != -1) {
        orden.devoluciones.splice(i, 1);
      }
    }
    res.status(400).send("No se pudo agregar la devolucion a la orden " + e);
    console.error("error", e);
  }
});

/**
 *  Devolucion
 */

/**
 *  Post de devolucion
 */
router.post("/devoluciones", async (req, res) => {
  const devolucion = new Devolucion(req.body);
  try {
    await devolucion.save();
    res.status(201).send(devolucion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de devoluciones
 */
router.get("/devoluciones", async (req, res) => {
  let devoluciones = null;
  try {
    devoluciones = await Devolucion.find({});
    res.send(devoluciones);
  } catch (e) {
    res.status(500).send();
    console.log(devoluciones);
    console.error("error", e);
  }
});

/**
 *  Get de devolucion por su id.
 */
router.get("/devoluciones/:id", async (req, res) => {
  try {
    const devolucion = await Devolucion.findById(req.params.id);
    if (!devolucion) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(devolucion);
  } catch (error) {
    res.status(500).send();
    console.error("error", error);
  }
});

/**
 *  Modifica un devolucion
 */
router.patch("/devoluciones/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Devolucion.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const devolucion = await Devolucion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!devolucion) {
      return res.status(404).send();
    }
    res.send(devolucion);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un devolucion
 */
router.delete("/devoluciones/:id", async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndDelete(req.params.id);
    if (!devolucion) {
      return res.status(404).send();
    }
    res.send(devolucion);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
