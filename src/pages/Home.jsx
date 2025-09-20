import React from 'react'
import AboutSection from '../components/AboutSection'
import PythonProjectsSection from '../components/PythonProjectsSection'
import JavaProjectsSection from '../components/JavaProjectsSection'
import RShinyProjectsSection from '../components/RShinyProjectsSection'
import PortfolioSection from '../components/PortfolioSection'
import ContactSection from '../components/ContactSection'
import FooterSection from '../components/FooterSection'

function Home() {
  const scrollToNextSection = () => {
    // Get the current viewport position
    const currentScroll = window.scrollY
    const windowHeight = window.innerHeight
    
    // Find all sections
    const sections = document.querySelectorAll('section')
    
    // Find the next section that's not fully visible
    for (let section of sections) {
      const rect = section.getBoundingClientRect()
      // If the section is below the current viewport (not fully visible)
      if (rect.top > 0) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        break
      }
    }
  }

  return (
    <div className="home-page">
      <AboutSection scrollToNextSection={scrollToNextSection} />
      <PythonProjectsSection />
      <JavaProjectsSection />
      <RShinyProjectsSection />
      <PortfolioSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}

export default Home