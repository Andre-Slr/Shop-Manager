import './css/App.css'

import Home from './pages/main/Home'
import Dashboard from './pages/main/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import EditShop from './pages/config/EditShop'
import AddItem from './pages/config/AddItem'
import EditItem from './pages/config/EditItem'

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

          <Route path="/edit-shop" element={<EditShop />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App
