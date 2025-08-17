import React from 'react'
import SplashSection from '../components/SplashSection'
import AboutSection from '../components/AboutSection'
import PortfolioSection from '../components/PortfolioSection'
import PythonProjectsSection from '../components/PythonProjectsSection'
import JavaProjectsSection from '../components/JavaProjectsSection'
import ProjectsSection from '../components/ProjectsSection'
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
      <JavaProjectsSection />
      <ProjectsSection />
      <ContactSection />
      <UserInfoSection />
      <FooterSection />
    </>
  )
}

export default Home