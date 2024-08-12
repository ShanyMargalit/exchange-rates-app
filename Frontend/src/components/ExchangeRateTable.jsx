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
import '../styles/ExchangeRateTable.css';

const currencyData = {
  USD: { img: '/src/assets/usd.png', caption: 'US Dollar' },
  EUR: { img: '/src/assets/eur.png', caption: 'Euro' },
  GBP: { img: '/src/assets/gbp.png', caption: 'Great British Pound' },
  CNY: { img: '/src/assets/cny.png', caption: 'Chinese Yuan Renminbi' },
  ILS: { img: '/src/assets/ils.png', caption: 'Israeli Shekel' },
};

const BASE_URL = 'https://localhost:7061/api/ExchangeRate';

const ExchangeRateTable = () => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('rate');
  const [orderDirectionRate, setOrderDirectionRate] = useState('desc');
  const [orderDirectionTarget, setOrderDirectionTarget] = useState('asc');

  useEffect(() => {
    axios
      .get(`${BASE_URL}/currencies`)
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
      setLoading(true);
      axios
        .get(`${BASE_URL}/exchange-rates?baseCurrency=${baseCurrency}`)
        .then((response) => {
          if (response.data) {
            setExchangeRates(response.data);
          } else {
            console.error('Invalid data format for exchange rates:', response.data);
          }
        })
        .catch((error) => console.error('Error fetching exchange rates:', error))
        .finally(() => setLoading(false));
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
                <img
                  src={currencyData[currency].img}
                  alt={currency}
                  className="currency-img"
                  style={{ width: '20px', marginRight: '10px'}}
                />
                {currencyData[currency].caption} ({currency})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {baseCurrency && (
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="exchange rates table" className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Base</TableCell>
                  <TableCell onClick={() => handleSort('target')} className="sortable">
                    Target
                    {orderBy === 'target' && orderDirectionTarget === 'asc' ? (
                      <ArrowUpward fontSize="small" className="sort-icon" />
                    ) : (
                      <ArrowDownward fontSize="small" className="sort-icon" />
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleSort('rate')} className="sortable">
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedData.map((row) => (
                    <TableRow key={row.target}>
                      <TableCell>{row.base}</TableCell>
                      <TableCell>
                        <img
                          src={currencyData[row.target].img}
                          alt={row.target}
                          className="currency-img"
                          style={{ width: '20px', marginRight: '10px' }}
                        />
                        {row.target}
                      </TableCell>
                      <TableCell>{row.rate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
};

export default ExchangeRateTable;
