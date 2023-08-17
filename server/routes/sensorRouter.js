const express = require('express');
const { getAllSensors,createSensor, deleteSensor, updateSensor } = require('../controller/sensorController');

const router = express.Router();

router.get('/', getAllSensors);
router.post('/',createSensor);
router.delete('/:id',deleteSensor)
router.put('/:id',updateSensor)

module.exports = router;
