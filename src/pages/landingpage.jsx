import { useNavigate } from "react-router-dom";
import ProjectsSection from "../components/projectsection";
import ClientsSection from "../components/clientselection";
import ContactForm from "../components/contactform";
import Newsletter from "../components/newsletter";

import Logo from "../assets/images/logo.svg";
import HeroImage from "../assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";
import HomeIcon from "../assets/icons/home.svg";
import DollarIcon from "../assets/icons/circle-dollar-sign.svg";
import PaintbrushIcon from "../assets/icons/paintbrush-2.svg";
import LinkedinIcon from "../assets/icons/Linkedin.svg";
import FrameIcon from "../assets/icons/Frame.svg";
import GroupIcon from "../assets/icons/Group.svg";

import shape1 from "../assets/shapes/Ellipse 1.svg";
import shape2 from "../assets/shapes/Ellipse 7.svg";
import shape3 from "../assets/shapes/Ellipse 8.svg";
import shape4 from "../assets/shapes/Ellipse 10.svg";
import shape5 from "../assets/shapes/Subtract.svg";

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <div className="bg-shapes">
        <img src={shape1} alt="" className="shape shape-1" />
        <img src={shape2} alt="" className="shape shape-2" />
        <img src={shape3} alt="" className="shape shape-3" />
        <img src={shape4} alt="" className="shape shape-4" />
        <img src={shape5} alt="" className="shape shape-5" />
      </div>

      <header className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="navbar-buttons">
          <button className="btn-secondary" onClick={() => navigate('/admin')}>Login</button>
          <button className="btn-primary" onClick={scrollToNewsletter}>Subscribe Us</button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Consultation, <br/> Design & Marketing</h1>
          <p>Not Your Average Realtor</p>
          <div className="hero-buttons">
            <button className="btn-orange">Why Choose Us?</button>
            <button className="btn-outline">View Projects</button>
          </div>
          
          <div className="service-icons">
            <div className="service-icon">
              <img src={HomeIcon} alt="Consultation" />
              <span>Consultation</span>
            </div>
            <div className="service-icon">
              <img src={DollarIcon} alt="Finance" />
              <span>Finance</span>
            </div>
            <div className="service-icon">
              <img src={PaintbrushIcon} alt="Design" />
              <span>Design</span>
            </div>
            <div className="service-icon">
              <img src={FrameIcon} alt="Marketing" />
              <span>Marketing</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img src={HeroImage} alt="Team" className="hero-image" />
          <div className="hero-image-overlay"></div>
        </div>
      </section>

      <section id="services" className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-wrapper">
              <img src={HomeIcon} alt="Consultation" />
            </div>
            <h3>Property Consultation</h3>
            <p>Expert guidance for your property needs</p>
          </div>
          <div className="service-card">
            <div className="service-icon-wrapper">
              <img src={PaintbrushIcon} alt="Design" />
            </div>
            <h3>Interior Design</h3>
            <p>Beautiful designs for your spaces</p>
          </div>
          <div className="service-card">
            <div className="service-icon-wrapper">
              <img src={DollarIcon} alt="Finance" />
            </div>
            <h3>Financial Planning</h3>
            <p>Smart investment solutions</p>
          </div>
          <div className="service-card">
            <div className="service-icon-wrapper">
              <img src={GroupIcon} alt="Marketing" />
            </div>
            <h3>Marketing</h3>
            <p>Reach more buyers with our marketing</p>
          </div>
        </div>
      </section>

      <ProjectsSection />
      <ClientsSection />
      
      <section id="contact" className="contact-section">
        <ContactForm />
      </section>

      <div id="newsletter">
        <Newsletter />
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="#"><img src={LinkedinIcon} alt="LinkedIn" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
