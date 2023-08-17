const express = require('express');
const cors = require('cors');
const sensorRouter = require('./routes/sensorRouter');
const connection = require('./db/db');
const app = express();

const PORT = process.env.PORT || 8000;

connection()

app.use(cors());
app.use(express.json())

app.use('/sensor', sensorRouter);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});
