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
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [totalSpaces, setTotalSpaces] = useState(0);
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  const [bannedSpaces, setBannedSpaces] = useState(0);

  useEffect(() => {
    fetchSensorData(); // Assuming you have a function to fetch sensor data
  }, []);

  async function fetchSensorData() {
    const data = await getAllSensors(); // Assuming you have a function to get sensor data
    const total = data.length;
    const available = data.filter(sensor => sensor.status === 'inactive'||sensor.status==='false').length;
    const banned = data.filter(sensor => sensor.status==='banned').length;

    const occupied = total - available - banned;
    setBannedSpaces(banned)
    setTotalSpaces(total);
    setAvailableSpaces(available);
    setOccupiedSpaces(occupied);
  }

  return (
    <>
      <Helmet>
        <title> SpotTroop | Admin-Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={4}>
         
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Parking Spaces"
              total={totalSpaces}
              icon={'ant-design:android-filled'}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Use Parking Spaces"
              total={availableSpaces}
              color="info"
              icon={'ant-design:apple-filled'}
              
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Free Parking Spaces"
              total={occupiedSpaces}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>
         

         
          <Grid item xs={12} md={6} lg={4}>
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
