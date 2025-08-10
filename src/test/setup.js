import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = vi.fn()

// Mock navigator.geolocation
Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: vi.fn(),
  },
  writable: true,
})

// Mock window.screen
Object.defineProperty(window, 'screen', {
  value: {
    width: 1920,
    height: 1080,
    colorDepth: 24,
  },
  writable: true,
})

// Mock window.devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', {
  value: 1,
  writable: true,
})

// Mock window.innerWidth and innerHeight
Object.defineProperty(window, 'innerWidth', {
  value: 1920,
  writable: true,
})

Object.defineProperty(window, 'innerHeight', {
  value: 1080,
  writable: true,
})

// Mock navigator properties
Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  writable: true,
})

Object.defineProperty(navigator, 'appName', {
  value: 'Netscape',
  writable: true,
})

Object.defineProperty(navigator, 'platform', {
  value: 'Win32',
  writable: true,
})

Object.defineProperty(navigator, 'language', {
  value: 'en-US',
  writable: true,
})

Object.defineProperty(navigator, 'cookieEnabled', {
  value: true,
  writable: true,
})

Object.defineProperty(navigator, 'onLine', {
  value: true,
  writable: true,
})

Object.defineProperty(navigator, 'deviceMemory', {
  value: 8,
  writable: true,
})

Object.defineProperty(navigator, 'hardwareConcurrency', {
  value: 8,
  writable: true,
})

Object.defineProperty(navigator, 'connection', {
  value: {
    effectiveType: '4g',
    downlink: 10,
  },
  writable: true,
})

// Mock Intl.DateTimeFormat
global.Intl = {
  DateTimeFormat: vi.fn(() => ({
    resolvedOptions: () => ({ timeZone: 'America/New_York' }),
  })),
}

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
})
