import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import UserInfoSection from '../UserInfoSection'

describe('UserInfoSection', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve({ ip: '192.168.1.1' })
    })
    
    // Mock successful geolocation
    navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      })
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the section title', () => {
    render(<UserInfoSection />)
    expect(screen.getByText('User Information')).toBeInTheDocument()
  })

  it('renders all three info cards', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText('🌐 Browser Details')).toBeInTheDocument()
    expect(screen.getByText('💻 System Information')).toBeInTheDocument()
    expect(screen.getByText('📍 Location & Network')).toBeInTheDocument()
  })

  it('displays browser information correctly', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText(/User Agent:/)).toBeInTheDocument()
    expect(screen.getByText(/Browser:/)).toBeInTheDocument()
    expect(screen.getByText(/Platform:/)).toBeInTheDocument()
    expect(screen.getByText(/Language:/)).toBeInTheDocument()
    expect(screen.getByText(/Cookies Enabled:/)).toBeInTheDocument()
    expect(screen.getByText(/Online Status:/)).toBeInTheDocument()
  })

  it('displays system information correctly', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText(/Screen Resolution:/)).toBeInTheDocument()
    expect(screen.getByText(/Color Depth:/)).toBeInTheDocument()
    expect(screen.getByText(/Pixel Ratio:/)).toBeInTheDocument()
    expect(screen.getByText(/Viewport Size:/)).toBeInTheDocument()
    expect(screen.getByText(/Available Memory:/)).toBeInTheDocument()
    expect(screen.getByText(/Hardware Concurrency:/)).toBeInTheDocument()
  })

  it('displays location and network information correctly', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText(/Timezone:/)).toBeInTheDocument()
    expect(screen.getByText(/Date\/Time:/)).toBeInTheDocument()
    expect(screen.getByText(/Connection Type:/)).toBeInTheDocument()
    expect(screen.getByText(/Network Speed:/)).toBeInTheDocument()
    expect(screen.getByText(/Geolocation:/)).toBeInTheDocument()
    expect(screen.getByText(/IP Address:/)).toBeInTheDocument()
  })

  it('fetches and displays IP address successfully', async () => {
    render(<UserInfoSection />)
    
    await waitFor(() => {
      expect(screen.getByText('192.168.1.1')).toBeInTheDocument()
    })
    
    expect(fetch).toHaveBeenCalledWith('https://api.ipify.org?format=json')
  })

  it('handles IP address fetch error gracefully', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))
    
    render(<UserInfoSection />)
    
    await waitFor(() => {
      expect(screen.getByText('Unable to retrieve')).toBeInTheDocument()
    })
  })

  it('displays geolocation coordinates when permission granted', async () => {
    render(<UserInfoSection />)
    
    await waitFor(() => {
      expect(screen.getByText('40.7128, -74.0060')).toBeInTheDocument()
    })
  })

  it('handles geolocation permission denied', async () => {
    navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
      error({ code: 1, message: 'Permission denied' })
    })
    
    render(<UserInfoSection />)
    
    await waitFor(() => {
      expect(screen.getByText('Permission denied or unavailable')).toBeInTheDocument()
    })
  })

  it('handles geolocation not supported', async () => {
    // Mock geolocation as undefined
    const originalGeolocation = navigator.geolocation
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      writable: true,
    })
    
    render(<UserInfoSection />)
    
    await waitFor(() => {
      expect(screen.getByText('Geolocation not supported')).toBeInTheDocument()
    })
    
    // Restore geolocation
    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeolocation,
      writable: true,
    })
  })

  it('displays correct browser details from navigator object', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText(/Netscape/)).toBeInTheDocument()
    expect(screen.getByText(/Win32/)).toBeInTheDocument()
    expect(screen.getByText(/en-US/)).toBeInTheDocument()
    expect(screen.getByText(/Yes/)).toBeInTheDocument() // Cookies enabled
    expect(screen.getAllByText(/Online/)).toHaveLength(2) // Online status appears twice
  })

  it('displays correct system information', () => {
    render(<UserInfoSection />)
    
    expect(screen.getAllByText(/1920 x 1080/)).toHaveLength(2) // Screen resolution and viewport size
    expect(screen.getByText(/24 bits/)).toBeInTheDocument() // Color depth
    expect(screen.getByText(/Pixel Ratio:/)).toBeInTheDocument() // Check for the label instead
    expect(screen.getByText(/8 GB/)).toBeInTheDocument() // Available memory
    expect(screen.getByText(/8 cores/)).toBeInTheDocument() // Hardware concurrency
  })

  it('displays correct network information', () => {
    render(<UserInfoSection />)
    
    expect(screen.getByText(/4g/)).toBeInTheDocument() // Connection type
    expect(screen.getByText(/10 Mbps/)).toBeInTheDocument() // Network speed
  })

  it('displays current date and time', () => {
    const mockDate = new Date('2024-01-01T12:00:00Z')
    vi.setSystemTime(mockDate)
    
    render(<UserInfoSection />)
    
    expect(screen.getByText(/Date\/Time:/)).toBeInTheDocument()
    
    vi.useRealTimers()
  })

  it('has proper section structure', () => {
    render(<UserInfoSection />)
    
    const section = document.querySelector('#user-info')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<UserInfoSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const userInfoGrid = document.querySelector('.user-info-grid')
    expect(userInfoGrid).toBeInTheDocument()
  })

  it('renders all info cards with proper structure', () => {
    render(<UserInfoSection />)
    
    const infoCards = document.querySelectorAll('.info-card')
    expect(infoCards).toHaveLength(3)
    
    infoCards.forEach(card => {
      expect(card).toBeInTheDocument()
    })
  })
})
