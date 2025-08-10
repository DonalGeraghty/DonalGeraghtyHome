import React from 'react'
import SplashSection from '../components/SplashSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
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
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <UserInfoSection />
      <FooterSection />
    </>
  )
}

export default Home