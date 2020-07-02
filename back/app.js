//modulos npm
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Activa la coneccion con la base de datos
require("./src/db/mongoose");

// Routers
const indexRouter = require("./src/routers/index");
const equiposRouter = require("./src/routers/equipos");
const tercerosRouter = require("./src/routers/terceros");
const bodegasRouter = require("./src/routers/bodegas");
const preciosRouter = require("./src/routers/precios");
const empleadosRouter = require("./src/routers/empleados");
const vehiculosRouter = require("./src/routers/vehiculos");
const devolucionesRouter = require("./src/routers/devoluciones");
const remisionesRouter = require("./src/routers/remisiones");
const facturasRouter = require("./src/routers/facturas");
const ordenesRouter = require("./src/routers/ordenes");
const tarifasRouter = require("./src/routers/tarifas");
const cotizacionesRouter = require("./src/routers/cotizaciones");

//Servidor
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routers
app.use("/", indexRouter);
app.use(tercerosRouter);
app.use(bodegasRouter);
app.use(ordenesRouter);
app.use(cotizacionesRouter);
app.use(tarifasRouter);
app.use(remisionesRouter);
app.use(devolucionesRouter);
app.use(facturasRouter);
app.use(equiposRouter);
app.use(preciosRouter);
app.use(empleadosRouter);
app.use(vehiculosRouter);

module.exports = app;
