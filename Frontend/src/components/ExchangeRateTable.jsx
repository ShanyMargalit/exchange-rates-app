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

// import React, { useState, useEffect } from 'react';

// const mockCurrencies = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
// const mockExchangeRates = {
//   USD: { EUR: 0.9196, GBP: 0.7889, CNY: 7.2190, ILS: 3.6693 },
//   EUR: { USD: 1.0873, GBP: 0.8578, CNY: 7.8489, ILS: 3.9934 },
//   GBP: { USD: 1.2673, EUR: 1.1655, CNY: 9.1446, ILS: 4.6521 },
//   CNY: { USD: 0.1385, EUR: 0.1274, GBP: 0.1094, ILS: 0.5090 },
//   ILS: { USD: 0.2726, EUR: 0.2504, GBP: 0.2152, CNY: 1.9652 }
// };

// const currencyImages = {
//   USD: '/src/assets/usd.png',
//   EUR: '/src/assets/eur.png',
//   GBP: '/src/assets/gbp.png',
//   CNY: '/src/assets/cny.png',
//   ILS: '/src/assets/ils.png'
// };

// const ExchangeRateTable = () => {
//   const [baseCurrency, setBaseCurrency] = useState('USD');
//   const [currencies, setCurrencies] = useState([]);
//   const [exchangeRates, setExchangeRates] = useState({});

//   useEffect(() => {
//     // Simulate fetching currencies from API
//     setCurrencies(mockCurrencies);
//   }, []);

//   useEffect(() => {
//     // Simulate fetching exchange rates from API
//     if (baseCurrency) {
//       setExchangeRates(mockExchangeRates[baseCurrency]);
//     }
//   }, [baseCurrency]);

//   const data = Object.keys(exchangeRates)
//     .filter(targetCurrency => targetCurrency !== baseCurrency)
//     .map(targetCurrency => ({
//       base: baseCurrency,
//       target: targetCurrency,
//       rate: exchangeRates[targetCurrency]
//     }));

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <label htmlFor="base-currency" style={{ marginRight: '10px' }}>Base Currency</label>
//         <select
//           id="base-currency"
//           value={baseCurrency}
//           onChange={e => setBaseCurrency(e.target.value)}
//           style={{ padding: '5px', fontSize: '16px' }}
//         >
//           {currencies.map(currency => (
//             <option key={currency} value={currency}>{currency}</option>
//           ))}
//         </select>
//       </div>
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Base</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Target</th>
//             <th style={{ border: '1px solid black', padding: '8px' }}>Exchange Rate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(row => (
//             <tr key={row.target}>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{row.base}</td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>
//                 <img src={currencyImages[row.target]} alt={row.target} style={{ width: '20px', marginRight: '10px' }} />
//                 {row.target}
//               </td>
//               <td style={{ border: '1px solid black', padding: '8px' }}>{row.rate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExchangeRateTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const currencyImages = {
  USD: '/src/assets/usd.png',
  EUR: '/src/assets/eur.png',
  GBP: '/src/assets/gbp.png',
  CNY: '/src/assets/cny.png',
  ILS: '/src/assets/ils.png'
};

const ExchangeRateTable = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    axios.get('https://localhost:7061/api/ExchangeRate/currencies')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCurrencies(response.data);
        } else {
          console.error('Invalid data format for currencies:', response.data);
        }
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  useEffect(() => {
    if (baseCurrency) {
      axios.get(`https://localhost:7061/api/ExchangeRate/exchange-rates?baseCurrency=${baseCurrency}`)
        .then(response => {
          if (response.data) {
            setExchangeRates(response.data);
          } else {
            console.error('Invalid data format for exchange rates:', response.data);
          }
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
    }
  }, [baseCurrency]);

  const filteredData = Object.keys(exchangeRates)
    .filter(targetCurrency => targetCurrency !== baseCurrency)
    .map(targetCurrency => ({
      base: baseCurrency,
      target: targetCurrency,
      rate: exchangeRates[targetCurrency]
    }));

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="base-currency" style={{ marginRight: '10px' }}>Choose Base Currency</label>
        <select
          id="base-currency"
          value={baseCurrency}
          onChange={e => setBaseCurrency(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Base</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Target</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(row => (
            <tr key={row.target}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.base}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <img src={currencyImages[row.target]} alt={row.target} style={{ width: '20px', marginRight: '10px' }} />
                {row.target}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRateTable;
