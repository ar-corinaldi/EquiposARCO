//modulos npm
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Activa la coneccion con la base de datos
require("./src/db/mongoose");

// Routers
const indexRouter = require("./src/routers/index");
const usersRouter = require("./src/routers/users");
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

//Servidor
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/equipos", equiposRouter);
app.use("/terceros", tercerosRouter);
app.use("/bodegas", bodegasRouter);
app.use("/precios", preciosRouter);
app.use("/empleados", empleadosRouter);
app.use("/vehiculos", vehiculosRouter);
app.use("/devoluciones", devolucionesRouter);
app.use("/remisiones", remisionesRouter);
app.use("/facturas", facturasRouter);
app.use("/ordenes", ordenesRouter);

module.exports = app;
