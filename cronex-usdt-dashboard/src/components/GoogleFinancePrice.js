import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const GoogleFinancePrice = ({ price }) => {
  const theme = useTheme();
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 500); // Duration of highlight effect
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <Card sx={{
      mb: 3,
      backgroundColor: theme.palette.primary.main,
      transition: 'background-color 0.5s ease',
    }}>
      <CardContent>
        <Typography variant="h5" component="div" color="white">
          Google Finance
        </Typography>
        <Typography variant="h4" component="div" sx={{
          fontWeight: 'bold',
          color: theme.palette.secondary.contrastText,
          backgroundColor: highlight ? alpha(theme.palette.secondary.light, 0.3) : 'transparent', // Temporary highlight background
          transition: 'background-color 0.5s ease',
          borderRadius: '4px',
          p: '4px',
        }}>
          USDT ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

GoogleFinancePrice.propTypes = {
  price: PropTypes.string.isRequired,
};

export default GoogleFinancePrice;
