const express = require("express");
const NotaInventario = require("../models/notaInventario-model");
const router = new express.Router();

/**
 *  Post de notas
 */
router.post("", async (req, res) => {
  const nota = new NotaInventario(req.body);
  try {
    await nota.save();
    res.status(201).send(nota);
  } catch (e) {
    res.status(400).send("No se pudo crear la nota de inventario " + e);
  }
});

/**
 *  Get de notas
 */
router.get("", async (req, res) => {
  try {
    const notas = await NotaInventario.find({});
    res.send(notas);
  } catch (e) {
    res
      .status(500)
      .send("No se pudieron obtener las notas de inventario " + " " + e);
  }
});

/**
 *  Get de notas por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const nota = await NotaInventario.findById(req.params.id);
    if (!nota) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(nota);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo obtener la nota de id: " + req.params.id + " " + e);
  }
});

/**
 *  Modifica una nota
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!NotaInventario.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }

    const nota = await NotaInventario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!nota) {
      return res
        .status(404)
        .send("No se encuentra la nota de id: " + req.params.id + " " + e);
    }
    res.send(nota);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send("No se pudo modificar la nota de id: " + req.params.id, e);
  }
});

/**
 * Elimina una nota
 */
router.delete("/:id", async (req, res) => {
  try {
    const nota = await NotaInventario.findByIdAndDelete(req.params.id);
    if (!nota) {
      return res.status(404).send();
    }
    res.send(nota);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo eliminar la nota de id: " + req.params.id + e);
  }
});

module.exports = router;
