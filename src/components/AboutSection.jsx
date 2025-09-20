import React from 'react'
import './AboutSection.css'

function AboutSection({ scrollToNextSection }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          <p>Welcome to my personal website. I'm passionate about and developing technological solutions to real-world problems.</p>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToNextSection}>
        <div className="chevron-down"></div>
      </div>
    </section>
  )
}

export default AboutSection 