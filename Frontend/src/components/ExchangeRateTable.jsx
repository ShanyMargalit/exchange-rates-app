// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ExchangeRateTable = () => {
//   const [baseCurrency, setBaseCurrency] = useState('USD');
//   const [currencies, setCurrencies] = useState([]);
//   const [exchangeRates, setExchangeRates] = useState({});

//   useEffect(() => {
//     axios.get('/api/currencies')
//       .then(response => setCurrencies(response.data))
//       .catch(error => console.error('Error fetching currencies:', error));
//   }, []);

//   useEffect(() => {
//     if (baseCurrency) {
//       axios.get(`/api/exchange-rates?base=${baseCurrency}`)
//         .then(response => setExchangeRates(response.data))
//         .catch(error => console.error('Error fetching exchange rates:', error));
//     }
//   }, [baseCurrency]);

//   return (
//     <div>
//       <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
//         {currencies.map(currency => (
//           <option key={currency} value={currency}>{currency}</option>
//         ))}
//       </select>
//       <table>
//         <thead>
//           <tr>
//             <th>Base</th>
//             <th>Target</th>
//             <th>Exchange Rate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(exchangeRates).map(targetCurrency => (
//             <tr key={targetCurrency}>
//               <td>{baseCurrency}</td>
//               <td>{targetCurrency}</td>
//               <td>{exchangeRates[targetCurrency]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExchangeRateTable;


import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import MaterialTable from 'material-table';

const mockCurrencies = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
const mockExchangeRates = {
  EUR: 0.9196,
  GBP: 0.7889,
  CNY: 7.2190,
  ILS: 3.6693
};

const ExchangeRateTable = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    // Simulate fetching currencies from API
    setCurrencies(mockCurrencies);
  }, []);

  useEffect(() => {
    // Simulate fetching exchange rates from API
    if (baseCurrency) {
      setExchangeRates(mockExchangeRates);
    }
  }, [baseCurrency]);

  const data = Object.keys(exchangeRates).map(targetCurrency => ({
    base: baseCurrency,
    target: targetCurrency,
    rate: exchangeRates[targetCurrency]
  }));

  const columns = [
    { title: 'Base', field: 'base' },
    { title: 'Target', field: 'target' },
    { title: 'Exchange Rate', field: 'rate' }
  ];

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="base-currency-label">Base Currency</InputLabel>
        <Select
          labelId="base-currency-label"
          value={baseCurrency}
          label="Base Currency"
          onChange={e => setBaseCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <MaterialTable
        title="Exchange Rates"
        columns={columns}
        data={data}
        options={{
          search: false,
          paging: false,
          sorting: true
        }}
      />
    </Box>
  );
};

export default ExchangeRateTable;
