const express = require("express");
const Proveedor = require("../models/proveedor-model");
const router = new express.Router();

/**
 *  Post de proovedor
 */
router.post("", async (req, res) => {
  const proveedor = new Proveedor(req.body);
  try {
    await proveedor.save();
    res.status(201).send(proveedor);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de proveedores
 */
router.get("", async (req, res) => {
  try {
    const proveedores = await Proveedor.find({});
    res.send(proveedores);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 *  Get de proveedor por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(proveedor);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 *  Modifica un proveedor
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Proveedor.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!proveedor) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(proveedor);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/**
 * Elimina un proveedor
 */
router.delete("/:id", async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send("No hubo coincidencia");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
