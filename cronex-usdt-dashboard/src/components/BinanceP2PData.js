import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, ToggleButtonGroup, ToggleButton, Box, TextField, Button } from '@mui/material';
import BinanceP2PTable from './BinanceP2PTable';
import binanceLogo from '../assets/binance-logo.png';

const BinanceP2PData = ({ buyData, sellData }) => {
  const [side, setSide] = useState('buy');
  const [data, setData] = useState(buyData); // Start with buy data as default
  const [priceInput, setPriceInput] = useState('1000000');

  const handleSideChange = (event, newSide) => {
    if (newSide !== null) {
      setSide(newSide);
      setData(newSide === 'buy' ? buyData : sellData);
    }
  };

  useEffect(() => {
    // Update data when buyData, sellData, or side changes
    setData(side === 'buy' ? buyData : sellData);
  }, [buyData, sellData, side]);

  const handlePriceSubmit = () => {
    // Implement the logic to handle price submission here
    console.log(priceInput);
    setPriceInput(''); // Clear the input after submission
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
      <img src={binanceLogo} alt="Binance Logo" style={{ height: '24px', marginRight: '10px' }} />
        <Typography variant="h6" gutterBottom>
          Binance P2P Market
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={side}
          exclusive
          onChange={handleSideChange}
          sx={{ mb: 2, '& .MuiToggleButtonGroup-grouped': { m: 0.5, borderColor: '#EAECEF' }}}
        >
          <ToggleButton value="buy" sx={{ backgroundColor: side === 'buy' ? '#F0B90B' : '', '&:hover': { bgcolor: 'rgba(240,185,11,0.1)' } }}>Buy</ToggleButton>
          <ToggleButton value="sell" sx={{ backgroundColor: side === 'sell' ? '#F0B90B' : '', '&:hover': { bgcolor: 'rgba(240,185,11,0.1)' } }}>Sell</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            disabled={true}
            label="Enter price (THB)"
            variant="outlined"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            type="number"
            sx={{ flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <Button disabled={true} variant="contained" onClick={handlePriceSubmit} sx={{ bgcolor: '#F0B90B', '&:hover': { bgcolor: 'rgba(240,185,11,0.9)' } }}>
                  Submit
                </Button>
              ),
            }}
          />
        </Box>
        <BinanceP2PTable data={data} />
      </CardContent>
    </Card>
  );
};

BinanceP2PData.propTypes = {
  buyData: PropTypes.array.isRequired,
  sellData: PropTypes.array.isRequired,
};

export default BinanceP2PData;
