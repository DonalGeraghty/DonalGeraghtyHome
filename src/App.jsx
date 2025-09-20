import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import './components/Navbar.css'
import Home from './pages/Home'
import UrlShortener from './pages/UrlShortener'
import UrlRedirect from './pages/UrlRedirect'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './context/ThemeContext'

function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const location = useLocation()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>DonalGeraghty</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={scrollToTop}
          >
            Home
          </Link>
          <Link 
            to="/urlshortener" 
            className={`nav-link ${location.pathname === '/urlshortener' ? 'active' : ''}`}
            onClick={scrollToTop}
          >
            URL Shortener
          </Link>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <div className="nav-time">
            <p>{currentTime.toLocaleDateString('en-GB', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })} {currentTime.toLocaleTimeString('en-GB', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/urlshortener" element={<UrlShortener />} />
            <Route path="/redirect/:shortCode" element={<UrlRedirect />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App 