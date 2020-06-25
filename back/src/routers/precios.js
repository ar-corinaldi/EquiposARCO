const express = require("express");
const Precio = require("../models/precio-model");
const router = new express.Router();

/**
 *  Post de precios
 */
const POST = router.post("", async (req, res) => {
  const precio = new Precio(req.body);
  try {
    await precio.save();
    res.status(201).send(precio);
  } catch (e) {
    res.status(400).send("No se pudo crear el precio" + e);
  }
});

/**
 *  Get de precios
 */
router.get("", async (req, res) => {
  try {
    const precios = await Precio.find({});
    res.send(precios);
  } catch (e) {
    res.status(500).send("No se pudieron obtener los precios" + e);
  }
});

/**
 *  Get de precios por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const precio = await Precio.findById(req.params.id);
    if (!precio) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(precio);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo obtener el precio de id: " + req.params.id + e);
  }
});

/**
 *  Modifica un precio
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Precio.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }

    const precio = await Precio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!precio) {
      return res.status(404).send();
    }
    res.send(precio);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send(
        "No se pudo modificar el precio el precio de id: " + req.params.id,
        e
      );
  }
});

/**
 * Elimina un precio
 */
router.delete("/:id", async (req, res) => {
  try {
    const precio = await Precio.findByIdAndDelete(req.params.id);
    if (!precio) {
      return res.status(404).send();
    }
    res.send(precio);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo eliminar el precio de id: " + req.params.id + e);
  }
});

module.exports = router;
