const express = require('express')
const router = express.Router()
const {user} = require("../controllers/user")

//route
router.get("/user", user);

module.exports = router;