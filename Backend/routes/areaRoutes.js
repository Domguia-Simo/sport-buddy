const express = require('express')
const router = express.Router()

const { getAreas, createArea, deleteArea, updateArea } = require('../controllers/areaController')

router.get("get-areas" ,getAreas)
router.post("create-area" ,createArea)
router.delete("delete-area" ,deleteArea)
router.put("update-area" ,updateArea)


module.exports = router