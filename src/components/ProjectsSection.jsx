import React from 'react'

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="section-content">
          <div className="projects-grid">
            <div className="project-card">
              <h3>Project 1</h3>
              <p>Description of your first project goes here.</p>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Description of your second project goes here.</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Description of your third project goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection 