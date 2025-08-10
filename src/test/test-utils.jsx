import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Custom render function that includes router context
export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}

// Mock data for testing
export const mockUserData = {
  ip: '192.168.1.1',
  location: {
    latitude: 40.7128,
    longitude: -74.0060
  },
  browser: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    appName: 'Netscape',
    platform: 'Win32',
    language: 'en-US',
    cookieEnabled: true,
    onLine: true,
    deviceMemory: 8,
    hardwareConcurrency: 8
  },
  system: {
    screenWidth: 1920,
    screenHeight: 1080,
    colorDepth: 24,
    devicePixelRatio: 1,
    innerWidth: 1920,
    innerHeight: 1080
  },
  network: {
    effectiveType: '4g',
    downlink: 10
  }
}

// Mock fetch responses
export const mockFetchResponses = {
  success: {
    ip: '192.168.1.1'
  },
  error: new Error('Network error')
}

// Helper to wait for async operations
export const waitForAsync = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

// Helper to mock geolocation
export const mockGeolocation = (success = true, coords = mockUserData.location) => {
  if (success) {
    navigator.geolocation.getCurrentPosition.mockImplementation((successCallback) => {
      successCallback({ coords })
    })
  } else {
    navigator.geolocation.getCurrentPosition.mockImplementation((successCallback, errorCallback) => {
      errorCallback({ code: 1, message: 'Permission denied' })
    })
  }
}

// Helper to mock fetch
export const mockFetch = (response = mockFetchResponses.success, shouldReject = false) => {
  if (shouldReject) {
    global.fetch.mockRejectedValue(response)
  } else {
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve(response)
    })
  }
}
