import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import BitkubTable from './BitkubTable'; // Adjust the import path as necessary
import bitkubLogo from '../assets/bitkub-logo.jpg';

const BitkubInfo = ({ spotPrice, change, bidData, askData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const changeColor = change.startsWith('+') ? 'green' : change.startsWith('-') ? 'red' : 'black';
    const [highlight, setHighlight] = useState(false);
  
    // Trigger highlight effect when spotPrice updates
    useEffect(() => {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1500); // Highlight duration
      return () => clearTimeout(timer);
    }, [spotPrice]);
  
    return (
      <Card sx={{ mb: 4, overflow: 'hidden' }}>
        <CardContent>
          <img src={bitkubLogo} alt="Bitkub Logo" style={{ height: '24px', marginRight: '10px' }} />
          <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
            Bitkub Spot Price: 
            <span style={{
              color: highlight ? alpha(theme.palette.secondary.main, 0.7) : changeColor,
              transition: 'color 0.5s ease',
            }}>
              ${spotPrice} ({change}%)
            </span>
          </Typography>
          <Grid container direction={isMobile ? 'column-reverse' : 'row'} spacing={2}>
            <Grid item xs={12} md={6}>
              <BitkubTable data={bidData} title="Bids" themeColor={{ header: '#047857', headerText: '#fff', rowBackground: 'rgba(4, 120, 87, 0.1)', rowText: '#000' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BitkubTable data={askData} title="Asks" themeColor={{ header: '#be123c', headerText: '#fff', rowBackground: 'rgba(190, 18, 60, 0.1)', rowText: '#000' }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
BitkubInfo.propTypes = {
  spotPrice: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  bidData: PropTypes.arrayOf(
    PropTypes.shape({
      thbVolume: PropTypes.string.isRequired,
      usdtVolume: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  askData: PropTypes.arrayOf(
    PropTypes.shape({
      thbVolume: PropTypes.string.isRequired,
      usdtVolume: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BitkubInfo;
