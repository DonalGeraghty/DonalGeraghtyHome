import React from 'react'
import './PortfolioSection.css'

function PortfolioSection() {
  return (
    <section id="portfolio" className="section portfolio-section" data-testid="portfolio-section">
      <div className="container">
        <h2 className="section-title">Portfolio Website</h2>
        <div className="section-content">
          <div className="portfolio-showcase">
            <div className="portfolio-main">
              <div className="portfolio-header">
                <div className="portfolio-icon-container">
                  <span className="portfolio-icon">⚛️</span>
                </div>
                <h3>Modern React.js Portfolio with Three.js Integration</h3>
              </div>
              <p>
                Designed and developed a responsive portfolio website featuring interactive 3D backgrounds, 
                theme switching capabilities, and smooth animations. Built with modern web technologies 
                and best practices for optimal user experience and performance.
              </p>
              <div className="portfolio-tech">
                <strong>Technologies:</strong> React.js, Three.js, CSS3, JavaScript, Vite, Modern Web APIs
              </div>
              <div className="portfolio-features">
                <strong>Key Features:</strong> 3D interactive backgrounds, Dark/light theme toggle, 
                Responsive design, Smooth animations, Modern UI/UX
              </div>
              <div className="portfolio-links">
                <a href="https://github.com/DonalGeraghty/DonalGeraghtyHome" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </div>
            </div>
            <div className="portfolio-visual">
              <div className="tech-stack">
                <h4>Tech Stack</h4>
                <div className="tech-items">
                  <span className="tech-item">React.js</span>
                  <span className="tech-item">Three.js</span>
                  <span className="tech-item">CSS3</span>
                  <span className="tech-item">JavaScript</span>
                  <span className="tech-item">Vite</span>
                  <span className="tech-item">Modern APIs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
