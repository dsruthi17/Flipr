import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectsSection from '../components/ProjectsSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <ClientsSection />
      <ContactSection />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;
