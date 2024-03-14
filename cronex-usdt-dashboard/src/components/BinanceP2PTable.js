import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const BinanceP2PTable = ({ data }) => (
  <Box sx={{ overflowX: 'auto' }}> {/* Wrap TableContainer in a Box to make it scrollable */}
    <TableContainer component={Paper} sx={{ mb: 3, boxShadow: 1, maxWidth: '100%' }}>
      <Typography variant="h6" sx={{ py: 1, px: 2, backgroundColor: '#1D1D1D', color: 'white' }}>
        Advertisers
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="P2P data table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'black' }}>Price</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'black' }}>Available/Limit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ad, index) => (
            <TableRow key={index}>
              <TableCell>{ad.name}</TableCell>
              <TableCell align="right">{`${ad.price} THB`}</TableCell>
              <TableCell align="right">{ad.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

BinanceP2PTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      available: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BinanceP2PTable;
