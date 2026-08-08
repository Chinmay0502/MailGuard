const express = require("express");

const { checkEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/check", checkEmail);

module.exports = router;