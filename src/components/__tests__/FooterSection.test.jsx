import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FooterSection from '../FooterSection'

describe('FooterSection', () => {
  it('renders the footer section with correct id', () => {
    render(<FooterSection />)
    
    const section = document.querySelector('#footer')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('renders the copyright text', () => {
    render(<FooterSection />)
    expect(screen.getByText(/© 2024 DonalGeraghty/)).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('has proper container structure', () => {
    render(<FooterSection />)
    
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
    
    const footerContent = document.querySelector('.footer-content')
    expect(footerContent).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<FooterSection />)
    
    const section = document.querySelector('#footer')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('section')
  })

  it('renders footer content with proper structure', () => {
    render(<FooterSection />)
    
    const footerContent = document.querySelector('.footer-content')
    expect(footerContent).toBeInTheDocument()
    
    const paragraph = footerContent.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('© 2024 DonalGeraghty. All rights reserved.')
  })

  it('displays the complete copyright message', () => {
    render(<FooterSection />)
    
    const copyrightText = screen.getByText('© 2024 DonalGeraghty. All rights reserved.')
    expect(copyrightText).toBeInTheDocument()
  })
})
