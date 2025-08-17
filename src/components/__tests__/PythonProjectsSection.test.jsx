import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PythonProjectsSection from '../PythonProjectsSection'

describe('PythonProjectsSection', () => {
  it('renders the section title', () => {
    render(<PythonProjectsSection />)
    expect(screen.getByText('Python Projects')).toBeInTheDocument()
  })

  it('renders the CEX Blu-Ray Crawler project', () => {
    render(<PythonProjectsSection />)
    expect(screen.getByText('CEX Blu-Ray 4K Crawler')).toBeInTheDocument()
  })

  it('renders project description', () => {
    render(<PythonProjectsSection />)
    expect(screen.getByText(/Automated Web Scraping & Notification System/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<PythonProjectsSection />)
    
    const section = document.querySelector('#python-projects')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
    expect(section).toHaveClass('python-projects-section')
  })

  it('has proper container structure', () => {
    render(<PythonProjectsSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<PythonProjectsSection />)
    
    const title = screen.getByText('Python Projects')
    expect(title).toHaveClass('section-title')
  })

  it('renders project card with proper structure', () => {
    render(<PythonProjectsSection />)
    
    const projectCards = document.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(1)
    
    projectCards.forEach(card => {
      expect(card).toBeInTheDocument()
      expect(card.querySelector('.project-header')).toBeInTheDocument()
      expect(card.querySelector('h3')).toBeInTheDocument()
      expect(card.querySelector('p')).toBeInTheDocument()
    })
  })

  it('renders Python project icon', () => {
    render(<PythonProjectsSection />)
    
    const pythonLogos = document.querySelectorAll('.python-logo')
    expect(pythonLogos).toHaveLength(1)
    
    pythonLogos.forEach(logo => {
      expect(logo).toHaveTextContent('🐍')
    })
  })

  it('displays project title as heading', () => {
    render(<PythonProjectsSection />)
    
    const projectTitles = screen.getAllByRole('heading', { level: 3 })
    expect(projectTitles).toHaveLength(1)
    
    expect(projectTitles[0]).toHaveTextContent('CEX Blu-Ray 4K Crawler')
  })

  it('renders project technology section', () => {
    render(<PythonProjectsSection />)

    expect(screen.getByText(/Technologies:/)).toBeInTheDocument()
    expect(screen.getByText(/Python, Playwright, Web Scraping, Automation/)).toBeInTheDocument()
  })

  it('renders project features section', () => {
    render(<PythonProjectsSection />)

    expect(screen.getByText(/Key Features:/)).toBeInTheDocument()
    expect(screen.getByText(/Automated daily crawling, Intelligent diff detection/)).toBeInTheDocument()
  })

  it('renders project links', () => {
    render(<PythonProjectsSection />)

    expect(screen.getByText('GitHub Repository')).toBeInTheDocument()
    
    const links = document.querySelectorAll('.project-links a')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', 'https://github.com/DonalGeraghty/PlaywrightCrawlerWeBuy')
  })

  it('has proper grid layout structure', () => {
    render(<PythonProjectsSection />)
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
    
    const projectCards = projectsGrid.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(1)
  })
})
