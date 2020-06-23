var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Activa la coneccion con la base de datos
require("./src/db/mongoose");

var indexRouter = require("./src/routers/index");
var usersRouter = require("./src/routers/users");
var equiposRouter = require("./src/routers/equipos");

var app = express();
//inicializa el puertp
const port = process.env.PORT || 8000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(equiposRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = app;
