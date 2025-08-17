import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import JavaProjectsSection from '../JavaProjectsSection'

describe('JavaProjectsSection', () => {
  it('renders the section title', () => {
    render(<JavaProjectsSection />)
    expect(screen.getByText('Java Projects')).toBeInTheDocument()
  })

  it('renders the Java API Testing project', () => {
    render(<JavaProjectsSection />)
    expect(screen.getByText('Java API Testing Framework')).toBeInTheDocument()
  })

  it('renders project description', () => {
    render(<JavaProjectsSection />)
    expect(screen.getByText(/Comprehensive API Testing & Validation System/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<JavaProjectsSection />)
    
    const section = document.querySelector('#java-projects')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
    expect(section).toHaveClass('java-projects-section')
  })

  it('has proper container structure', () => {
    render(<JavaProjectsSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<JavaProjectsSection />)
    
    const title = screen.getByText('Java Projects')
    expect(title).toHaveClass('section-title')
  })

  it('renders project card with proper structure', () => {
    render(<JavaProjectsSection />)
    
    const projectCards = document.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(1)
    
    projectCards.forEach(card => {
      expect(card).toBeInTheDocument()
      expect(card.querySelector('.project-header')).toBeInTheDocument()
      expect(card.querySelector('h3')).toBeInTheDocument()
      expect(card.querySelector('p')).toBeInTheDocument()
    })
  })

  it('renders Java project icon', () => {
    render(<JavaProjectsSection />)
    
    const javaLogos = document.querySelectorAll('.java-logo')
    expect(javaLogos).toHaveLength(1)
    
    javaLogos.forEach(logo => {
      expect(logo).toHaveTextContent('☕')
    })
  })

  it('displays project title as heading', () => {
    render(<JavaProjectsSection />)
    
    const projectTitles = screen.getAllByRole('heading', { level: 3 })
    expect(projectTitles).toHaveLength(1)
    
    expect(projectTitles[0]).toHaveTextContent('Java API Testing Framework')
  })

  it('renders project technology section', () => {
    render(<JavaProjectsSection />)

    expect(screen.getByText(/Technologies:/)).toBeInTheDocument()
    expect(screen.getByText(/Java, JUnit, REST Assured, Maven/)).toBeInTheDocument()
  })

  it('renders project features section', () => {
    render(<JavaProjectsSection />)

    expect(screen.getByText(/Key Features:/)).toBeInTheDocument()
    expect(screen.getByText(/Response code validation, Header content-type verification/)).toBeInTheDocument()
  })

  it('renders project links', () => {
    render(<JavaProjectsSection />)

    expect(screen.getByText('GitHub Repository')).toBeInTheDocument()
    
    const links = document.querySelectorAll('.project-links a')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', 'https://github.com/DonalGeraghty/JavaApiTesting')
  })

  it('has proper grid layout structure', () => {
    render(<JavaProjectsSection />)
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
    
    const projectCards = projectsGrid.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(1)
  })
})
