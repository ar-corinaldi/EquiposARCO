const express = require("express");
const Cliente = require("../models/cliente-model");
const router = new express.Router();

/**
 *  Post de clientes
 */
router.post("", async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    await cliente.save();
    res.status(201).send(cliente);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de clientes
 */
router.get("", async (req, res) => {
  try {
    const clientes = await Cliente.find({});
    res.send(clientes);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Get de cliente por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(cliente);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un cliente
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Cliente.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cliente) {
      return res.status(404).send();
    }
    res.send(cliente);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

/**
 * Elimina un cliente
 */
router.delete("/:id", async (req, res) => {
  try {
    const cliente = await cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).send();
    }
    res.send(cliente);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
