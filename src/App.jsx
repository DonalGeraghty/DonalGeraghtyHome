import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    // 1. Wrap the entire app in AuthProvider to make auth state available everywhere
    <AuthProvider>
      <Router>
        <Routes>
          {/* 2. Standard Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
