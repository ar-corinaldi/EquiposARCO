const express = require("express");
const NotaInventario = require("../models/notaInventario-model");
const router = new express.Router();

/**
 * Cantidad de documentos que hay en notasInventario
 */
router.get("/notasInventario/cantidad", async (req, res) => {
  try {
    const count = await NotaInventario.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de notas de inventario paginacion
 */
router.get("/notasInventario/:page/:elementsPerPage", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const elementsPerPage = parseInt(req.params.elementsPerPage);
    const notaInventario = await NotaInventario.find({})
      .populate("equipo")
      .populate("orden")
      .populate("proveedor")
      .limit(elementsPerPage)
      .skip((page - 1) * elementsPerPage);
    res.send(notaInventario);
  } catch (e) {
    res.status(400).send("");
    console.error("error", e);
  }
});

/**
 *  Post de notas
 */
router.post("/notasInventario", async (req, res) => {
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
router.get("/notasInventario", async (req, res) => {
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
router.get("/notasInventario/:id", async (req, res) => {
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
router.patch("/notasInventario/:id", async (req, res) => {
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
router.delete("/notasInventario/:id", async (req, res) => {
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
