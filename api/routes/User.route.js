const express = require("express");
const {login, Signup} = require("../Controller/User.Controller")
const router = express.Router();

router.route('/Signup').post(Signup)
router.route('/login').post(login)

module.exports = router;