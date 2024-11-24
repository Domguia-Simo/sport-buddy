const express = require('express')
const { login, register, matchUsers } = require('../controllers/usercontroller')
const router = express.Router()

router.route("/login").post(login)
router.post("/register" ,register)
router.route("/find-match/:userId").post(matchUsers)

module.exports = router