import React from 'react'

function PythonProjectsSection() {
  return (
    <section id="python-projects" className="section python-projects-section" data-testid="python-projects-section">
      <div className="container">
        <h2 className="section-title">Python Projects</h2>
        <div className="section-content">
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon-container">
                  <span className="python-logo">🐍</span>
                </div>
                <h3>CEX Blu-Ray 4K Crawler</h3>
              </div>
              <p>
                <strong>Automated Web Scraping & Notification System</strong><br/>
                Built a sophisticated Python web crawler using Playwright that automatically monitors the CEX website for new 4K Blu-Ray releases. 
                The system scrapes daily inventory changes, identifies newly added titles, and sends automated email notifications with pricing information. 
                Features include intelligent data comparison, CSV data storage, and robust error handling.
              </p>
              <div className="project-tech">
                <strong>Technologies:</strong> Python, Playwright, Web Scraping, Automation, Email Notifications, CSV Processing
              </div>
              <div className="project-features">
                <strong>Key Features:</strong> Automated daily crawling, Intelligent diff detection, Email notifications, 
                CSV data persistence, Browser automation, Error handling & recovery
              </div>
              <div className="project-links">
                <a href="https://github.com/DonalGeraghty/PlaywrightCrawlerWeBuy" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PythonProjectsSection
