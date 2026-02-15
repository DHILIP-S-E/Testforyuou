import React from 'react';
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import SalesOverview from '../components/SalesOverview';

const ModernDashboard: React.FC = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesOverview />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}>
                <CardContent>
                  <Typography variant="h4">$16.5k</Typography>
                  <Typography variant="subtitle1">Monthly Earnings</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Card sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }}>
                <CardContent>
                  <Typography variant="h4">$2.4k</Typography>
                  <Typography variant="subtitle1">Weekly Earnings</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModernDashboard;
