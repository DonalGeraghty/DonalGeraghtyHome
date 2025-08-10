import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../AboutSection'

describe('AboutSection', () => {
  it('renders the section title', () => {
    render(<AboutSection />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders the about content', () => {
    render(<AboutSection />)
    expect(screen.getByText(/Welcome to my personal website/)).toBeInTheDocument()
    expect(screen.getByText(/I'm passionate about technology and development/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<AboutSection />)
    
    const section = document.querySelector('#about')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<AboutSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<AboutSection />)
    
    const title = screen.getByText('About Me')
    expect(title).toHaveClass('section-title')
  })
})
