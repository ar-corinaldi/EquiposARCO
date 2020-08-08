const express = require("express");
const Orden = require("../models/orden-model");
const Bodega = require("../models/bodega-model");
const Cotizacion = require("../models/cotizacion-model");
const Tarifa = require("../models/tarifa-model");

//const Tercero = require("../models/tercero-model");
const router = express.Router();

/**
 *  Relacion Bodega -> Orden / Cotizacion
 */

/**
 * Crea una orden a partir de una cotizacion y la agrega a una bodega.
 * Copia la infromacion de las tarifas definidas en la cotizacion,y crea nuevas instancias de ellas que las relaciona con la orden.
 * Separa las tarifas nuevas tarifas creada de acuerdo al equipo al que están relacionadas
 * No se espera que en la cotizacion haya mas de una tarifa por equipo pero igual maneja esta situacion
 */
router.post("/bodegas/:idB/cotizaciones/:idC/ordenes", async (req, res) => {
  let orden = null;
  try {
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    const cotizacion = await Cotizacion.findById(req.params.idC).populate(
      "tarifasCotizadas"
    );
    if (!cotizacion) {
      return res.status(404).send("Ninguna cotizacion coincidio con ese id");
    }
    console.log("La bodega y la cotizacion existen");
    orden = new Orden(req.body);
    orden.tarifasDefinitivas = await Tarifa.filtrarPorEquipo(
      cotizacion.tarifasCotizadas
    );
    orden.cotizacion = cotizacion._id;
    await orden.save();
    console.log("orden guardada");
    cotizacion.orden = orden._id;
    await cotizacion.save();
    bodega.ordenes.push(orden._id);
    await bodega.save();
    console.log("Orden aniadida a la bodega con exito");
    const ans = { bodega: bodega, orden: orden };
    res.status(201).send(ans);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero " + e);
    console.error("error", e);
  }
});

/**
 * Crea una orden y la agrega a una bodega
 */
router.post("/bodegas/:idB/ordenes", async (req, res) => {
  let orden = req.body;
  let tarifasNuevas = [];
  try {
    for (let tarifasPorEquipo of req.body.tarifasDefinitivas) {
      let tarifasAgrupadas = { tarifasPorEquipo: [] };
      for (let tarifa of tarifasPorEquipo.tarifasPorEquipo) {
        delete tarifa._id;
        let newTarifa = new Tarifa(tarifa);
        newTarifa = await newTarifa.save();
        tarifasAgrupadas.tarifasPorEquipo.push(newTarifa);
      }
      tarifasNuevas.push(tarifasAgrupadas);
    }
    orden.tarifasDefinitivas = tarifasNuevas;

    orden = new Orden(req.body);
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    await orden.save();
    console.log("orden guardada");
    bodega.ordenes.push(orden._id);
    await bodega.save();
    console.log("Orden aniadida a bodega con exito");

    let cotizacion = await Cotizacion.findById(orden.cotizacion._id || orden.cotizacion);
    if (!cotizacion) {
      return res.status(404).send("Ninguna cotización coincidio con ese id");
    }
    cotizacion.orden = orden._id;
    await cotizacion.save()
    console.log("Orden aniadida a Cotización con exito");
    orden = orden.toObject();
    orden.bodega = bodega;
    res.status(201).json(orden);
  } catch (e) {
    //borrar tarifas nuevas
    // for (let tarifa of tarifasNuevas){
    //   await Tarifa.findByIdAndDelete(tarifa._id);
    // }
    console.log(e);
    res.status(400).send("No se pudo agregar la bodega al tercero ");
  }
});

/**
 * Agrega una orden creada a una bodega
 */
router.patch("/bodegas/:idB/ordenes/:idOr", async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    const bodega = await Bodega.findById(req.params.idB);
    if (!bodega) {
      return res.status(404).send("Ninguna bodega coincidio con ese id");
    }
    console.log("La bodega existe");
    let indice = bodega.ordenes.indexOf(orden._id);
    if (indice !== -1) {
      return res.status(404).send("La orden ya está agregada");
    }
    bodega.ordenes.push(orden._id);
    await bodega.save();
    console.log("Bodega aniadida al tercero con exito");
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero ");
  }
});

/**
 * Terminar una orden.
 * Ponerle fecha fin
 */
router.patch("ordenes/:idOr/terminar", async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.idOr);
    if (!orden) {
      return res.status(404).send("Ninguna orden coincidio con ese id");
    }
    orden.fechaFin = new Date(req.fechaFin);
    await orden.save();
    console.log("Orden terminada con exito");
    res.status(201).send(bodega);
  } catch (e) {
    res.status(400).send("No se pudo agregar la bodega al tercero ");
  }
});

/**
 * Obtener las ordenes de una bodega
 * Return: las ordenes
 */
router.get("/bodegas/:idB/ordenes", async (req, res, next) => {
  try {
    const bodega = await Bodega.findById(req.params.idB).populate("ordenes");
    if (!bodega) {
      return res.send("La bodega no existe");
    }
    res.send(bodega.ordenes);
    console.log("La bodega existe");
  } catch (e) {
    res.status(404).send("No se pudo hacer la solicitud ");
  }
});

/**
 *  Orden
 */

/**
 * Da todas las ordenes pobladas de una obra
 */
router.get("/ordenes/groupBy/:idObra", async (req, res) => {
  try {
    const codigoObra = req.params.idObra;
    const ordenesAgrupadas = await Orden.find({ codigoObra })
      .populate({
        path: "bodega",
        populate: { path: "duenio ordenes" },
      })
      .populate({
        path: "tarifasDefinitivas",
        populate: {
          path: "tarifasPorEquipo",
          populate: {
            path: "equipo precioReferencia",
            populate: {
              path: "componentes",
              populate: {
                path: "equipoID",
                populate: { path: "precios" },
              },
            },
          },
        },
      })
      .populate({
        path: "remisiones",
        populate: {
          path: "equiposEnRemision",
          populate: {
            path: "equipoID",
            populate: { path: "precios" },
          },
        },
      })
      .populate({
        path: "devoluciones",
        populate: {
          path: "equiposEnDevolucion",
          populate: {
            path: "equipoID",
            populate: {
              path: "precios",
            },
          },
        },
      })
      .populate("cotizacion")
      .sort({ fechaInicio: 1 });
    let fechaInicio = null;
    if (ordenesAgrupadas && ordenesAgrupadas.length > 0) {
      fechaInicio = ordenesAgrupadas[0].fechaInicio;
    }
    res.send({ ordenes: ordenesAgrupadas, fecha: fechaInicio });
  } catch (e) {
    console.log(e);
    res.status(404).send("No se pudieron agrupar las obras");
  }
});

/**
 *  Get de equipos paginacion
 */
router.get("/ordenes/:page/:elementsPerPage", async (req, res) => {
  try {
    console.log("paginacion");
    const page = parseInt(req.params.page);
    const elementsPerPage = parseInt(req.params.elementsPerPage);
    let ordenes = null;
    if (elementsPerPage === -1) {
      ordenes = await Orden.find({}).populate({
        path: "bodega",
        populate: { path: "duenio" },
      });
    } else {
      ordenes = await Orden.find({})
        .populate({
          path: "bodega",
          populate: { path: "duenio" },
        })
        .limit(elementsPerPage)
        .skip((page - 1) * elementsPerPage);
    }
    res.send(ordenes);
  } catch (e) {
    res
      .status(500)
      .send(["No se pueden listar las ordenes, hubo un error en el sistema"]);
    console.error("error", e);
  }
});

/**
 * Cantidad de documentos que hay en Orden
 */
router.get("/ordenes/cantidad", async (req, res) => {
  try {
    const count = await Orden.estimatedDocumentCount();
    console.log("count", count);
    res.send(count + "");
  } catch (e) {
    res.status(500).send("Error del sistema");
  }
});

/**
 *  Post de Orden
 */
router.post("/ordenes", async (req, res) => {
  const orden = new Orden(req.body);
  try {
    await orden.save();
    res.status(201).send(orden);
  } catch (e) {
    res.status(400).send("Error del sistema");
  }
});

/**
 *  Get de ordenes
 */
router.get("/ordenes", async (req, res) => {
  let ordenes = null;
  try {
    ordenes = await Orden.find({});
    res.send(ordenes);
  } catch (e) {
    res.status(500).send("Error del sistema");
  }
});

/**
 *  Get de orden por su id. Puebla las tarifas, las remisiones y las devoluciones
 */
router.get("/ordenes/:id", async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id)
      .populate({
        path: "tarifasDefinitivas",
        populate: {
          path: "tarifasPorEquipo",
          populate: {
            path: "equipo precioReferencia",
            populate: {
              path: "componentes",
              populate: {
                path: "equipoID",
              },
            },
          },
        },
      })
      .populate({
        path: "remisiones",
        populate: {
          path: "equiposEnRemision",
          populate: {
            path: "equipoID",
          },
        },
      })
      .populate({
        path: "devoluciones",
        populate: {
          path: "equiposEnDevolucion",
          populate: {
            path: "equipoID",
          },
        },
      })
      .populate("cotizacion");
    if (!orden) {
      return res.send("La orden no existe");
    }
    res.send(orden);
    console.log("La orden existe");
  } catch (e) {
    res.status(404).send(["No se pudo hacer la solicitud " + e]);
  }
});

/**
 *  Modifica un orden
 */
router.patch("/ordenes/:id", async (req, res) => {
  // Se pueden pasar por parametro los campos no modificables
  try {
    if (!Orden.fieldsNotAllowedUpdates(req.body)) {
      return res.status(400).send("Modificaciones invalidas");
    }
    const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!orden) {
      return res.status(404).send();
    }
    res.send(orden);
  } catch (e) {
    res.status(400).send("Error del sistema");
  }
});

/**
 * Elimina un Orden
 */
router.delete("/ordenes/:id", async (req, res) => {
  try {
    const orden = await Orden.findByIdAndDelete(req.params.id);
    if (!orden) {
      return res.status(404).send();
    }
    res.send(orden);
  } catch (error) {
    res.status(500).send("Error del sistema");
  }
});

module.exports = router;
