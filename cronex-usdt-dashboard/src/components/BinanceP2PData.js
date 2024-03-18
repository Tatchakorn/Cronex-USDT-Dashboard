import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, TextField, Button, Box } from '@mui/material';
import BinanceP2PTable from './BinanceP2PTable';
import binanceLogo from '../assets/binance-logo.png';

const BinanceP2PData = ({ buyData, sellData }) => {
  return (
    <Card sx={{ mb: 4, overflow: 'hidden', maxWidth: '100%', mx: "auto" }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img src={binanceLogo} alt="Binance Logo" style={{ height: '48px', marginRight: '10px' }} />
          <Typography variant="h5" gutterBottom>
            Binance P2P Market
          </Typography>
        </Box>
        <TextField
          disabled
          label="Enter price (THB)"
          variant="outlined"
          value="1000000"
          sx={{ mb: 2, width: "100%", maxWidth: "500px", mx: "auto" }} // Center the text field
          InputProps={{
            endAdornment: (
              <Button disabled variant="contained" sx={{ bgcolor: '#bdbdbd' }}>
                Submit
              </Button>
            ),
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', color: '#4caf50' }}>
              Buy Orders
            </Typography>
            <BinanceP2PTable data={buyData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', color: '#f44336' }}>
              Sell Orders
            </Typography>
            <BinanceP2PTable data={sellData} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

BinanceP2PData.propTypes = {
  buyData: PropTypes.array.isRequired,
  sellData: PropTypes.array.isRequired,
};

export default BinanceP2PData;
