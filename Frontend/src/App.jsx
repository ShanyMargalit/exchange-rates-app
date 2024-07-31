import { useState } from 'react'
import './App.css'

import ExchangeRateTable from './components/ExchangeRateTable.jsx';


function App() {

  return (
    <>
      <h1>Welcome to exchange rates app</h1>
      <ExchangeRateTable />
    </>
  )
}

export default App;
