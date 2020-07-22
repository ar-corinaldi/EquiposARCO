var express = require("express");
const Remision = require("../models/remision-model");
const Orden = require("../models/orden-model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var router = express.Router();

/**
 *  Relacion Orden -> Remision
 */

/**
 * Agrega una nueva remision a una orden
 */
router.post("/ordenes/:idOr/remisiones", async (req, res) => {
  let newRemision = undefined;
  let orden;
  try {
    orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Encuentra orden", orden);
    console.log("body", req.body);
    newRemision = new Remision(req.body);
    await newRemision.save();
    console.log("Agrega remision");
    orden.remisiones.push(newRemision._id);
    await orden.save();
    console.log("Guarda orden con remision");
    res.status(201).send(orden);
    console.log("newRemision", newRemision);
  } catch (e) {
    console.log("Hubo un error");
    if (newRemision !== undefined) {
      console.log("Elimina la bodega");
      // Manejo en caso de que no se agregue la bodega
      Remision.findByIdAndDelete(newRemision._id);
      const i = orden.remisiones.indexOf(newRemision._id);
      if (i != -1) {
        orden.remisiones.splice(i, 1);
      }
    }
    res.status(400).send("No se pudo agregar la remision a la orden " + e);
    console.error("error", e);
  }
});

/**
 *  Get de remisiones de una orden
 */
router.get("/ordenes/:idOr/remisiones", async (req, res) => {
  let orden;
  try {
    orden = await Orden.findById(req.params.idOr).populate("remisiones");
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Encuentra orden", orden);
    res.send(orden.remisiones);
  } catch (e) {
    res.status(500).send();
    console.log(orden);
    console.error("error", e);
  }
});

/**
 * Cantidad de remisiones que hay en una orden
 */
router.get("/ordenes/:idOr/remisiones/cantidad", async (req, res) => {
  let orden;
  try {
    orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Encuentra orden", orden);
    res.send(orden.remisiones.length + "");
  } catch (e) {
    res.status(500).send();
    console.log(orden);
    console.error("error", e);
  }
});

/**
 * Cantidad de remisiones y devoluciones que hay en una orden
 */
router.get("/ordenes/:idOr/actividades/cantidad", async (req, res) => {
  let orden;
  try {
    orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Encuentra orden", orden);
    const count = +orden.remisiones.length + +orden.devoluciones.length;
    res.send(count + "");
  } catch (e) {
    res.status(500).send();
    console.log(orden);
    console.error("error", e);
  }
});

/**
 *  Get de remisiones y devolucioens de una orden para paginacion
 */
router.get(
  "/ordenes/:idOr/actividades/:page/:elementsPerPage",
  async (req, res) => {
    try {
      let orden;
      let remisiones;
      let devoluciones;
      console.log("Encuentra orden", orden);
      const page = parseInt(req.params.page);
      const elementsPerPage = parseInt(req.params.elementsPerPage);
      if (elementsPerPage === -1) {
        orden = await Orden.aggregate([
          { $match: { _id: ObjectId(req.params.idOr) } },
          {
            $lookup: {
              from: "remisions",
              localField: "remisiones",
              foreignField: "_id",
              as: "remisiones",
            },
          },
          { $project: { remisiones: 1, devoluciones: 1 } },
          {
            $lookup: {
              from: "devolucions",
              localField: "devoluciones",
              foreignField: "_id",
              as: "devoluciones",
            },
          },
          {
            $project: {
              _id: 0,
              actividades: { $concatArrays: ["$devoluciones", "$remisiones"] },
            },
          },
          { $unwind: "$actividades" },
          {
            $sort: {
              "actividades.fechaSalida": -1,
            },
          },
        ]);
      } else {
        orden = await Orden.aggregate([
          { $match: { _id: ObjectId(req.params.idOr) } },
          {
            $lookup: {
              from: "remisions",
              localField: "remisiones",
              foreignField: "_id",
              as: "remisiones",
            },
          },
          { $project: { remisiones: 1, devoluciones: 1 } },
          {
            $lookup: {
              from: "devolucions",
              localField: "devoluciones",
              foreignField: "_id",
              as: "devoluciones",
            },
          },
          {
            $project: {
              _id: 0,
              actividades: { $concatArrays: ["$devoluciones", "$remisiones"] },
            },
          },
          { $unwind: "$actividades" },
          {
            $sort: {
              "actividades.fechaSalida": -1,
            },
          },
          { $limit: elementsPerPage },
          { $skip: (page - 1) * elementsPerPage },
        ]);
      }
      if (!orden) {
        return res.status(404).send("Ninguna orden coincidio con ese id");
      }
      res.send(orden);
    } catch (e) {
      res.status(500).send();
      console.error("error", e);
    }
  }
);

/**
 *  Remision
 */

/**
 *  Post de remision
 */
router.post("/remisiones", async (req, res) => {
  const remision = new Remision(req.body);
  try {
    await remision.save();
    res.status(201).send(remision);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 *  Get de remisiones.
 */
router.get("/remisiones", async (req, res) => {
  let remisiones = null;
  try {
    remisiones = await Remision.find({});
    res.send(remisiones);
  } catch (e) {
    res.status(500).send();
    console.log(remisiones);
    console.error("error", e);
  }
});

/**
 *  Get de remision por su id. Puebla los equipos, y si no es asumida por el tercero, el vehiculo y el conductor.
 */
router.get("/remisiones/:id", async (req, res) => {
  try {
    const remision = await Remision.findById(req.params.id)
      .populate({
        path: "equiposEnRemision",
        populate: {
          path: "equipoID",
        },
      })
      .populate("conductor")
      .populate("vehiculoTransportador");
    if (!remision) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.send(remision);
  } catch (error) {
    res.status(500).send();
    console.error("error", error);
  }
});

/**
 *  Modifica un remision
 */
router.patch("/remisiones/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Remision.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const remision = await Remision.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!remision) {
      return res.status(404).send();
    }
    res.send(remision);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina un remision
 */
router.delete("/remisiones/:id", async (req, res) => {
  try {
    const remision = await Remision.findByIdAndDelete(req.params.id);
    if (!remision) {
      return res.status(404).send();
    }
    res.send(remision);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

module.exports = router;
