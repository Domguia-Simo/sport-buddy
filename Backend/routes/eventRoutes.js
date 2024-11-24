const express = require('express')
const router = express.Router()
const { getEvents, createEvent, deleteEvent, updateEvent ,getUserEvents } = require('../controllers/eventController')

router.get("/get-events" ,getEvents)
router.post("/create-event" ,createEvent)
router.delete("/delete-event/:id" ,deleteEvent)
router.put("/update-event" ,updateEvent)
router.route("/get-user-events/:userId").get(getUserEvents)


module.exports = router