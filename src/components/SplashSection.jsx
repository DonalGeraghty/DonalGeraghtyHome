import React from 'react'
import ThreeJSBackground from './ThreeJSBackground'

function SplashSection({ scrollToNextSection }) {
  return (
    <section id="home" className="splash">
      <ThreeJSBackground />
      <div className="splash-content">
        <div className="splash-text">
        </div>
        <div className="splash-visual">
          <div className="animated-shapes">
            <div className="shape code-brackets"></div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToNextSection}>
        <div className="chevron-down"></div>
      </div>
    </section>
  )
}

export default SplashSection 