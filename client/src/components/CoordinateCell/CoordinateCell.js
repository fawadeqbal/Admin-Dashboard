import React from 'react';

const CoordinateCell = ({ latitude, longitude }) => {
  const formattedLatitude = latitude.toFixed(2);
  const formattedLongitude = longitude.toFixed(2);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      {formattedLatitude}, {formattedLongitude}
    </a>
  );
};

export default CoordinateCell;
