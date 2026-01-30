import React from "react";
import ProjectsSection from "../components/Landing/ProjectsSection";
import ClientsSection from "../components/Landing/ClientsSection";
import ContactForm from "../components/Landing/ContactForm";
import NewsletterForm from "../components/Landing/NewsletterForm";
import AboutUsSection from "../components/Landing/AboutUsSection";

// import "../assests/styles/landing.css";

const LandingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16">
  {/* <h1 className="text-3xl font-bold text-center my-8">
    Welcome to Our Website
  </h1> */}

    <ContactForm />
    <AboutUsSection />
  <ProjectsSection />
  <ClientsSection />
  
  <NewsletterForm />
</div>

  );
};



export default LandingPage;
