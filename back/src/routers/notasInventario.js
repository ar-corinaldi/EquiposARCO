const express = require("express");
const NotaInventario = require("../models/notaInventario-model");
const Equipo = require("../models/equipo-model");
const Precio = require("../models/precio-model");
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

router.post("/notasInventario/equipos", async (req, res) => {
  let { equipo, notaInventario } = req.body;
  let equipoCreated = null;
  try {
    let preciosN = [];
    if (equipo.precios) {
      await asyncForEach(equipo.precios, async (element) => {
        let precio = new Precio(element);
        precio = await precio.save();

        preciosN.push(precio._id);
      });
      equipo.precios = preciosN;
    }
    equipoCreated = new Equipo(equipo);
    equipoCreated = await equipoCreated.save();

    if (notaInventario) {
      notaInventario.equipo = equipoCreated._id;
      const notaInventarioCreated = new NotaInventario(notaInventario);
      await notaInventarioCreated.save();
    }
    res.status(201).send(equipoCreated);
  } catch (e) {
    console.log("error deleting equipo if created");
    console.log(e);
    const equipoDelete = await Equipo.findByIdAndDelete(equipoCreated._id);
    if (!equipoDelete) {
      return res.status(404).send(["No se encontró ningun equipo cone se id"]);
    }
    await asyncForEach(equipoDelete.precios, async (element) => {
      await Precio.findByIdAndDelete(element._id);
    });
    if (e.length && e.length > 0) {
      return res.status(400).send(e);
    }
    res.status(500).send(["No se pudo crear el equipo ni la orden"]);
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
    console.log(e);
    res.status(400).send(e);
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

// Foreach asincrono
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;
