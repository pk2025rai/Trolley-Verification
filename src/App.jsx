import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProMain from './components/layout/ProMain'
import Dashboard from './components/layout/Dashboard'
import Home from './components/pages/Home'
import Analytics from './components/pages/Analytics'
import Configuration from './components/pages/Configuration'
import Users from './components/pages/Users'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProMain />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='home' element={<Home/> } />
          <Route path='analytics' element={<Analytics/> } />
          <Route path='config' element={<Configuration/> } />
          <Route path='users' element={<Users/> } />
      
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
