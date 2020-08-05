const express = require("express");
const Global = require("../models/global-model");
const router = new express.Router();

router.get("/globals/", async (req, res) => {
    try {
        const globals = await Global.find({});
        res.json(globals)
    } catch (e) {
        res.status(500).send([]);
    }
});

module.exports = router;
