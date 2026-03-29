// API Configuration
export const API_BASE_URL = 'https://url-shortener-api-965419436472.europe-west1.run.app'

// API Endpoints
export const API_ENDPOINTS = {
  CREATE_SHORT_URL: '/api/data',
  GET_LONG_URL: '/api/url',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_ME: '/api/auth/me',
}

const TOKEN_KEY = 'dg_auth_token'

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export async function authFetch(path, options = {}) {
  const token = getStoredToken()
  const headers = {
    ...(options.headers || {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return fetch(`${API_BASE_URL}${path}`, { ...options, headers })
}
