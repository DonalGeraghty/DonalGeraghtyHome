import React from 'react'

function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="parallax-background">
        <img src="/shiny.png" alt="R Shiny Background" className="parallax-image" />
      </div>
      <div className="container">
        <h2 className="section-title">R Shiny Projects</h2>
        <div className="section-content">
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon-container">
                  <span className="r-logo">R</span>
                </div>
                <h3>R Shiny Clustering Application</h3>
              </div>
              <p>
                <strong>Interactive K-means Clustering on Iris Dataset</strong><br/>
                Built a comprehensive R Shiny web application demonstrating advanced clustering algorithms and data visualization techniques. 
                Features include interactive K-means clustering (1-25 clusters), PCA analysis with scree plots, hierarchical clustering dendrograms, 
                and real-time accuracy assessment against actual species classifications.
              </p>
              <div className="project-tech">
                <strong>Technologies:</strong> R, R Shiny, ggplot2, Statistical Analysis, Machine Learning
              </div>
              <div className="project-features">
                <strong>Key Features:</strong> Interactive clustering, PCA visualization, Confusion matrix analysis, 
                Real-time parameter adjustment, Responsive web interface
              </div>
              <div className="project-links">
                <a href="https://github.com/DonalGeraghty/R-Shiny-Clustering" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
                <span> • </span>
                <a href="https://donalgeraghty.shinyapps.io/Clustering_Iris_Data/" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon-container">
                  <span className="r-logo">R</span>
                </div>
                <h3>R Shiny Data Explorer</h3>
              </div>
              <p>
                <strong>Dynamic Data Visualization & Analysis Platform</strong><br/>
                Developed a versatile R Shiny application for interactive data exploration and visualization. 
                The platform supports CSV file uploads, automatic data cleaning, and provides multiple visualization 
                options including scatter plots, histograms, and correlation matrices with real-time parameter controls.
              </p>
              <div className="project-tech">
                <strong>Technologies:</strong> R, R Shiny, Data Visualization, Statistical Analysis, Web Development
              </div>
              <div className="project-features">
                <strong>Key Features:</strong> File upload & processing, Dynamic plotting, Data cleaning tools, 
                Interactive UI controls, Responsive design
              </div>
              <div className="project-links">
                <a href="https://github.com/DonalGeraghty/R-Shiny-ExploreData" target="_blank" rel="noopener noreferrer">
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

export default ProjectsSection 