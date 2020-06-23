var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Activa la coneccion con la base de datos
require("./src/db/mongoose");
const Equipo = require("./src/models/equipo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

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

/**
 *  Get de equipos
 */
app.get("/equipos", async (req, res) => {
  try {
    const equipos = await Equipo.find({});
    res.send(equipos);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = app;
