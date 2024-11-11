const express = require('express')
const router = express.Router()

const { getCities, createCity, deleteCity, updateCity } = require('../controllers/cityController')

router.get("get-cities" ,getCities)
router.post("create-city" ,createCity)
router.delete("delete-city" ,deleteCity)
router.put("update-city" ,updateCity)


module.exports = router