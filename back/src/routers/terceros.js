const express = require("express");
const Tercero = require("../models/tercero-model");
const Bodega = require("../models/bodega-model");
const router = new express.Router();

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
    const tercero = await Tercero.findById(req.params.id);
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
    if (!tercero) {
      return res.status(404).send();
    }
    res.send(tercero);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

// obrasActuales

/**
 * Agrega una bodega/obra actual nueva a un tercero
 */
router.post("/:id/bodegas", async (req, res) => {
  let newBodega = undefined;
  try {
    newBodega = new Bodega(req.body);
    const tercero = await Tercero.findById(req.params.id);
    console.log("Encuentra tercero", tercero);
    if (!tercero) {
      return res.status(404).send("Ninguna tercero coincidio con ese id");
    }
    await newBodega.save();
    console.log("Guarda bodega");
    tercero.obrasActuales.push(newBodega._id);
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
 * Agrega una bodega creada a un tercero
 */
router.patch("/:id/bodegas/:idB", async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    const tercero = await Tercero.findById(req.params.id);
    if (!tercero) {
      return res.status(404).send("Ningun tercero coincidio con ese id");
    }
    console.log("El tercero existe");
    if (tercero.obrasActuales.includes(req.params.idB)) {
      return res.status(404).send("La bodega ya existe para ese tercero");
    }
    console.log("La bodega no existe en el tercero");
    tercero.obrasActuales.push(bodega._id);
    await tercero.save();
    console.log("Bodega aniadida al tercero con exito");
    res.status(201).send(tercero);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Obtiene las bodegas de un tercero
 * Envia el tercero completo con sus bodegas.
 */
router.get("/:id/bodegas", async (req, res) => {
  try {
    const tercero = await Tercero.findById(req.params.id).populate("bodegas");
    if (!tercero) {
      return res.status(404).send("No se encontro el tercero");
    }
    console.log("tercero encontrado");
    res.send(tercero);
  } catch (e) {
    res.status(400).send("El tercero con sus bodegas" + e);
    console.error("error", e);
  }
});

/**
 * Elimina una bodega de un tercero
 * Envia el tercero completo con sus bodegas.
 */
router.delete("/:id/bodegas/:idB", async (req, res) => {
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
    const cantidadBodegasAntes = tercero.obrasActuales.length;
    tercero.obrasActuales = tercero.obrasActuales.filter(
      (bod) => bod._id.toString() !== bodega._id.toString()
    );
    if (tercero.obrasActuales.length === cantidadBodegasAntes) {
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

// Obras Pasadas
/**
 * Finaliza una obra, pasa de obrasActuales a obrasPasadas
 */
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
