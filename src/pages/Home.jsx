import React from 'react'
import SplashSection from '../components/SplashSection'
import AboutSection from '../components/AboutSection'
import PortfolioSection from '../components/PortfolioSection'
import ProjectsSection from '../components/ProjectsSection'
import PythonProjectsSection from '../components/PythonProjectsSection'
import ContactSection from '../components/ContactSection'
import UserInfoSection from '../components/UserInfoSection'
import FooterSection from '../components/FooterSection'

function Home() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <SplashSection scrollToNextSection={scrollToNextSection} />
      <AboutSection />
      <PortfolioSection />
      <PythonProjectsSection />
      <ProjectsSection />
      <ContactSection />
      <UserInfoSection />
      <FooterSection />
    </>
  )
}

export default Home