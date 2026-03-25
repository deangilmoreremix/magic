/**
 * Magic Landing Page - Main Entry Point
 * A production-grade landing page for the Magic AI Platform
 * 
 * Key Features:
 * - Responsive design for all screen sizes
 * - Smooth animations using Framer Motion
 * - Accessible and SEO-optimized
 * - No open source/GitHub references (per requirements)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import FeatureHighlights from './components/FeatureHighlights';
import IntegrationPartners from './components/IntegrationPartners';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <Header isScrolled={isScrolled} />
      
      <main>
        <Hero />
        <ProductShowcase />
        <FeatureHighlights />
        <IntegrationPartners />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;