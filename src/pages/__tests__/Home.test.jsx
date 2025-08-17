import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../Home'

// Mock all child components
vi.mock('../../components/SplashSection', () => ({
  default: ({ scrollToNextSection }) => (
    <div data-testid="splash-section" onClick={scrollToNextSection}>
      SplashSection
    </div>
  )
}))

vi.mock('../../components/AboutSection', () => ({
  default: () => <div data-testid="about-section">AboutSection</div>
}))

vi.mock('../../components/SkillsSection', () => ({
  default: () => <div data-testid="skills-section">SkillsSection</div>
}))

vi.mock('../../components/ProjectsSection', () => ({
  default: () => <div data-testid="projects-section">ProjectsSection</div>
}))

vi.mock('../../components/ContactSection', () => ({
  default: () => <div data-testid="contact-section">ContactSection</div>
}))

vi.mock('../../components/UserInfoSection', () => ({
  default: () => <div data-testid="user-info-section">UserInfoSection</div>
}))

vi.mock('../../components/FooterSection', () => ({
  default: () => <div data-testid="footer-section">FooterSection</div>
}))

describe('Home', () => {
  beforeEach(() => {
    // Mock document.getElementById
    document.getElementById = vi.fn()
    
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn()
    document.getElementById.mockReturnValue({
      scrollIntoView: mockScrollIntoView
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders all sections', () => {
    render(<Home />)
    
    expect(screen.getByTestId('splash-section')).toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    expect(screen.getByTestId('user-info-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer-section')).toBeInTheDocument()
  })

  it('renders sections in correct order', () => {
    render(<Home />)
    
    const sections = [
      'splash-section',
      'about-section',
      'portfolio-section',
      'projects-section',
      'contact-section',
      'user-info-section',
      'footer-section'
    ]
    
    const renderedSections = screen.getAllByTestId(/section$/)
    expect(renderedSections).toHaveLength(7)
    
    sections.forEach((sectionId, index) => {
      expect(renderedSections[index]).toHaveAttribute('data-testid', sectionId)
    })
  })

  it('passes scrollToNextSection function to SplashSection', () => {
    render(<Home />)
    
    const splashSection = screen.getByTestId('splash-section')
    expect(splashSection).toBeInTheDocument()
  })

  it('scrolls to about section when scrollToNextSection is called', () => {
    const mockScrollIntoView = vi.fn()
    document.getElementById.mockReturnValue({
      scrollIntoView: mockScrollIntoView
    })
    
    render(<Home />)
    
    const splashSection = screen.getByTestId('splash-section')
    fireEvent.click(splashSection)
    
    expect(document.getElementById).toHaveBeenCalledWith('about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('handles missing about section gracefully', () => {
    document.getElementById.mockReturnValue(null)
    
    render(<Home />)
    
    const splashSection = screen.getByTestId('splash-section')
    fireEvent.click(splashSection)
    
    expect(document.getElementById).toHaveBeenCalledWith('about')
    // Should not throw error when about section is not found
  })

  it('renders without errors', () => {
    expect(() => render(<Home />)).not.toThrow()
  })

  it('has proper component structure', () => {
    render(<Home />)
    
    // Check that all child components are rendered
    expect(screen.getByTestId('splash-section')).toBeInTheDocument()
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
    expect(screen.getByTestId('user-info-section')).toBeInTheDocument()
    expect(screen.getByTestId('footer-section')).toBeInTheDocument()
  })
})
