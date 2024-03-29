import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addNewSensor } from '../service/api';

export default function CreateSensorModal({ open, onClose, fetchSensorData }) {
  const [sensorData, setSensorData] = useState({
    location: {
      type: 'Point',
      coordinates: [0.0, 0.0],
    },
    sensorId: '',
    status: 'false', // Default status
    // Add other sensor properties here
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSensorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCoordinateChange = (event, index) => {
    const { value } = event.target;
  
    // Use a regular expression to validate the input as a floating-point number
    const isValidFloat = /^[+-]?\d+(\.\d+)?$/.test(value);
  
    if (isValidFloat) {
      const parsedValue = parseFloat(value);
      const formattedValue = parsedValue.toFixed(6); // Format to 6 decimal places
  
      const updatedCoordinates = [...sensorData.location.coordinates];
      updatedCoordinates[index] = parseFloat(formattedValue); // Store as a number
  
      setSensorData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          coordinates: updatedCoordinates,
        },
      }));
    } else {
      const updatedCoordinates = [...sensorData.location.coordinates];
      updatedCoordinates[index] = null;
      setSensorData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          coordinates: updatedCoordinates,
        },
      }));
    }
  };
  

  

  async function handleSubmit () {
    console.log(sensorData)
      await addNewSensor(sensorData)
      fetchSensorData();
    setSensorData({
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
      sensorId: '',
      status: 'false', 
    })
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: '100%', maxWidth: 600 }}>
        <CardHeader
          title="Create New Sensor"
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <TextField
            name="sensorId"
            label="Sensor ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sensorData.sensorId}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={sensorData.status}
              onChange={handleInputChange}
              label="Status"
            >
               <MenuItem value="true">True</MenuItem>
                              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Latitude"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sensorData.location.coordinates[0]}
            onChange={(event) => handleCoordinateChange(event, 0)}
          />
          <TextField
            label="Longitude"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sensorData.location.coordinates[1]}
            onChange={(event) => handleCoordinateChange(event, 1)}
          />
          {/* Add other input fields for additional sensor properties */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
}

// Prop type validation
CreateSensorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
