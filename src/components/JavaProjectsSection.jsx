import React from 'react'

function JavaProjectsSection() {
  return (
    <section id="java-projects" className="section java-projects-section" data-testid="java-projects-section">
      <div className="container">
        <h2 className="section-title">Java Projects</h2>
        <div className="section-content">
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon-container">
                  <span className="java-logo">☕</span>
                </div>
                <h3>Java API Testing Framework</h3>
              </div>
              <p>
                <strong>Comprehensive API Testing & Validation System</strong><br/>
                Built a robust Java-based testing framework for API validation using JUnit and REST Assured. 
                The project demonstrates professional testing practices including response code validation, 
                header verification, JSON body assertions, and comprehensive endpoint testing. 
                Features include automated test execution, detailed reporting, and extensible test scenarios.
              </p>
              <div className="project-tech">
                <strong>Technologies:</strong> Java, JUnit, REST Assured, Maven, API Testing, JSON Validation, HTTP Client
              </div>
              <div className="project-features">
                <strong>Key Features:</strong> Response code validation, Header content-type verification, 
                JSON response body assertions, Multi-endpoint testing, Automated test execution, 
                Professional testing practices, Extensible test framework
              </div>
              <div className="project-links">
                <a href="https://github.com/DonalGeraghty/JavaApiTesting" target="_blank" rel="noopener noreferrer">
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

export default JavaProjectsSection
