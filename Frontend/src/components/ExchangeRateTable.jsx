import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import '../designs/ExchangeRateTable.css';

const currencyImages = {
  USD: '/src/assets/usd.png',
  EUR: '/src/assets/eur.png',
  GBP: '/src/assets/gbp.png',
  CNY: '/src/assets/cny.png',
  ILS: '/src/assets/ils.png',
};

const ExchangeRateTable = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [orderBy, setOrderBy] = useState('rate');
  const [orderDirectionRate, setOrderDirectionRate] = useState('desc');
  const [orderDirectionTarget, setOrderDirectionTarget] = useState('asc');

  useEffect(() => {
    axios
      .get('https://localhost:7061/api/ExchangeRate/currencies')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCurrencies(response.data);
        } else {
          console.error('Invalid data format for currencies:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching currencies:', error));
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      axios
        .get(`https://localhost:7061/api/ExchangeRate/exchange-rates?baseCurrency=${baseCurrency}`)
        .then((response) => {
          if (response.data) {
            setExchangeRates(response.data);
          } else {
            console.error('Invalid data format for exchange rates:', response.data);
          }
        })
        .catch((error) => console.error('Error fetching exchange rates:', error));
    }
  }, [baseCurrency]);

  const handleSort = (property) => {
    if (property === 'rate') {
      const isAsc = orderBy === property && orderDirectionRate === 'asc';
      setOrderDirectionRate(isAsc ? 'desc' : 'asc');
    } else if (property === 'target') {
      const isAsc = orderBy === property && orderDirectionTarget === 'asc';
      setOrderDirectionTarget(isAsc ? 'desc' : 'asc');
    }
    setOrderBy(property);
  };

  const sortedData = Object.keys(exchangeRates)
    .filter((targetCurrency) => targetCurrency !== baseCurrency)
    .map((targetCurrency) => ({
      base: baseCurrency,
      target: targetCurrency,
      rate: exchangeRates[targetCurrency],
    }))
    .sort((a, b) => {
      if (orderBy === 'rate') {
        return orderDirectionRate === 'asc' ? a.rate - b.rate : b.rate - a.rate;
      } else {
        return orderDirectionTarget === 'asc'
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
    });

  return (
    <div>
      <Box className="container">
        <FormControl fullWidth className="select-container">
          <InputLabel id="base-currency-label">Choose Base Currency</InputLabel>
          <Select
            labelId="base-currency-label"
            value={baseCurrency}
            label="Choose Base Currency"
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="exchange rates table" className="table">
            <TableHead>
              <TableRow>
                <TableCell>Base</TableCell>
                <TableCell onClick={() => handleSort('target')}>
                  Target
                  {orderBy === 'target' && orderDirectionTarget === 'asc' ? (
                    <ArrowUpward fontSize="small" className="sort-icon" />
                  ) : (
                    <ArrowDownward fontSize="small" className="sort-icon" />
                  )}
                </TableCell>
                <TableCell onClick={() => handleSort('rate')}>
                  Exchange Rate
                  {orderBy === 'rate' && orderDirectionRate === 'asc' ? (
                    <ArrowUpward fontSize="small" className="sort-icon" />
                  ) : (
                    <ArrowDownward fontSize="small" className="sort-icon" />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.target}>
                  <TableCell>{row.base}</TableCell>
                  <TableCell>
                    <img
                      src={currencyImages[row.target]}
                      alt={row.target}
                      className="currency-img"
                    />
                    {row.target}
                  </TableCell>
                  <TableCell>{row.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ExchangeRateTable;
