const express = require("express");
//const mongoose = require("mongoose");
const Equipo = require("../models/equipo-model");
const router = new express.Router();
const Precio = require("../models/precio-model");

/**
 * EQUIPO
 */

/**
 * Cantidad de documentos que hay en equipo
 */
router.get("/equipos/cantidad", async (req, res) => {
  try {
    const count = await Equipo.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res
      .status(500)
      .send("No se pudo contar los equipos, hubo un error en el sistema");
  }
});

/**
 *  Post de equipo. Crea primero los precios en su tabla correspondiente y después pasa los ids
 */
router.post("/equipos", async (req, res) => {
  try {
    let preciosN = [];
    if (req.body.precios) {
      await asyncForEach(req.body.precios, async (element) => {
        const precio = new Precio(element);
        await precio.save();
        preciosN.push(precio._id);
      });
      req.body.precios = preciosN;
    }
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.status(201).send(equipo);
  } catch (e) {
    res
      .status(500)
      .send(["No se pudo crear el equipo, hubo un error en el sistema"]);
  }
});

/**
 *  Get de equipos paginacion
 */
router.get("/equipos/:page/:elementsPerPage", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const elementsPerPage = parseInt(req.params.elementsPerPage);
    const equipos = await Equipo.find({})
      .limit(elementsPerPage)
      .skip((page - 1) * elementsPerPage);

    res.send(equipos);
  } catch (e) {
    res
      .status(500)
      .send(["No se pudieron listar los equipos, hubo un error en el sistema"]);
    console.error("error", e);
  }
});

/**
 *  Get de equipos
 */
router.get("/equipos", async (req, res) => {
  try {
    const equipos = await Equipo.find({});
    res.send(equipos);
  } catch (e) {
    res.status(500).send([]);
  }
});

/**
 *  Get de equipo por su id
 */
router.get("/equipos/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id)
      .populate("precios")
      .populate("propiedades")
      .populate({
        path: "componentes",
        populate: {
          path: "equipoID",
        },
      });
    if (!equipo) {
      return res.status(404).send(["No se encontró el equipo"]);
    }
    res.send(equipo);
  } catch (e) {
    res.status(500).send("Hubo un error en el sistema");
  }
});

/**
 *  Get de equipo por su id
 */
router.get("/equipos/codigo/:idCod/", async (req, res) => {
  try {
    const equipo = await Equipo.findOne({ codigo: req.params.idCod })
      .populate("precios")
      .populate("propiedades");
    if (!equipo) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un equipo
 */
router.patch("/equipos/:id", async (req, res) => {
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
 * Elimina un equipo y sus precios correspondientes
 */
router.delete("/equipos/:id", async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) {
      return res.status(404).send("No se encontró ningun equipo cone se id");
    }
    await asyncForEach(equipo.precios, async (element) => {
      const precio = await Precio.findByIdAndDelete(element._id);
    });
    res.send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Relacion Equipo -> (Componente) Equipo
 */

/**
 * Agrega un equipo creado a un equipo como componente
 */
router.patch("/equipos/:id/componentes/:idC/:cant", async (req, res) => {
  try {
    const componente = await Equipo.findById(req.params.idC);
    if (!componente) {
      return res.status(404).send("Ningun componente coincide con ese id");
    }
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) {
      return res.status(404).send("Ningun equipo coincidio con ese id");
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
 * Obtiene los componentes de un equipo.
 * Envia el equipo completo con sus componentes.
 */
router.get("/equipos/:id/componentes", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id).populate({
      path: "componentes",
      populate: {
        path: "equipoID",
      },
    });
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
