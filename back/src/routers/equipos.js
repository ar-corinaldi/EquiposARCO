const express = require("express");
const mongoose = require("mongoose");
const Equipo = require("../models/equipo-model");
const router = new express.Router();
const Precio = require("../models/precio-model");

/**
 *  Post de equipo. Crea primero los precios en su tabla correspondiente y después pasa los ids
 */
router.post("", async (req, res) => {
  try {
    let preciosN = [];
    if (req.body.precios != undefined) {
      await asyncForEach(req.body.precios, async (element) => {
        const precio = new Precio(element);
        await precio.save();
        //console.log(precio._id);
        preciosN.push(precio._id);
      });
      //console.log(preciosN, "ans");
      req.body.precios = preciosN;
    }
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.status(201).send(equipo);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 *  Get de equipos
 */
router.get("", async (req, res) => {
  try {
    const equipos = await Equipo.find({});
    res.send(equipos);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Get de equipo por su id
 */
router.get("/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      res.status(404).send("No hubo coincidencia");
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un equipo
 */
router.patch("/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables

  try {
    if (!Equipo.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }
    ("console.log(req.body)");
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * Elimina un equipo
 */
router.delete("/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).send();
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Agrega un precio nuevo a un equipo
 * FALTA que borre el precio si algo sale mal. Lo hace pero mandao un error extraño
 */
router.post("/:id/precios", async (req, res) => {
  const precio = new Precio(req.body);
  try {
    await precio.save();
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      await Precio.findByIdAndDelete(precio._id);
      res.status(404).send("Ningun equipo coincidio con ese id");
    }
    const preciosN = equipo.precios;
    preciosN.push(precio._id);
    const prop = { precios: preciosN };
    const equipoN = await Equipo.findByIdAndUpdate(req.params.id, prop, {
      new: true,
      runValidators: true,
    });
    if (!equipoN) {
      await Precio.findByIdAndDelete(precio._id);
      return res.status(404).send();
    }
    res.status(201).send(equipoN);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});

/**
 * Agrega un precio creado a un equipo
 */
router.post("/:id/precios/:idP", async (req, res) => {
  try {
    const precio = await Precio.findById(req.params.idP);
    if (!precio) {
      res.status(404).send("Ningun precio coincidio con ese id");
    }
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      res.status(404).send("Ningun equipo coincidio con ese id");
    }
    const preciosN = equipo.precios;
    preciosN.push(precio._id);
    const prop = { precios: preciosN };
    const equipoN = await Equipo.findByIdAndUpdate(req.params.id, prop, {
      new: true,
      runValidators: true,
    });
    if (!equipoN) {
      return res.status(404).send();
    }
    res.status(201).send(equipoN);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});

/**
 * Obtiene los precios de un equipo
 */
router.get("/:id/precios", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id).populate("precios");
    res.send(ans);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});

/**
 * Agrega un equipo creado a un equipo como componente
 */
router.post("/:id/componentes/:idC/:cant", async (req, res) => {
  try {
    const componente = await Equipo.findById(req.params.idC);
    if (!componente) {
      res.status(404).send("Ningun componente coincide con ese id");
    }
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      res.status(404).send("Ningun equipo coincidio con ese id");
    }
    const componentesN = equipo.componentes;
    componentesN.push({ cantidad: req.params.cant, equipoID: componente._id });
    const prop = { componentes: componentesN };
    const equipoN = await Equipo.findByIdAndUpdate(req.params.id, prop, {
      new: true,
      runValidators: true,
    });
    if (!equipoN) {
      return res.status(404).send();
    }
    res.status(201).send(equipoN);
  } catch (e) {
    res.status(400).send("No se pudo agregar el componente al equipo " + e);
  }
});

/**
 * Obtiene los componentes de un equipo. Puede ser un poco demorado. No hice index join
 */
router.get("/:id/componentes", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id);
    for (let index = 0; index < ans.componentes.length; index++) {
      const equipoInfo = await Equipo.findById(ans.componentes[index].equipoID);
      ans.componentes[index].equipoID = equipoInfo;
    }
    res.send(ans);
  } catch (e) {
    res.status(400).send("No se pudo agregar el componente al equipo " + e);
  }
});

// Foreach asincrono
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;
