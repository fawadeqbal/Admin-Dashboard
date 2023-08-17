const Sensor = require('../model/sensorModel'); // Update with the correct path

const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSensorById = async (req, res) => {
    const sensorId = req.params.id;
    try {
        const sensor = await Sensor.findById(sensorId);
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found' });
        }
        res.json(sensor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createSensor = async (req, res) => {
    const { location, sensorId, status } = req.body;
    try {
        const newSensor = new Sensor({
            location,
            sensorId,
            status,
        });
        await newSensor.save();
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSensor = async (req, res) => {
    const id = req.params.id;
    const { location, sensorId: newSensorId, status } = req.body;
    try {
        const sensor = await Sensor.findByIdAndUpdate(
            id,
            {
                $set: {
                    location,
                    sensorId: newSensorId,
                    status,
                },
            },
            { new: true }
        );
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found' });
        }
        res.json(sensor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSensor = async (req, res) => {
    const sensorId = req.params.id;
    try {
        const sensor = await Sensor.findByIdAndDelete(sensorId);
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found' });
        }
        res.json({ message: 'Sensor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
};
