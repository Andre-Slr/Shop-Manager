import './css/App.css'

import Home from './pages/main/Home'
import Dashboard from './pages/main/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import { UserProvider } from './contexts/UserContext'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <UserProvider>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App
