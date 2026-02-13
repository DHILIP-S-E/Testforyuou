
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const SalesOverview = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const options: any = {
    grid: {
      show: true,
      borderColor: 'transparent',
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '42%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    colors: [primary, secondary],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: 'inherit',
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'category',
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const series = [
    {
      name: 'Earnings',
      data: [355, 390, 300, 350, 390, 180, 355, 390],
    },
    {
      name: 'Expense',
      data: [280, 250, 325, 215, 250, 310, 280, 250],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Sales Overview</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Ample Admin Vs Pixel Admin
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Chart options={options} series={series} type="bar" height="370px" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
