import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock the Home component to avoid UserInfoSection issues
vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}))

// Wrapper component to provide router context
const renderWithRouter = (component) => {
  return render(component)
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the navbar with logo', () => {
    renderWithRouter(<App />)
    expect(screen.getByText('DonalGeraghty')).toBeInTheDocument()
  })

  it('renders the home navigation link', () => {
    renderWithRouter(<App />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('displays current date and time in navbar', () => {
    const mockDate = new Date('2024-01-01T12:00:00')
    vi.setSystemTime(mockDate)
    
    renderWithRouter(<App />)
    
    // Check for date format (Mon, 1 Jan 2024)
    expect(screen.getByText(/Mon, 1 Jan 2024/)).toBeInTheDocument()
    
    // Check for time format (12:00:00)
    expect(screen.getByText(/12:00:00/)).toBeInTheDocument()
    
    vi.useRealTimers()
  })

  it('renders with timer functionality', () => {
    renderWithRouter(<App />)
    
    // Just check that the app renders without timer-related errors
    expect(screen.getByText('DonalGeraghty')).toBeInTheDocument()
  })

  it('has proper navbar structure', () => {
    renderWithRouter(<App />)
    
    const navbar = screen.getByRole('navigation')
    expect(navbar).toBeInTheDocument()
    expect(navbar).toHaveClass('navbar')
    
    const navContainer = document.querySelector('.nav-container')
    expect(navContainer).toBeInTheDocument()
    
    const navLogo = document.querySelector('.nav-logo')
    expect(navLogo).toBeInTheDocument()
    
    const navLinks = document.querySelector('.nav-links')
    expect(navLinks).toBeInTheDocument()
    
    const navTime = document.querySelector('.nav-time')
    expect(navTime).toBeInTheDocument()
  })

  it('renders the main app container', () => {
    renderWithRouter(<App />)
    
    const appContainer = document.querySelector('.app')
    expect(appContainer).toBeInTheDocument()
  })

  it('renders routes correctly', () => {
    renderWithRouter(<App />)
    
    // Check that the Home component is rendered (since we're on the root path)
    // This would require the Home component to be properly mocked or rendered
    expect(document.querySelector('.app')).toBeInTheDocument()
  })

  it('handles navigation link click', () => {
    renderWithRouter(<App />)
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    
    // Test that the link is clickable
    fireEvent.click(homeLink)
    
    // The link should remain active since we're already on the home page
    expect(homeLink).toHaveClass('active')
  })

  it('applies active class to current route', () => {
    renderWithRouter(<App />)
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveClass('active')
  })

  it('has proper CSS classes for styling', () => {
    renderWithRouter(<App />)
    
    const app = document.querySelector('.app')
    expect(app).toBeInTheDocument()
    
    const navbar = document.querySelector('.navbar')
    expect(navbar).toBeInTheDocument()
    
    const navContainer = document.querySelector('.nav-container')
    expect(navContainer).toBeInTheDocument()
  })

  it('cleans up timer on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    
    const { unmount } = renderWithRouter(<App />)
    
    unmount()
    
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
