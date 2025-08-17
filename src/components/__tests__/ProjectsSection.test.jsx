import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsSection from '../ProjectsSection'

describe('ProjectsSection', () => {
  it('renders the section title', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('R Shiny Projects')).toBeInTheDocument()
  })

  it('renders all three project cards', () => {
    render(<ProjectsSection />)
    
    expect(screen.getByText('R Shiny Clustering Application')).toBeInTheDocument()
    expect(screen.getByText('R Shiny Data Explorer')).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<ProjectsSection />)
    
    expect(screen.getByText(/Interactive K-means Clustering on Iris Dataset/)).toBeInTheDocument()
    expect(screen.getByText(/Dynamic Data Visualization & Analysis Platform/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<ProjectsSection />)
    
    const section = document.querySelector('#projects')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<ProjectsSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<ProjectsSection />)
    
    const title = screen.getByText('R Shiny Projects')
    expect(title).toHaveClass('section-title')
  })

  it('renders all project cards with proper structure', () => {
    render(<ProjectsSection />)
    
    const projectCards = document.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(2)
    
    projectCards.forEach(card => {
      expect(card).toBeInTheDocument()
      expect(card.querySelector('.project-header')).toBeInTheDocument()
      expect(card.querySelector('h3')).toBeInTheDocument()
      expect(card.querySelector('p')).toBeInTheDocument()
    })
  })

  it('renders R Shiny project icons', () => {
    render(<ProjectsSection />)
    
    const rLogos = document.querySelectorAll('.r-logo')
    expect(rLogos).toHaveLength(2) // Two R Shiny projects
    
    rLogos.forEach(logo => {
      expect(logo).toHaveTextContent('R')
    })
  })

  it('renders parallax background for projects section', () => {
    render(<ProjectsSection />)
    
    const parallaxBackground = document.querySelector('.parallax-background')
    expect(parallaxBackground).toBeInTheDocument()
    
    const parallaxImage = document.querySelector('.parallax-image')
    expect(parallaxImage).toBeInTheDocument()
    expect(parallaxImage).toHaveAttribute('src', '/shiny.png')
    expect(parallaxImage).toHaveAttribute('alt', 'R Shiny Background')
  })

  it('displays project titles as headings', () => {
    render(<ProjectsSection />)
    
    const projectTitles = screen.getAllByRole('heading', { level: 3 })
    expect(projectTitles).toHaveLength(2)
    
    expect(projectTitles[0]).toHaveTextContent('R Shiny Clustering Application')
    expect(projectTitles[1]).toHaveTextContent('R Shiny Data Explorer')
  })

  it('renders project technology sections', () => {
    render(<ProjectsSection />)

    const techSections = screen.getAllByText(/Technologies:/)
    expect(techSections).toHaveLength(2)
    expect(screen.getByText(/R, R Shiny, ggplot2, Statistical Analysis, Machine Learning/)).toBeInTheDocument()
    expect(screen.getByText(/R, R Shiny, Data Visualization, Statistical Analysis, Web Development/)).toBeInTheDocument()
  })

  it('renders project features sections', () => {
    render(<ProjectsSection />)

    const featuresSections = screen.getAllByText(/Key Features:/)
    expect(featuresSections).toHaveLength(2)
    expect(screen.getByText(/Interactive clustering, PCA visualization, Confusion matrix analysis/)).toBeInTheDocument()
    expect(screen.getByText(/File upload & processing, Dynamic plotting, Data cleaning tools/)).toBeInTheDocument()
  })

  it('renders project links', () => {
    render(<ProjectsSection />)

    const githubLinks = screen.getAllByText('GitHub Repository')
    expect(githubLinks).toHaveLength(2)
    
    const liveDemoLinks = screen.getAllByText('Live Demo')
    expect(liveDemoLinks).toHaveLength(2)
  })

  it('has proper grid layout structure', () => {
    render(<ProjectsSection />)
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
    
    const projectCards = projectsGrid.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(2)
  })
})
