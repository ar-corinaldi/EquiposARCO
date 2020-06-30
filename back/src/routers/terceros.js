const express = require("express");
const Tercero = require("../models/tercero-model");
const Bodega = require("../models/bodega-model");
const bodegasRouter = require("./bodegas");
const router = new express.Router();
router.use("/:id/bodegas", bodegasRouter);

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
    console.error("error", e);
  }
});

/**
 *  Get de terceros
 */
router.get("", async (req, res) => {
  try {
    const terceros = await Tercero.find({});
    res.json(terceros);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 *  Get de tercero por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findById(req.params.id).populate("bodegas");
    if (!tercero) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
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
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un tercero
 */
router.delete("/:id", async (req, res) => {
  try {
    const tercero = await Tercero.findByIdAndDelete(req.params.id);

    for (let index = 0; index < tercero.bodegas.length; index++) {
      await Bodega.findByIdAndDelete(tercero.bodegas[index]);
    }

    if (!tercero) {
      return res.status(404).send();
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

// Obras Pasadas

/**
 * Finaliza una obra, pasa de obrasActuales a obrasPasadas
 */
// No tiene sentido, tiene sentido en bodegas.js para ordenes pasadas
router.patch("/:id/bodegas/:idB/finalizar", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    bodega.fechaFinal = new Date();
    await bodega.save();
    if (!bodega.fechaFinal) {
      return res.status(404).send("La bodega no tiene fecha final");
    }
    console.log("La bodega tiene fecha final");

    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ningun tercero coincidio con ese id");
    }
    console.log("El tercero existe");

    let lenObrasActuales = tercero.obrasActuales.length;
    tercero.obrasActuales = tercero.obrasActuales.filter(
      (bod) => bod._id.toString() === bodega._id.toString()
    );
    if (lenObrasActuales === tercero.obrasActuales.length) {
      console.log(
        tercero.obrasActuales,
        lenObrasActuales,
        tercero.obrasActuales.length
      );
      return res.status(404).send("No es una bodega actual");
    }
    console.log("La bodega existe actualmente");

    if (tercero.obrasPasadas.includes(req.params.idB)) {
      return res.status(404).send("La bodega ya se cerró");
    }
    console.log("No se ha cerrado anteriormente");

    tercero.obrasPasadas.push(bodega._id);
    await tercero.save();
    console.log("La bodega se ha cerrado con éxito");
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Elimina una obra pasada
 */
// No tiene sentido, tiene sentido en ordenes.js para obrasPasadas
router.delete("/:id/bodegas/:idB/finalizar", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    if (!bodega.fechaFinal) {
      return res.status(404).send("La bodega no tiene fecha final");
    }
    console.log("La bodega tiene fecha final");

    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ningun tercero coincidio con ese id");
    }
    console.log("El tercero existe");

    let lenObrasPasadas = tercero.obrasPasadas.length;
    tercero.obrasPasadas = tercero.obrasPasadas.filter(
      (bod) => bod._id.toString() === bodega._id.toString()
    );

    if (lenObrasPasadas !== tercero.obrasPasadas.length) {
      return res.status(404).send("No es una bodega pasada");
    }
    console.log("Es una bodega pasada");

    if (tercero.obrasActuales.includes(req.params.idB)) {
      return res.status(404).send("Es una bodega actual");
    }
    console.log("No es una bodega actual");

    await tercero.save();
    console.log("La bodega se ha cerrado con éxito");
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

module.exports = router;
