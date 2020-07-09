const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Precio = require("../models/precio-model");
const Orden = require("../models/orden-model");
const Tarifa = require("../models/tarifa-model");
const Cotizacion = require("../models/cotizacion-model");

const router = new express.Router();

/**
 * Relacion Cotizacion -> Tarifa
 */

/**
 * Crea una tarifa nueva a una cotizacion
 */
router.post("/cotizaciones/:id/tarifasCotizadas", async (req, res) => {
  let newTarifa = undefined;
  try {
    newTarifa = new Tarifa(req.body);
    const cotizacion = await Cotizacion.findById(req.params.id);
    console.log("Encuentra cotizacion", cotizacion);
    if (!cotizacion) {
      return res.status(404).send("Ninguna cotizacion coincidio con ese id");
    }
    await newTarifa.save();
    console.log("Agrega tarifa a la base de datos");
    cotizacion.tarifasCotizadas.push(newTarifa._id);
    await cotizacion.save();
    console.log("Guarda cotizacion con tarifa");
    res.status(201).send(cotizacion);
  } catch (e) {
    console.log("Hubo un error");
    if (newTarifa !== undefined) {
      console.log("Elimina la tarifa");
      // Manejo en caso de que no se agregue la bodega
      Tarifa.findByIdAndDelete(newTarifa._id);
      const index = cotizacion.tarifasCotizadas.indexOf(newTarifa._id);
      if (index > -1) {
        cotizacion.tarifasCotizadas.splice(index, 1);
      }
    }
    res.status(400).send("No se pudo agregar la tarifa a la cotizacion " + e);
    console.error("error", e);
  }
});

/**
 * Agrega una tarifa existente a una cotizacion
 */
router.patch("/cotizaciones/:id/tarifasCotizadas/:idT", async (req, res) => {
  try {
    const newTarifa = await Tarifa.findById(req.params.idT);
    if (!newTarifa) {
      return res.status(404).send("Ninguna tarifa coincidio con ese id");
    }
    const cotizacion = await Cotizacion.findById(req.params.id);
    if (!cotizacion) {
      return res.status(404).send("Ninguna cotizacion coincidio con ese id");
    }
    console.log("Existe la cotizacion y la tarifa");
    cotizacion.tarifasCotizadas.push(newTarifa._id);
    await cotizacion.save();
    console.log("Guarda cotizacion con tarifa");
    res.status(201).send(cotizacion);
  } catch (e) {
    console.log("Hubo un error");
    res.status(400).send("No se pudo agregar la tarifa a la cotizacion " + e);
    console.error("error", e);
  }
});

/**
 *  Poblar los equipos y los precios de todas las tarifas de una cotizacion
 */
router.get("/cotizaciones/:idC/tarifasPobladas", async (req, res, next) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.idC)
      .populate({
        path: "tarifasCotizadas",
        populate: {
          path: "equipo",
        },
      })
      .populate({
        path: "tarifasCotizadas",
        populate: {
          path: "precioReferencia",
        },
      });
    if (!cotizacion) {
      return res.send("La cotizacion no existe");
    }
    res.send(cotizacion);
    console.log("La cotizacion existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud " + e);
  }
});

/**
 *  Relacion Orden -> Tarifa
 */

/**
 * Agrega una tarifa nueva a una orden
 * LA TARIFA DEBE SER SOBRE UN EQUIPO QUE YA TIENE TARIFAS
 * NO CONTEMPLA EL CASO EN EL QUE NO HAYAN TARIFAS YA CON ESE EQUIPO
 */
router.post("/ordenes/:idOr/tarifasDefinitivas", async (req, res) => {
  let newTarifa = new Tarifa(req.body);
  try {
    const orden = await Orden.findById(req.params.idOr).populate({
      path: "tarifasDefinitivas",
      populate: {
        path: "tarifasPorEquipo",
      },
    });
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Existe la orden y está poblada");
    // console.log(
    //   "ver que hay adentro",
    //   orden.tarifasDefinitivas[0].tarifasPorEquipo
    // );
    newTarifa = await newTarifa.save();
    orden.tarifasDefinitivas.forEach((tarifaDefinitiva) => {
      const actual = tarifaDefinitiva.tarifasPorEquipo[0].equipo.toString();
      console.log("actual", actual);
      const buscado = newTarifa.equipo;
      console.log("buscado", buscado);
      console.log("son iguales", actual.localeCompare(buscado));
      if (actual.localeCompare(buscado) === 0) {
        tarifaDefinitiva.tarifasPorEquipo.push(newTarifa._id);
        console.log(
          "Encuentra el grupo de tarifas correspondeinte y lo agrega"
        );
        return;
      }
    });
    // orden.tarifasDefinitivas.push(newTarifa._id);
    await orden.save();
    console.log("Guarda orden con tarifa");
    res.status(201).send(orden);
  } catch (e) {
    console.log("Hubo un error");
    if (newTarifa) {
      console.log("Elimina la tarifa");
      // Manejo en caso de que no se agregue la bodega
      Tarifa.findByIdAndDelete(newTarifa._id);
    }
    res.status(400).send("No se pudo agregar la tarifa a la orden " + e);
    console.error("error", e);
  }
});

/**
 * Agrega una tarifa existente a una orden
 * LA TARIFA DEBE SER SOBRE UN EQUIPO QUE YA TIENE TARIFAS
 * NO CONTEMPLA EL CASO EN EL QUE NO HAYAN TARIFAS YA CON ESE EQUIPO
 */
router.patch("/ordenes/:id/tarifasDefinitivas/:idT", async (req, res) => {
  try {
    const newTarifa = await Tarifa.findById(req.params.idT);
    if (!newTarifa) {
      return res.status(404).send("Ninguna tarifa coincidio con ese id");
    }
    const orden = await Orden.findById(req.params.id).populate({
      path: "tarifasDefinitivas",
      populate: {
        path: "tarifasPorEquipo",
      },
    });
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    console.log("Existe la orden y la tarifa");
    orden.tarifasDefinitivas.forEach((tarifaDefinitiva) => {
      const actual = tarifaDefinitiva.tarifasPorEquipo[0].equipo.toString();
      console.log("actual", actual);
      const buscado = newTarifa.equipo;
      console.log("buscado", buscado);
      console.log("son iguales", actual.localeCompare(buscado));
      if (actual.localeCompare(buscado) === 0) {
        tarifaDefinitiva.tarifasPorEquipo.push(newTarifa._id);
        console.log(
          "Encuentra el grupo de tarifas correspondeinte y lo agrega"
        );
        return;
      }
    });
    await orden.save();
    console.log("Guarda orden con tarifa");
    res.status(201).send(orden);
  } catch (e) {
    console.log("Hubo un error");
    res.status(400).send("No se pudo agregar la tarifa a la orden " + e);
    console.error("error", e);
  }
});

/**
 *  Poblar los equipos y los precios de todas las tarifas de una orden
 */
router.get("/ordenes/:idOr/tarifasPobladas", async (req, res, next) => {
  try {
    const orden = await Orden.findById(req.params.idOr).populate({
      path: "tarifasDefinitivas",
      populate: {
        path: "tarifasPorEquipo",
        populate: {
          path: "equipo precioReferencia",
        },
      },
    });
    if (!orden) {
      return res.send("La orden no existe");
    }
    res.send(orden);
    console.log("La orden existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud " + e);
  }
});

/**
 *  TARIFA
 */

/**
 * Agrega una tarifa
 */
router.post("/tarifas", async (req, res) => {
  const tarifa = new Tarifa(req.body);
  try {
    await tarifa.save();
    res.status(201).json(tarifa);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Obtiene todas las tarifas
 */
router.get("/tarifas", async (req, res) => {
  try {
    const tarifa = await Tarifa.find({});
    res.json(tarifa);
  } catch (e) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 * Obtiene una tarifa
 */
router.get("/tarifas/:id", async (req, res) => {
  try {
    const tarifa = await Tarifa.findById(req.params.id)
      .populate("equipo")
      .populate("precioReferencia");
    if (!tarifa) {
      return res.status(404).send("No hubo coincidencia");
    }
    res.json(tarifa);
  } catch (error) {
    res.status(500).send();
    console.error("error", e);
  }
});

/**
 * Modifica una tarifa
 */
router.patch("/tarifas/:id", async (req, res) => {
  try {
    if (!Tarifa.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }

    const tarifa = await Tarifa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tarifa) {
      return res.status(404).send();
    }
    res.send(tarifa);
  } catch (e) {
    res.status(400).send(e);
    console.error("error", e);
  }
});

/**
 * Elimina una tarifa
 */
router.delete("/tarifas/:id", async (req, res) => {
  try {
    const tarifa = await Tarifa.findByIdAndDelete(req.params.id);
    if (!tarifa) {
      return res.status(404).send();
    }
    res.send(tarifa);
  } catch (error) {
    res.status(500).send(error);
    console.error("error", error);
  }
});

module.exports = router;
