// BitkubTable.js
import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const BitkubTable = ({ data, title, themeColor }) => (
  <Box sx={{ overflowX: 'auto' }}>
    <TableContainer component={Paper} sx={{ mb: 3, boxShadow: '1px 1px 5px rgba(0,0,0,0.2)', maxWidth: '100%' }}>
      <Typography variant="h6" sx={{ p: 1, backgroundColor: themeColor.header, color: themeColor.headerText }}>
        {title}
      </Typography>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: themeColor.header, color: themeColor.headerText, py: 1 }}>Price (THB)</TableCell>
            <TableCell sx={{ backgroundColor: themeColor.header, color: themeColor.headerText, py: 1 }} align="right">Vol (USDT)</TableCell>
            <TableCell sx={{ backgroundColor: themeColor.header, color: themeColor.headerText, py: 1 }} align="right">Vol (THB)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ py: 1, color: themeColor.rowText }}>{row.price}</TableCell>
              <TableCell sx={{ py: 1, color: themeColor.rowText }} align="right">{row.usdtVolume}</TableCell>
              <TableCell sx={{ py: 1, color: themeColor.rowText }} align="right">{row.thbVolume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

BitkubTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      thbVolume: PropTypes.string.isRequired,
      usdtVolume: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  themeColor: PropTypes.shape({
    header: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    rowBackground: PropTypes.string.isRequired,
    rowText: PropTypes.string.isRequired,
  }).isRequired,
};

export default BitkubTable;
