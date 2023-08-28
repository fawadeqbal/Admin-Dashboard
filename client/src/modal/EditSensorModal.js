import React, { useState, useEffect } from 'react';
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
 import { updateSensor } from '../service/api';

export default function EditSensorModal({ open, onClose, initialSensorData,fetchSensorData }) {
  const [sensorData, setSensorData] = useState(initialSensorData);

  useEffect(() => {
    setSensorData(initialSensorData);
  }, [initialSensorData]);

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
  
  const handleSubmit = async () => {
    // Implement your logic to handle the submission of updated sensor data
    // For example, call an API to update the sensor using sensorData
    console.log(sensorData);

     await updateSensor(sensorData);
     fetchSensorData()
    // Then close the modal using onClose
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card style={{ width: '100%', maxWidth: 600 }}>
        <CardHeader
          title="Edit Sensor"
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
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
}

// Prop type validation
EditSensorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialSensorData: PropTypes.object.isRequired,
};
