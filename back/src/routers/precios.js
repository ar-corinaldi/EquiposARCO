const express = require("express");
const Precio = require("../models/precio-model");
const router = new express.Router();

/**
 * Relacion Equipo -> Precios
 */

/**
 * Agrega un precio nuevo a un equipo
 * FALTA que borre el precio si algo sale mal. Lo hace pero manda un error extraño
 */
router.patch("/equipos/:id/precios", async (req, res) => {
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
router.patch("/equipos/:id/precios/:idP", async (req, res) => {
  try {
    const precio = await Precio.findById(req.params.idP);
    if (!precio) {
      return res.status(404).send("Ningun precio coincidio con ese id");
    }
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      return res.status(404).send("Ningun equipo coincidio con ese id");
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
 * Envia el equipo completo con sus precios.
 */
router.get("/equipos/:id/precios", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id).populate("precios");
    res.send(ans);
  } catch (e) {
    res.status(400).send("No se pudo agregar el precio al equipo " + e);
  }
});

/**
 * Elimina la relacion entre un precio y un equipo y el precio de la tabla precios
 * Retorna primero el precio eliminado y después el equipo modificado
 */
router.delete("/equipos/:id/precios/:idP", async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      return res.status(404).send("No se encontró ningun equipo con ese id");
    }
    let precioBuscado = undefined;
    const numPrecios = equipo.precios.length;
    for (let index = 0; index < numPrecios; index++) {
      if (equipo.precios[index].toString() === req.params.idP) {
        precioBuscado = equipo.precios[index];
        equipo.precios.splice(index);
        break;
      }
    }
    //console.log(precioBuscado);
    if (!precioBuscado) {
      return res
        .status(404)
        .send(
          "No se encontró ese precio dentro de los precios del equipo deseado"
        );
    }
    const prop = { precios: equipo.precios };
    const equipoN = await Equipo.findByIdAndUpdate(req.params.id, prop, {
      new: true,
      runValidators: true,
    });
    const precioEliminado = await Precio.findByIdAndDelete(req.params.idP);
    if (!precioEliminado) {
      return res.status(404).send("No se encontró ningun precio con ese id");
    }
    res.send([precioEliminado, equipoN]);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * PRECIOS
 */

/**
 *  Post de precios
 */
router.post("/precios", async (req, res) => {
  const precio = new Precio(req.body);
  try {
    await precio.save();
    res.status(201).send(precio);
  } catch (e) {
    res.status(400).send("No se pudo crear el precio " + e);
  }
});

/**
 *  Get de precios
 */
router.get("/precios", async (req, res) => {
  try {
    const precios = await Precio.find({});
    res.send(precios);
  } catch (e) {
    res.status(500).send("No se pudieron obtener los precios " + e);
  }
});

/**
 *  Get de precios por su id
 */
router.get("/precios/:id", async (req, res) => {
  try {
    const precio = await Precio.findById(req.params.id);
    if (!precio) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(precio);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo obtener el precio de id: " + req.params.id + " " + e);
  }
});

/**
 *  Modifica un precio
 */
router.patch("/precios/:id", async (req, res) => {
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
      .send("No se pudo modificar el precio de id: " + req.params.id, e);
  }
});

/**
 * Elimina un precio
 */
router.delete("/precios/:id", async (req, res) => {
  try {
    const precio = await Precio.findByIdAndDelete(req.params.id);
    if (!precio) {
      return res.status(404).send();
    }
    res.send(precio);
  } catch (e) {
    res
      .status(500)
      .send("No se pudo eliminar el precio de id: " + req.params.id + " " + e);
  }
});

module.exports = router;
