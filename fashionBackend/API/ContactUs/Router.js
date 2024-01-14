const express = require("express");
const router = express.Router();

const { contactSubmit } = require("./Controller");

router.post("/contactSubmit", contactSubmit);

module.exports = router;
