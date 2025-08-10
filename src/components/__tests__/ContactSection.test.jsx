import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactSection from '../ContactSection'

describe('ContactSection', () => {
  it('renders the section title', () => {
    render(<ContactSection />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders all contact information', () => {
    render(<ContactSection />)
    
    expect(screen.getByText(/📧 Email:/)).toBeInTheDocument()
    expect(screen.getByText(/your\.email@example\.com/)).toBeInTheDocument()
    
    expect(screen.getByText(/📱 Phone:/)).toBeInTheDocument()
    expect(screen.getByText(/\+1 \(555\) 123-4567/)).toBeInTheDocument()
    
    expect(screen.getByText(/📍 Location:/)).toBeInTheDocument()
    expect(screen.getByText(/Your City, Country/)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<ContactSection />)
    
    const section = document.querySelector('#contact')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('has proper container structure', () => {
    render(<ContactSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const sectionContent = document.querySelector('.section-content')
    expect(sectionContent).toBeInTheDocument()
    
    const contactInfo = document.querySelector('.contact-info')
    expect(contactInfo).toBeInTheDocument()
  })

  it('renders the section title with correct class', () => {
    render(<ContactSection />)
    
    const title = screen.getByText('Contact')
    expect(title).toHaveClass('section-title')
  })

  it('displays contact information in proper format', () => {
    render(<ContactSection />)
    
    const contactParagraphs = document.querySelectorAll('.contact-info p')
    expect(contactParagraphs).toHaveLength(3)
    
    // Check that each contact method has an emoji and label
    expect(contactParagraphs[0].textContent).toMatch(/📧 Email:/)
    expect(contactParagraphs[1].textContent).toMatch(/📱 Phone:/)
    expect(contactParagraphs[2].textContent).toMatch(/📍 Location:/)
  })
})
