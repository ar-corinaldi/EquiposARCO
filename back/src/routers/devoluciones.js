var express = require("express");
const Devoluciones = require("../models/devolucion-model");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
