import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsSection from '../ProjectsSection'

describe('ProjectsSection', () => {
  it('renders the section title', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders all three project cards', () => {
    render(<ProjectsSection />)
    
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
    expect(screen.getByText('Project 3')).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<ProjectsSection />)
    
    expect(screen.getByText(/Description of your first project goes here/)).toBeInTheDocument()
    expect(screen.getByText(/Description of your second project goes here/)).toBeInTheDocument()
    expect(screen.getByText(/Description of your third project goes here/)).toBeInTheDocument()
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
    
    const title = screen.getByText('Projects')
    expect(title).toHaveClass('section-title')
  })

  it('renders all project cards with proper structure', () => {
    render(<ProjectsSection />)
    
    const projectCards = document.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(3)
    
    projectCards.forEach(card => {
      expect(card).toBeInTheDocument()
      expect(card.querySelector('h3')).toBeInTheDocument()
      expect(card.querySelector('p')).toBeInTheDocument()
    })
  })

  it('displays project titles as headings', () => {
    render(<ProjectsSection />)
    
    const projectTitles = screen.getAllByRole('heading', { level: 3 })
    expect(projectTitles).toHaveLength(3)
    
    expect(projectTitles[0]).toHaveTextContent('Project 1')
    expect(projectTitles[1]).toHaveTextContent('Project 2')
    expect(projectTitles[2]).toHaveTextContent('Project 3')
  })

  it('has proper grid layout structure', () => {
    render(<ProjectsSection />)
    
    const projectsGrid = document.querySelector('.projects-grid')
    expect(projectsGrid).toBeInTheDocument()
    
    const projectCards = projectsGrid.querySelectorAll('.project-card')
    expect(projectCards).toHaveLength(3)
  })
})
