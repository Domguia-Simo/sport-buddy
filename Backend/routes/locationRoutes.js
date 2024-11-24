const express = require('express')
const { createLocation, getLocations, updateLocation, deleteLocation } = require('../controllers/locationController')
const router = express.Router()

router.route("/create-location").post(createLocation)
router.get("/get-locations" ,getLocations)
router.route('/update-location/:locationId').put(updateLocation)
router.delete("/delete-location/:locationId" ,deleteLocation)

module.exports = router