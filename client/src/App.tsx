import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Transactions from './pages/Transactions'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/stats' element={<Transactions />} />
    </Routes>
  )
}

export default App