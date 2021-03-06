const express = require("express");
const Empleado = require("../models/empleado-model");
const router = new express.Router();

/**
 * EMPLEADO
 */

/**
 * Crea un empleado
 */
router.post("/empleados", async (req, resp) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    return resp.status(201).send(empleado);
  } catch (error) {
    console.log(error);
    resp.status(400).send(error);
  }
});

/**
 *  Devuelve todos los empleados
 */
router.get("/empleados", async (req, res) => {
  try {
    const empleados = await Empleado.find({});
    return res.send(empleados);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 *  Devuelve todos los empleados que sean conductores
 */
router.get("/empleados/conductores", async (req, res) => {
  try {
    const empleados = await Empleado.find({ rol: "conductor" });
    return res.send(empleados);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * Devuelve el empleado con el id especificado
 */
router.get("/empleados/:id", async (req, res) => {
  try {
    const empleados = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).send("No hubo coincidencia");
    }
    return res.status(200).send(equipo);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 *  Modifica un empleado con el id especificado
 */
router.patch("/empleados/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Empleado.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send({ error: "Invalid updates" });
    }
    ("console.log(req.body)");
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!empleado) {
      return res.status(404).send();
    }
    return res.send(empleado);
  } catch (e) {
    return res.status(400).send(e);
  }
});

/**
 * Elimina un empleado
 */
router.delete("/empleados/:id", async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).send();
    }
    res.send(empleado);
  } catch (error) {
    return res.status(500).send();
  }
});

module.exports = router;
