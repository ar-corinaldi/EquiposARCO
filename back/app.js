//modulos npm
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Activa la coneccion con la base de datos
require("./src/db/mongoose");

// Routers
var indexRouter = require("./src/routers/index");
var usersRouter = require("./src/routers/users");
var equiposRouter = require("./src/routers/equipos");
var clientesRouter = require("./src/routers/clientes");
var preciosRouter = require("./src/routers/precios");

//Servidor
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/equipos", equiposRouter);
app.use("/clientes", clientesRouter);
app.use("/precios", preciosRouter);

module.exports = app;
