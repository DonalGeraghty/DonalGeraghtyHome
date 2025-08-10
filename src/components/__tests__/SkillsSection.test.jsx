import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsSection from '../SkillsSection'

describe('SkillsSection', () => {
  it('renders the section title', () => {
    render(<SkillsSection />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders all skill items', () => {
    render(<SkillsSection />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Git')).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<SkillsSection />)
    
    const section = document.querySelector('#skills')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<SkillsSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const skillsGrid = document.querySelector('.skills-grid')
    expect(skillsGrid).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<SkillsSection />)
    
    const title = screen.getByText('Skills')
    expect(title).toHaveClass('section-title')
  })

  it('renders all skill items with proper structure', () => {
    render(<SkillsSection />)
    
    const skillItems = document.querySelectorAll('.skill-item')
    expect(skillItems).toHaveLength(6)
    
    const expectedSkills = ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js', 'Git']
    
    skillItems.forEach((item, index) => {
      expect(item).toBeInTheDocument()
      expect(item).toHaveTextContent(expectedSkills[index])
    })
  })

  it('has proper grid layout structure', () => {
    render(<SkillsSection />)
    
    const skillsGrid = document.querySelector('.skills-grid')
    expect(skillsGrid).toBeInTheDocument()
    
    const skillItems = skillsGrid.querySelectorAll('.skill-item')
    expect(skillItems).toHaveLength(6)
  })

  it('displays skills in the correct order', () => {
    render(<SkillsSection />)
    
    const skillItems = document.querySelectorAll('.skill-item')
    const skillTexts = Array.from(skillItems).map(item => item.textContent)
    
    expect(skillTexts).toEqual(['JavaScript', 'React', 'CSS', 'HTML', 'Node.js', 'Git'])
  })

  it('has the correct number of skills', () => {
    render(<SkillsSection />)
    
    const skillItems = document.querySelectorAll('.skill-item')
    expect(skillItems).toHaveLength(6)
  })
})
