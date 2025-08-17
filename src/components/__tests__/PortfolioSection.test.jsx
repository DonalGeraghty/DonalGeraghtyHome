import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PortfolioSection from '../PortfolioSection'

describe('PortfolioSection', () => {
  it('renders the section title', () => {
    render(<PortfolioSection />)
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
  })

  it('renders the portfolio project title', () => {
    render(<PortfolioSection />)
    expect(screen.getByText('Modern React.js Portfolio with Three.js Integration')).toBeInTheDocument()
  })

  it('renders the portfolio description', () => {
    render(<PortfolioSection />)
    expect(screen.getByText(/Designed and developed a responsive portfolio website/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<PortfolioSection />)
    
    const section = document.querySelector('#portfolio')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<PortfolioSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const portfolioShowcase = document.querySelector('.portfolio-showcase')
    expect(portfolioShowcase).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<PortfolioSection />)
    
    const title = screen.getByText('Portfolio Website')
    expect(title).toHaveClass('section-title')
  })

  it('renders portfolio header with icon', () => {
    render(<PortfolioSection />)
    
    const portfolioHeader = document.querySelector('.portfolio-header')
    expect(portfolioHeader).toBeInTheDocument()
    
    const portfolioIcon = document.querySelector('.portfolio-icon')
    expect(portfolioIcon).toBeInTheDocument()
    expect(portfolioIcon).toHaveTextContent('⚛️')
  })

  it('renders technology section', () => {
    render(<PortfolioSection />)
    
    expect(screen.getByText(/Technologies:/)).toBeInTheDocument()
    expect(screen.getByText(/React.js, Three.js, CSS3, JavaScript, Vite, Modern Web APIs/)).toBeInTheDocument()
  })

  it('renders features section', () => {
    render(<PortfolioSection />)
    
    expect(screen.getByText(/Key Features:/)).toBeInTheDocument()
    expect(screen.getByText(/3D interactive backgrounds, Dark\/light theme toggle/)).toBeInTheDocument()
  })

  it('renders portfolio links', () => {
    render(<PortfolioSection />)
    
    expect(screen.getByText('GitHub Repository')).toBeInTheDocument()
    
    const links = document.querySelectorAll('.portfolio-links a')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders tech stack visual', () => {
    render(<PortfolioSection />)
    
    const techStack = document.querySelector('.tech-stack')
    expect(techStack).toBeInTheDocument()
    
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('Three.js')).toBeInTheDocument()
    expect(screen.getByText('CSS3')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
    expect(screen.getByText('Modern APIs')).toBeInTheDocument()
  })

  it('has proper portfolio showcase layout', () => {
    render(<PortfolioSection />)
    
    const portfolioShowcase = document.querySelector('.portfolio-showcase')
    expect(portfolioShowcase).toBeInTheDocument()
    
    const portfolioMain = document.querySelector('.portfolio-main')
    expect(portfolioMain).toBeInTheDocument()
    
    const portfolioVisual = document.querySelector('.portfolio-visual')
    expect(portfolioVisual).toBeInTheDocument()
  })
})
