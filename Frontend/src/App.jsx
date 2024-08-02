import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExchangeRateTable from './components/ExchangeRateTable.jsx';
import './App.css';

const theme = createTheme({
  spacing: 8,
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <h1>Currency Exchange Rates</h1>
      <ExchangeRateTable />
    </ThemeProvider>
  );
}

export default App;
