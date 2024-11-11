const express = require('express')
const router = express.Router()

const { getSports, createSport, deleteSport, updateSport } = require('../controllers/sportController')

router.get("/get-sports" ,getSports)
router.post("/create-sport" ,createSport)
router.delete("/delete-sport" ,deleteSport)
router.put("/update-sport" ,updateSport)


module.exports = router