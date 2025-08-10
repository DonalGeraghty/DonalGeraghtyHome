import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SplashSection from '../SplashSection'

describe('SplashSection', () => {
  it('renders the splash section with correct id', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const section = document.querySelector('#home')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('splash')
  })

  it('renders splash content structure', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const splashContent = document.querySelector('.splash-content')
    expect(splashContent).toBeInTheDocument()
    
    const splashText = document.querySelector('.splash-text')
    expect(splashText).toBeInTheDocument()
    
    const splashVisual = document.querySelector('.splash-visual')
    expect(splashVisual).toBeInTheDocument()
  })

  it('renders animated shapes', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const animatedShapes = document.querySelector('.animated-shapes')
    expect(animatedShapes).toBeInTheDocument()
    
    const codeBrackets = document.querySelector('.shape.code-brackets')
    expect(codeBrackets).toBeInTheDocument()
  })

  it('renders scroll indicator', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const scrollIndicator = document.querySelector('.scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()
    
    const chevronDown = document.querySelector('.chevron-down')
    expect(chevronDown).toBeInTheDocument()
  })

  it('calls scrollToNextSection when scroll indicator is clicked', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const scrollIndicator = document.querySelector('.scroll-indicator')
    fireEvent.click(scrollIndicator)
    
    expect(mockScrollToNextSection).toHaveBeenCalledTimes(1)
  })

  it('has proper section structure', () => {
    const mockScrollToNextSection = vi.fn()
    render(<SplashSection scrollToNextSection={mockScrollToNextSection} />)
    
    const section = document.querySelector('#home')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('splash')
  })

  it('renders without scrollToNextSection prop gracefully', () => {
    render(<SplashSection />)
    
    const section = document.querySelector('#home')
    expect(section).toBeInTheDocument()
    
    const scrollIndicator = document.querySelector('.scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()
    
    // Should not throw error when clicked without the prop
    fireEvent.click(scrollIndicator)
  })
})
