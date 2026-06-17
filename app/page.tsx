import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ExperienceSection from "@/sections/ExperienceSection";
import EducationSection from "@/sections/EducationSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ContactSection from "@/sections/ContactSection";
import ServicesSection from "@/sections/Servicessection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        {/* <ExperienceSection /> */}
        {/* <EducationSection /> */}
        <ProjectsSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
