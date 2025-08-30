import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

function UrlRedirect() {
  const { shortCode } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_LONG_URL}/${shortCode}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.status === 'success' && data.long_url) {
          // Redirect to the long URL
          window.location.href = data.long_url
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (shortCode) {
      fetchLongUrl()
    }
  }, [shortCode])

  if (loading && !error) {
    return (
      <div className="url-redirect-page">
        <div className="container">
          <h1>Redirecting...</h1>
          <p>Please wait while we redirect you to your destination.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="url-redirect-page">
        <div className="container">
          <h1>Redirect Error</h1>
          <p>Sorry, we couldn't redirect you. The short URL may be invalid or expired.</p>
          <p>Error: {error}</p>
          <button onClick={() => navigate('/urlshortener')} className="back-btn">
            Go to URL Shortener
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default UrlRedirect
