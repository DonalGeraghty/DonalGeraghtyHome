import React, { useState } from 'react'
import './UrlShortener.css'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

function UrlShortener() {
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Get the current domain dynamically
  const getCurrentDomain = () => {
    return window.location.origin
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResponse('')

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_SHORT_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: url
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        setResponse(JSON.stringify(data, null, 2))
      } else {
        // Handle non-JSON responses (like short codes)
        const shortCode = await response.text()
        const shortUrl = `${getCurrentDomain()}/redirect/${shortCode}`
        setResponse(
          <div>
            <p>Your shortened URL:</p>
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="short-url-link"
            >
              {shortUrl}
            </a>
          </div>
        )
      }
    } catch (err) {
      if (err.name === 'SyntaxError') {
        setError('Invalid JSON response from server. The API might be returning an error page or plain text.')
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error: Unable to connect to the API server. Please check your internet connection.')
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="url-shortener-page">
      <div className="container">
        <h1>URL Shortener</h1>
        

        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="form-group">
            <label htmlFor="url">Enter URL:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com"
              required
              className="url-input"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Sending...' : 'Shorten URL'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="response-section">
            <pre className="response-data">{response}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default UrlShortener
