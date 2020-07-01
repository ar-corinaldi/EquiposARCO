const express = require("express");
//const mongoose = require("mongoose");
const Equipo = require("../models/equipo-model");
const router = new express.Router();
const Precio = require("../models/precio-model");

/**
 * Cantidad de documentos que hay en tercero
 */
router.get("/cantidad", async (req, res) => {
  try {
    const count = await Equipo.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res.status(500).send(e);
    console.err(e);
  }
});

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
 *  Get de equipos paginacion
 */
router.get("/:page/:elementsPerPage", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const elementsPerPage = parseInt(req.params.elementsPerPage);
    const equipos = await Equipo.find({})
      .limit(elementsPerPage)
      .skip((page - 1) * elementsPerPage);
    res.send(equipos);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
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
 * Elimina un equipo y sus precios correspondientes
 */
router.delete("/:id", async (req, res) => {
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
 * Agrega un precio nuevo a un equipo
 * FALTA que borre el precio si algo sale mal. Lo hace pero mandao un error extraño
 */
router.patch("/:id/precios", async (req, res) => {
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
router.patch("/:id/precios/:idP", async (req, res) => {
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
router.get("/:id/precios", async (req, res) => {
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
router.delete("/:id/precios/:idP", async (req, res) => {
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
 * Agrega un equipo creado a un equipo como componente
 */
router.patch("/:id/componentes/:idC/:cant", async (req, res) => {
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
 * Obtiene los componentes de un equipo. Puede ser un poco demorado. No hice index join
 * Envia el equipo completo con sus componentes.
 */
router.get("/:id/componentes", async (req, res) => {
  try {
    const ans = await Equipo.findById(req.params.id).populate({
      path: "componentes",
      populate: {
        path: "equipoID",
      },
    });
    // for (let index = 0; index < ans.componentes.length; index++) {
    //   const equipoInfo = await Equipo.findById(ans.componentes[index].equipoID);
    //   ans.componentes[index].equipoID = equipoInfo;
    // }
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
