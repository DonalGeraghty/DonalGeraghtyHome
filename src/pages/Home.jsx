import React from 'react'
import SplashSection from '../components/SplashSection'
import AboutSection from '../components/AboutSection'
import PythonProjectsSection from '../components/PythonProjectsSection'
import JavaProjectsSection from '../components/JavaProjectsSection'
import RShinyProjectsSection from '../components/RShinyProjectsSection'
import PortfolioSection from '../components/PortfolioSection'
import ContactSection from '../components/ContactSection'
import FooterSection from '../components/FooterSection'

function Home() {
  return (
    <div className="home-page">
      <SplashSection />
      <AboutSection />
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