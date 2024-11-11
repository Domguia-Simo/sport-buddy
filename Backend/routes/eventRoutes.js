const express = require('express')
const router = express.Router()
const { getEvents, createEvent, deleteEvent, updateEvent } = require('../controllers/eventController')

router.get("/get-events" ,getEvents)
router.post("/create-event" ,createEvent)
router.delete("/delete-event" ,deleteEvent)
router.put("/update-event" ,updateEvent)


module.exports = router