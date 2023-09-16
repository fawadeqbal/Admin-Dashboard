import { Helmet } from 'react-helmet-async';
import { useEffect,useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';

import { Grid, Container, Typography } from '@mui/material';

import { getAllSensors } from '../service/api';

// sections
import {
  AppCurrentVisits,
  AppWidgetSummary,
 
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [totalSpaces, setTotalSpaces] = useState(0);
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
 

  useEffect(() => {
    fetchSensorData(); // Assuming you have a function to fetch sensor data
  }, []);

  async function fetchSensorData() {
    const data = await getAllSensors(); // Assuming you have a function to get sensor data
    const total = data.length;
    const available = data.filter(sensor => sensor.status === 'inactive'||sensor.status==='false').length;
   
    const occupied = total - available ;
    
    setTotalSpaces(total);
    setAvailableSpaces(available);
    setOccupiedSpaces(occupied);
  }

  return (
    <>
      <Helmet>
        <title> SpotTroop | Admin-Dashboard </title>
      </Helmet>

      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={2}>
         
          <Grid item xs={16} sm={6} md={4}>
            <AppWidgetSummary
              title="Total Parking Spaces"
              total={totalSpaces}
              icon={'ant-design:android-filled'}
            />
          </Grid>
          <Grid item xs={16} sm={6} md={4}>
            <AppWidgetSummary
              title="Free Parking Spaces"
              total={availableSpaces}
              color="info"
              icon={'ant-design:windows-filled'}
            />
          
          <Grid item xs={16} sm={6} md={4}>
            <AppWidgetSummary
              title="Use Parking Spaces"
              total={occupiedSpaces}
              color="warning"
              icon={'ant-design:apple-filled'}
              
            />
          </Grid>
          
          </Grid>
         

         
          <Grid item xs={12} md={12} lg={12}>
            <AppCurrentVisits
              title="Parking Spaces"
              chartData={[
                { label: 'Free', value: availableSpaces },
                { label: 'Used', value: occupiedSpaces }
              ]}
              chartColors={[
                theme.palette.info.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
